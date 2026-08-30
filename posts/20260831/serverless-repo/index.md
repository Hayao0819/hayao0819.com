---
title: Cloud RunとR2で自分用のPacmanリポジトリを構築する
description: "Kamisatoを使い、パッケージ定義とTerraformを1個のGitHubリポジトリで管理する"
date: 2026-08-31T05:00:20.303219941+09:00
categories:
    - 技術系
draft: false
publish: true
---

[前の記事](/blog/posts/20260831/my-package-history)では、Arch Linuxのパッケージをビルドして配布するために作ったKamisatoと、その設計について書きました。

この記事では、Kamisatoを使って自分用のPacmanリポジトリを構築します。パッケージの定義、Terraform、GitHub Actionsは、すべて`pacman-repo`という1個のGitHubリポジトリに置きます。Pacmanから参照するリポジトリ名は`personal`とします。

構成を考える際は、実際に運用している[`alterlinux-repo`](https://github.com/FascodeNet/alterlinux-repo)と[`alterlinux-terraform`](https://github.com/FascodeNet/alterlinux-terraform)を基にしました。

記事の下書きと設定の照合にはGPT 5.6 Solを用いています。

## 構成

パッケージのビルドと配布には、次のコンポーネントを使います。

| コンポーネント | 配置先 | 担当 |
| --- | --- | --- |
| `ayaka` | GitHub Actions | ビルド対象の選定、パッケージのビルドとアップロード |
| `ayato` | Google Cloud Run | Pacmanリポジトリと管理APIの公開 |
| Workers KV | Cloudflare | パッケージとリポジトリのメタデータ |
| R2 | Cloudflare | パッケージファイル |
| `lumine` | Cloudflare Pages | パッケージ一覧とビルド状況の表示 |

`pacman-repo`へ`PKGBUILD`をpushすると、GitHub Actions上の`ayaka`がビルド対象を決めます。完成したパッケージは`ayato`へアップロードされ、メタデータはWorkers KV、パッケージファイルはR2へ保存されます。

Pacmanからの要求は`ayato`が受け付けます。パッケージ本体を取得する際はR2の署名付きURLへ転送し、R2からPacmanへ直接送信します。

`lumine`は`ayato`の情報を表示するWebフロントエンドです。静的ファイルをCloudflare Pagesへ配置し、ブラウザから`ayato`のAPIを呼び出します。

## 完成後のアカウントとリポジトリ

この手順では、次の3個のアカウントを使います。

| サービス | 用途 |
| --- | --- |
| GitHub | `pacman-repo`とGitHub Actions |
| Google Cloud | Cloud Run、Secret Manager、Terraform State |
| Cloudflare | R2、Workers KV、Pages、DNS |

GitHubでは次のリポジトリを使います。

| リポジトリ | 所有者 | 用途 |
| --- | --- | --- |
| `pacman-repo` | 自分のアカウントまたはOrganization | `PKGBUILD`、Terraform、GitHub Actions |
| [`Hayao0819/Kamisato`](https://github.com/Hayao0819/Kamisato) | 上流 | `ayaka`、`ayato`、`lumine`、GitHub Actions用のAction |

`pacman-repo`から公開するPacmanリポジトリは次の1個です。

| リポジトリ | アーキテクチャ | 公開URL |
| --- | --- | --- |
| `personal` | `x86_64` | `https://repo.example.com/repo/personal/x86_64` |

クラウドには次のリソースを作ります。`example.com`は自分のドメインへ置き換えます。

| サービス | 名前の例 | 用途 |
| --- | --- | --- |
| Cloud Storage | `<PROJECT_ID>-tfstate` | Terraform State |
| Cloud Run | `ayato` | PacmanリポジトリとAPI |
| Cloud Run Jobs | `ayato-migrate` | メタデータの移行 |
| IAM | `ayato-run` | `ayato`の実行 |
| IAM | `terraform-deploy` | GitHub ActionsからのTerraform実行 |
| Workload Identity Pool | `github` | GitHub ActionsのOIDC認証 |
| Workload Identity Provider | `pacman-repo` | 接続元をGitHubのRepository IDと`main`ブランチで限定 |
| Secret Manager | `ayato-`で始まる4個のSecret | R2、Workers KV、CI APIキー |
| R2 | `personal-pacman-packages` | パッケージファイル |
| Workers KV | `ayato-personal` | メタデータ |
| Cloudflare Pages | `personal-packages` | `lumine` |
| Cloud Run Domain Mapping | `repo.example.com` | `ayato`の独自ドメイン |
| Cloudflare DNS | `repo.example.com`、`packages.example.com` | `ayato`と`lumine`の公開 |

## 準備

手元にはGit、Terraform 1.9以降、Google Cloud CLI、GitHub CLI、Dockerを用意します。Nixを使う場合は、`alterlinux-terraform`の`flake.nix`と`flake.lock`も構成例として利用できます。

Google Cloudでは課金を有効にしたプロジェクトを選び、CloudflareではR2とWorkers KVを利用できるアカウント、独自ドメインのDNS Zoneを用意します。最初にTerraformを適用するGoogle Cloudアカウントには、API、IAM、Cloud Run、Secret Managerを設定する権限が必要です。以降の例では、Google CloudのプロジェクトIDを`PROJECT_ID`と表記します。

Terraformを手元から適用するため、Google Cloud CLIとApplication Default Credentialsへログインします。

```bash
export PROJECT_ID="your-gcp-project-id"
gcloud auth login
gcloud auth application-default login
gcloud config set project "${PROJECT_ID}"
```

## pacman-repoを作成する

GitHubに空のリポジトリを作り、手元へcloneします。`OWNER`は自分のユーザー名またはOrganization名です。公開範囲は運用方針に合わせて変更してください。

```bash
gh repo create OWNER/pacman-repo --public --clone
cd pacman-repo

terraform_source="$(mktemp -d)"
git clone https://github.com/FascodeNet/alterlinux-terraform.git "${terraform_source}"
git -C "${terraform_source}" checkout 3329bf0163e6abcaf913e7fc1e0c9df3c3ccfddf
cp -R "${terraform_source}/bootstrap" "${terraform_source}/terraform" .
rm -rf -- "${terraform_source:?}"
```

最終的な配置は次の表のとおりです。

| パス | 内容 |
| --- | --- |
| `.ayakarc.json` | `ayaka`が読むソースリポジトリの一覧 |
| `personal/repo.json` | `personal`のビルド設定 |
| `personal/<pkgbase>/PKGBUILD` | パッケージ定義 |
| `personal/<pkgbase>/.SRCINFO` | GitHub Actionsが読むパッケージ情報 |
| `bootstrap/bootstrap.sh` | Terraform State用バケットの作成 |
| `terraform/gcp` | Google Cloud APIの設定 |
| `terraform/ayato` | Cloud Run、Secret Manager、サービスアカウント |
| `terraform/lumine` | Cloudflare PagesとDNS |
| `.github/workflows/deploy.yml` | インフラと`lumine`の配置 |
| `.github/workflows/build.yml` | パッケージのビルドと公開 |
| `.github/workflows/srcinfo.yml` | `.SRCINFO`の検査 |
| `.github/workflows/update.yml` | 上流バージョンの定期確認 |

Terraformは[`alterlinux-terraform`のコミット`3329bf0`](https://github.com/FascodeNet/alterlinux-terraform/tree/3329bf0163e6abcaf913e7fc1e0c9df3c3ccfddf)を基にします。後述する変数とGitHub Actions用の認証設定を加えれば、独自の名前とドメインで適用できます。パッケージ側の小さな構成例は[`Kamisato`の`example/ayaka`](https://github.com/Hayao0819/Kamisato/tree/b0f4d89743f68070e72802533a916e56e1e921bc/example/ayaka)にあります。

Terraformの生成物と認証情報は`.gitignore`へ追加します。

```gitignore
.terraform/
*.tfstate
*.tfstate.*
*.tfvars
*.tfvars.json
backend.hcl
gha-creds-*.json
out/*
!out/.gitkeep
```

## personalリポジトリを定義する

`.ayakarc.json`には`PKGBUILD`を置くディレクトリと、ローカルビルド時の出力先を記述します。

```json
{
  "builder": {
    "backend": "chroot",
    "devtools": {
      "archbuild": "extra-x86_64-build"
    }
  },
  "repos": [
    {
      "dir": "./personal",
      "destdir": "./out"
    }
  ]
}
```

`personal/repo.json`には、Pacmanリポジトリの名前、ビルド対象のアーキテクチャ、ビルド用コンテナを記述します。

```json
{
  "name": "personal",
  "maintainer": "Your Name <you@example.com>",
  "url": "https://repo.example.com/repo/personal",
  "build": {
    "repos": [
      {
        "name": "personal",
        "server": "https://repo.example.com/repo/$repo/$arch"
      }
    ],
    "arches": {
      "x86_64": {}
    },
    "image": "ghcr.io/hayao0819/archlinux:$arch",
    "makepkg": {
      "packager": "Your Name <you@example.com>"
    }
  }
}
```

`personal`の直下には、`pkgbase`ごとのディレクトリを作ります。既存の`PKGBUILD`を入れる場合も、`.SRCINFO`を生成して一緒にcommitします。

```bash
mkdir -p personal/example-package out
touch out/.gitkeep
cp /path/to/PKGBUILD personal/example-package/PKGBUILD
cd personal/example-package
makepkg --printsrcinfo >.SRCINFO
cd ../..
```

`repo.json`の`build.repos`は、ビルド中に依存パッケージを取得するPacmanリポジトリです。`ayato`は起動時に`personal`の空のデータベースを作るため、初回ビルドからこのURLを指定できます。`personal`内の別パッケージへ依存する場合、先に公開されたパッケージも同じURLから取得します。Arch Linux公式リポジトリはビルド用イメージ側の`pacman.conf`から利用します。

## Cloudflareに保存先を作る

R2に`personal-pacman-packages`というバケットを作り、S3互換API用のAccess Key IDとSecret Access Keyを発行します。[R2のS3 API](https://developers.cloudflare.com/r2/api/s3/api/)で使うエンドポイントは`https://<ACCOUNT_ID>.r2.cloudflarestorage.com`です。

Workers KVには`ayato-personal`という名前空間を作り、名前空間IDを控えます。`ayato`がメタデータを読み書きできるAPIトークンも発行します。

`lumine`にはCloudflare PagesとDNSを編集するAPIトークンを使います。必要な権限はAccount Cloudflare Pagesの編集、Zone DNSの編集、Zoneの読み取りです。R2、Workers KV、Pagesでは用途ごとに認証情報を分けて管理します。

この時点で控える値は次のとおりです。

| 値 | 使用先 |
| --- | --- |
| Cloudflare Account ID | R2のエンドポイント、Pages |
| Cloudflare Zone ID | 独自ドメインのDNS |
| R2 Access Key ID | `ayato`のSecret Manager |
| R2 Secret Access Key | `ayato`のSecret Manager |
| Workers KV Namespace ID | `ayato`の環境変数 |
| Workers KV API Token | `ayato`のSecret Manager |
| Pages/DNS API Token | Terraform、Wrangler |

## Terraform Stateを準備する

`bootstrap/bootstrap.sh`は、Stateを保存するCloud Storageバケットを作ります。

```bash
./bootstrap/bootstrap.sh "${PROJECT_ID}" asia-northeast1
```

バケット名は`<PROJECT_ID>-tfstate`です。Uniform bucket-level access、Public access prevention、オブジェクトのバージョニングが設定されます。

Stateは`gcp`、`ayato`、`lumine`の3個に分けます。各ディレクトリの`backend.hcl.example`を`backend.hcl`へコピーし、同じバケットと別々の`prefix`を指定します。

```hcl
bucket = "your-gcp-project-id-tfstate"
prefix = "ayato"
```

`terraform/gcp`では`prefix = "gcp"`、`terraform/lumine`では`prefix = "lumine"`へ変更します。

[TerraformのGCSバックエンド](https://developer.hashicorp.com/terraform/language/backend/gcs)はState lockingに対応しています。オブジェクトのバージョニングを使うと、操作を誤った際に以前のStateを確認できます。

StateにはR2とWorkers KVの認証情報、CI APIキーが入ります。バケットのPublic access preventionを保ち、閲覧権限はTerraformを実行するアカウントに限ります。

## Google CloudとGitHub Actionsの認証を準備する

`terraform/gcp/terraform.tfvars`にプロジェクトID、リージョン、GitHubのRepository IDを記述します。Repository IDはGitHub APIから取得できます。

```bash
gh api repos/OWNER/pacman-repo --jq '.id'
```

Repository IDはリポジトリ名を変更しても同じ値が使われます。[`google-github-actions/auth`のセキュリティ資料](https://github.com/google-github-actions/auth/blob/main/docs/SECURITY_CONSIDERATIONS.md)でも、OIDCの条件には数値のIDが推奨されています。

```hcl
project_id           = "your-gcp-project-id"
region               = "asia-northeast1"
github_repository_id = "123456789"
```

GitHub Actionsからの認証にはWorkload Identity Federationを使います。`terraform/gcp/main.tf`のAPI一覧へSecurity Token ServiceとIAM Service Account Credentialsを加えます。

```hcl
locals {
  services = [
    "cloudresourcemanager.googleapis.com",
    "serviceusage.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "sts.googleapis.com",
    "storage.googleapis.com",
  ]
}
```

`terraform/gcp/github-actions.tf`では、`terraform-deploy`サービスアカウントとWorkload Identity Poolを作ります。ProviderはRepository IDと`main`ブランチが一致するOIDCトークンを受け付けます。

```hcl
resource "google_service_account" "terraform_deploy" {
  account_id   = "terraform-deploy"
  display_name = "Terraform deploy from GitHub Actions"

  depends_on = [google_project_service.this]
}

locals {
  terraform_deploy_roles = toset([
    "roles/iam.serviceAccountAdmin",
    "roles/iam.serviceAccountUser",
    "roles/run.admin",
    "roles/secretmanager.admin",
    "roles/serviceusage.serviceUsageAdmin",
  ])
}

resource "google_project_iam_member" "terraform_deploy" {
  for_each = local.terraform_deploy_roles

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.terraform_deploy.email}"
}

resource "google_storage_bucket_iam_member" "terraform_state" {
  bucket = "${var.project_id}-tfstate"
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.terraform_deploy.email}"
}

resource "google_iam_workload_identity_pool" "github" {
  workload_identity_pool_id = "github"
  display_name              = "GitHub Actions"

  depends_on = [google_project_service.this]
}

resource "google_iam_workload_identity_pool_provider" "pacman_repo" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "pacman-repo"
  display_name                       = "pacman-repo"

  attribute_mapping = {
    "google.subject"          = "assertion.sub"
    "attribute.repository_id" = "assertion.repository_id"
    "attribute.ref"           = "assertion.ref"
  }
  attribute_condition = "assertion.repository_id == '${var.github_repository_id}' && assertion.ref == 'refs/heads/main'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account_iam_member" "github_actions" {
  service_account_id = google_service_account.terraform_deploy.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository_id/${var.github_repository_id}"
}
```

`terraform/gcp/variables.tf`へGitHubリポジトリの変数を追加します。

```hcl
variable "github_repository_id" {
  description = "Numeric GitHub repository ID allowed to run Terraform."
  type        = string
}
```

Workflowへ渡す値は`terraform/gcp/outputs.tf`から取り出します。

```hcl
output "workload_identity_provider" {
  value = google_iam_workload_identity_pool_provider.pacman_repo.name
}

output "terraform_deploy_service_account" {
  value = google_service_account.terraform_deploy.email
}
```

設定を確認してから適用します。

```bash
terraform -chdir=terraform/gcp init -backend-config=backend.hcl
terraform -chdir=terraform/gcp plan
terraform -chdir=terraform/gcp apply
```

この構成ではGoogle CloudのAPI、`terraform-deploy`サービスアカウント、GitHub Actions用のOIDC Providerを用意します。`terraform/ayato`を適用すると、Cloud Run Admin APIとSecret Manager APIも有効になります。

適用後、outputをGitHubのRepository Variableへ登録します。

```bash
gh variable set GCP_PROJECT_ID --repo OWNER/pacman-repo --body "${PROJECT_ID}"
gh variable set TF_STATE_BUCKET --repo OWNER/pacman-repo --body "${PROJECT_ID}-tfstate"
terraform -chdir=terraform/gcp output -raw workload_identity_provider \
  | gh variable set GCP_WORKLOAD_IDENTITY_PROVIDER --repo OWNER/pacman-repo
terraform -chdir=terraform/gcp output -raw terraform_deploy_service_account \
  | gh variable set GCP_SERVICE_ACCOUNT --repo OWNER/pacman-repo
```

Workload Identity PoolとIAM設定の反映には数分かかる場合があります。登録直後のWorkflowが認証で失敗した場合は、少し待ってから再実行します。

## ayatoをCloud Runへ配置する

`terraform/ayato`は、Cloud Runサービスの`ayato`、Cloud Run Jobの`ayato-migrate`、`ayato-run`サービスアカウント、4個のSecretを作ります。

### personal向けに変数を変更する

`terraform/ayato/terraform.tfvars.example`を`terraform.tfvars`へコピーし、次の値を設定します。

```hcl
project_id         = "your-gcp-project-id"
region             = "asia-northeast1"
ayato_image_repo   = "docker.io/hayao0819/kamisato"
ayato_image_tag    = "sha-b0f4d89743f68070e72802533a916e56e1e921bc"
ayato_domains      = ["repo.example.com"]
auth_public_origin = "https://packages.example.com"

ayato_repos = [
  { name = "personal", arches = ["x86_64"] },
]

cloudflare_account_id = "your-cloudflare-account-id"
r2_bucket_name        = "personal-pacman-packages"
r2_access_key_id      = "your-r2-access-key-id"
r2_secret_access_key  = "your-r2-secret-access-key"
cfkv_namespace_id     = "your-workers-kv-namespace-id"
cfkv_token            = "your-workers-kv-api-token"
```

`ayato_repos`は、`ayato`が公開するリポジトリと、アップロードを受け付けるアーキテクチャの一覧です。`personal/repo.json`の`name`と`build.arches`を同じ内容にします。

`terraform/ayato/secrets.tf`にあるCI APIキーの名前も、GitHubリポジトリに合わせます。

```hcl
locals {
  ci_api_keys_json = jsonencode([{
    name          = "pacman-repo"
    key           = random_password.ci_api_key.result
    publish_repos = [for r in var.ayato_repos : r.name]
  }])
}
```

CI APIキーは48文字のランダムな値です。R2とWorkers KVの認証情報とともにSecret Managerへ保存され、`ayato-run`には各Secretを読む権限が付与されます。

### Cloud Runの設定を確認する

`ayato`は`AYATO_STORE_DB_TYPE=cfkv`と`AYATO_STORE_STORAGE_TYPE=s3`で起動します。R2はリージョン`auto`のS3互換ストレージとして接続し、Workers KVにリポジトリデータベースの元になるメタデータを保存します。

Cloud Runへ渡すイメージは、TerraformのDocker Providerが解決したダイジェストで固定されます。`/health`をstartup probeに使い、`startup_cpu_boost`と`cpu_idle`を有効にします。

最小インスタンス数は1です。Pacmanの最初の要求がコールドスタート中にタイムアウトする事態を避けるため、待機インスタンスを維持します。[Cloud Runの最小インスタンス](https://docs.cloud.google.com/run/docs/configuring/min-instances)には待機中の料金が発生します。

Cloud Runサービスには`roles/run.invoker`を`allUsers`へ付与します。Pacmanからの読み取りは公開し、パッケージを変更するAPIはCI APIキーで認証します。

Cloud Run Domain Mappingを作る前に、手元でTerraformを適用するGoogleアカウントから、Google Search Consoleで親ドメインの所有権を確認します。`terraform-deploy`が作成されたら、そのサービスアカウントも確認済み所有者へ追加します。

### Terraformを適用する

```bash
terraform -chdir=terraform/ayato init -backend-config=backend.hcl
terraform -chdir=terraform/ayato plan
terraform -chdir=terraform/ayato apply
```

適用後、Cloud RunのURL、独自ドメイン用のDNSレコード、CI APIキーをoutputから確認できます。

```bash
terraform -chdir=terraform/ayato output -json domain_mapping_dns
terraform -chdir=terraform/ayato output -raw ci_api_key \
  | gh secret set AYATO_TOKEN --repo OWNER/pacman-repo
gh variable set AYATO_URL --repo OWNER/pacman-repo --body "https://repo.example.com"
```

`OWNER`はGitHubのユーザー名またはOrganization名に置き換えます。`domain_mapping_dns`に表示されたレコードはCloudflare DNSへ追加し、Proxy statusをDNS onlyにします。

## lumineをCloudflare Pagesへ配置する

`terraform/lumine`は、Cloudflare Pagesのプロジェクト、独自ドメイン、DNSレコードを管理します。`terraform/lumine/terraform.tfvars`を次のように設定します。

```hcl
cloudflare_account_id = "your-cloudflare-account-id"
cloudflare_zone_id    = "your-zone-id"
cloudflare_api_token  = "your-pages-and-dns-api-token"
pages_project_name    = "personal-packages"
lumine_domain         = "packages.example.com"
```

Terraformは`personal-packages`というPagesプロジェクトを作り、`packages.example.com`からPagesのサブドメインへProxied CNAMEを設定します。

```bash
terraform -chdir=terraform/lumine init -backend-config=backend.hcl
terraform -chdir=terraform/lumine plan
terraform -chdir=terraform/lumine apply
```

`lumine`の静的ファイルはKamisatoの`build-lumine` Actionでビルドします。`ayato_url`に`https://repo.example.com`を渡すと、実行時設定とContent Security PolicyにAPIの接続先が入ります。生成物はWranglerで`personal-packages`へ配置します。

## GitHub Actionsからインフラを更新する

`.github/workflows/deploy.yml`は、KamisatoのrefをコミットSHAへ変換し、そのコミットから`ayato`のイメージと`lumine`の静的ファイルを配置します。`terraform/ayato`と`terraform/lumine`のStateは、同じバケット内で`prefix`を分けます。

```yaml
name: Deploy

on:
  workflow_dispatch:
    inputs:
      ref:
        description: "配置するKamisatoのref"
        default: b0f4d89743f68070e72802533a916e56e1e921bc

concurrency:
  group: deploy
  cancel-in-progress: false

permissions:
  contents: read
  id-token: write

env:
  KAMISATO_REPO: Hayao0819/Kamisato
  PAGES_PROJECT: personal-packages
  AYATO_URL: https://repo.example.com

jobs:
  resolve:
    runs-on: ubuntu-latest
    outputs:
      sha: ${{ steps.resolve.outputs.sha }}
    steps:
      - id: resolve
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          sha=$(gh api "repos/${KAMISATO_REPO}/commits/${{ inputs.ref }}" --jq .sha)
          echo "sha=${sha}" >>"${GITHUB_OUTPUT}"

  terraform:
    needs: resolve
    runs-on: ubuntu-latest
    env:
      TF_VAR_ayato_image_tag: sha-${{ needs.resolve.outputs.sha }}
      TF_VAR_project_id: ${{ vars.GCP_PROJECT_ID }}
      TF_VAR_cloudflare_account_id: ${{ vars.CF_ACCOUNT_ID }}
      TF_VAR_cloudflare_zone_id: ${{ vars.CLOUDFLARE_ZONE_ID }}
      TF_VAR_cloudflare_api_token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      TF_VAR_r2_access_key_id: ${{ secrets.R2_ACCESS_KEY_ID }}
      TF_VAR_r2_secret_access_key: ${{ secrets.R2_SECRET_ACCESS_KEY }}
      TF_VAR_cfkv_namespace_id: ${{ vars.CFKV_NAMESPACE_ID }}
      TF_VAR_cfkv_token: ${{ secrets.CFKV_TOKEN }}
      TF_VAR_r2_bucket_name: personal-pacman-packages
      TF_VAR_ayato_domains: '["repo.example.com"]'
      TF_VAR_auth_public_origin: https://packages.example.com
      TF_VAR_ayato_repos: '[{"name":"personal","arches":["x86_64"]}]'
      TF_VAR_pages_project_name: personal-packages
      TF_VAR_lumine_domain: packages.example.com
    steps:
      - uses: actions/checkout@v7
      - uses: google-github-actions/auth@v3
        with:
          project_id: ${{ vars.GCP_PROJECT_ID }}
          workload_identity_provider: ${{ vars.GCP_WORKLOAD_IDENTITY_PROVIDER }}
          service_account: ${{ vars.GCP_SERVICE_ACCOUNT }}
      - uses: hashicorp/setup-terraform@v4
        with:
          terraform_wrapper: false
      - name: Apply ayato
        working-directory: terraform/ayato
        run: |
          terraform init -input=false \
            -backend-config="bucket=${{ vars.TF_STATE_BUCKET }}" \
            -backend-config="prefix=ayato"
          terraform apply -input=false -auto-approve
      - name: Apply lumine
        working-directory: terraform/lumine
        run: |
          terraform init -input=false \
            -backend-config="bucket=${{ vars.TF_STATE_BUCKET }}" \
            -backend-config="prefix=lumine"
          terraform apply -input=false -auto-approve

  lumine:
    needs: [resolve, terraform]
    runs-on: ubuntu-latest
    steps:
      - id: build
        uses: Hayao0819/Kamisato/actions/build-lumine@b0f4d89743f68070e72802533a916e56e1e921bc
        with:
          ayato_url: ${{ env.AYATO_URL }}
          auth_mode: bearer
          ref: ${{ needs.resolve.outputs.sha }}
      - uses: cloudflare/wrangler-action@v4
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ vars.CF_ACCOUNT_ID }}
          command: >-
            pages deploy ${{ steps.build.outputs.dir }}
            --project-name=${{ env.PAGES_PROJECT }}
            --branch=main
```

`terraform/gcp`で作成した認証情報を使うため、Workflowには`id-token: write`を付けています。[GitHubのOIDC資料](https://docs.github.com/en/actions/reference/security/oidc)にも、この権限が必要だと記載されています。

CloudflareとStateの値は、GitHub SecretsとRepository Variableから渡します。

| 種類 | 名前 | 内容 |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | PagesとDNS用のAPIトークン |
| Secret | `R2_ACCESS_KEY_ID` | R2 Access Key ID |
| Secret | `R2_SECRET_ACCESS_KEY` | R2 Secret Access Key |
| Secret | `CFKV_TOKEN` | Workers KV用のAPIトークン |
| Variable | `CF_ACCOUNT_ID` | Cloudflare Account ID |
| Variable | `CLOUDFLARE_ZONE_ID` | 独自ドメインのZone ID |
| Variable | `CFKV_NAMESPACE_ID` | Workers KV Namespace ID |
| Variable | `GCP_PROJECT_ID` | Google CloudプロジェクトID |
| Variable | `TF_STATE_BUCKET` | `<PROJECT_ID>-tfstate` |
| Variable | `GCP_WORKLOAD_IDENTITY_PROVIDER` | Workload Identity Providerのリソース名 |
| Variable | `GCP_SERVICE_ACCOUNT` | `terraform-deploy`のメールアドレス |

Cloudflareの値を登録します。Secretのコマンドは標準入力を待つため、表示された入力欄へ値を貼り付けます。

```bash
gh variable set CF_ACCOUNT_ID --repo OWNER/pacman-repo --body "your-cloudflare-account-id"
gh variable set CLOUDFLARE_ZONE_ID --repo OWNER/pacman-repo --body "your-zone-id"
gh variable set CFKV_NAMESPACE_ID --repo OWNER/pacman-repo --body "your-workers-kv-namespace-id"

gh secret set CLOUDFLARE_API_TOKEN --repo OWNER/pacman-repo
gh secret set R2_ACCESS_KEY_ID --repo OWNER/pacman-repo
gh secret set R2_SECRET_ACCESS_KEY --repo OWNER/pacman-repo
gh secret set CFKV_TOKEN --repo OWNER/pacman-repo
```

この認証方法は、GitHub Actionsが実行時に発行するOIDCトークンをGoogle Cloudの短期認証情報へ交換します。[`google-github-actions/auth`](https://github.com/google-github-actions/auth)でも、長期間有効なJSON鍵よりWorkload Identity Federationが推奨されています。

初回は手元でTerraformを適用します。以後は`main`ブランチを選び、`deploy.yml`を`workflow_dispatch`から実行します。パッケージ定義とTerraformの変更履歴、Workflowの実行結果は`pacman-repo`に残ります。

## GitHub Actionsでパッケージを公開する

`.github/workflows/build.yml`は、`personal`以下へのpushと手動実行で起動します。処理は`plan`、`bump`、`build`、`prune`の順です。

このWorkflowが使う値は2個です。

| 種類 | 名前 | 内容 |
| --- | --- | --- |
| Variable | `AYATO_URL` | `https://repo.example.com` |
| Secret | `AYATO_TOKEN` | Terraformが生成したCI APIキー |

```yaml
name: Build and publish

on:
  push:
    branches: [main]
    paths: ["personal/**"]
  workflow_dispatch:
    inputs:
      packages:
        description: "再ビルドするpkgbaseを空白区切りで指定"
        required: false
        default: ""
      all:
        description: "すべてのパッケージを再ビルド"
        type: boolean
        required: false
        default: false

permissions:
  contents: write

concurrency:
  group: build-${{ github.ref }}

jobs:
  plan:
    runs-on: ubuntu-latest
    outputs:
      build_matrix: ${{ steps.plan.outputs.build_matrix }}
      prune_matrix: ${{ steps.plan.outputs.prune_matrix }}
      bumps: ${{ steps.plan.outputs.bumps }}
      any_build: ${{ steps.plan.outputs.any_build }}
    steps:
      - uses: actions/checkout@v7
        with:
          submodules: recursive
          fetch-depth: 0
      - uses: actions/setup-go@v7
        with:
          go-version: "1.x"
          cache: false
      - uses: Hayao0819/Kamisato/actions/install@b0f4d89743f68070e72802533a916e56e1e921bc
        with:
          ayaka: "true"
          version: b0f4d89743f68070e72802533a916e56e1e921bc
      - id: plan
        uses: Hayao0819/Kamisato/actions/plan@b0f4d89743f68070e72802533a916e56e1e921bc
        with:
          server: ${{ vars.AYATO_URL }}
          packages: ${{ github.event.inputs.packages }}
          all: ${{ github.event.inputs.all }}
          workers: 4

  bump:
    needs: plan
    if: needs.plan.outputs.bumps != '{}'
    runs-on: ubuntu-latest
    container: archlinux:latest
    outputs:
      sha: ${{ steps.bump.outputs.sha }}
    steps:
      - name: Install tooling
        run: pacman -Syu --noconfirm base-devel git go sudo jq
      - uses: actions/checkout@v7
        with:
          submodules: recursive
          fetch-depth: 0
      - uses: Hayao0819/Kamisato/actions/install@b0f4d89743f68070e72802533a916e56e1e921bc
        with:
          ayaka: "true"
          version: b0f4d89743f68070e72802533a916e56e1e921bc
      - id: bump
        uses: Hayao0819/Kamisato/actions/bump@b0f4d89743f68070e72802533a916e56e1e921bc
        with:
          bumps: ${{ needs.plan.outputs.bumps }}
          ref: main

  build:
    needs: [plan, bump]
    if: >-
      always() &&
      needs.plan.result == 'success' &&
      needs.plan.outputs.any_build == 'true' &&
      (needs.bump.result == 'success' || needs.bump.result == 'skipped')
    runs-on: ubuntu-latest
    timeout-minutes: 355
    strategy:
      fail-fast: false
      matrix: ${{ fromJSON(needs.plan.outputs.build_matrix) }}
    steps:
      - uses: actions/checkout@v7
        with:
          ref: ${{ needs.bump.outputs.sha || github.sha }}
          submodules: recursive
          fetch-depth: 0
      - uses: actions/setup-go@v7
        with:
          go-version: "1.x"
          cache: false
      - uses: Hayao0819/Kamisato/actions/install@b0f4d89743f68070e72802533a916e56e1e921bc
        with:
          ayaka: "true"
          version: b0f4d89743f68070e72802533a916e56e1e921bc
      - name: Build and publish packages
        uses: Hayao0819/Kamisato/actions/build@b0f4d89743f68070e72802533a916e56e1e921bc
        with:
          server: ${{ vars.AYATO_URL }}
          repo: ${{ matrix.repo }}
          arch: ${{ matrix.arch }}
          pkgs: ${{ matrix.pkgs }}
          api_key: ${{ secrets.AYATO_TOKEN }}

  prune:
    needs: [plan, bump, build]
    if: >-
      always() &&
      needs.plan.result == 'success' &&
      needs.build.result != 'failure' &&
      needs.build.result != 'cancelled'
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix: ${{ fromJSON(needs.plan.outputs.prune_matrix) }}
    steps:
      - uses: actions/checkout@v7
        with:
          ref: ${{ needs.bump.outputs.sha || github.sha }}
          submodules: recursive
          fetch-depth: 0
      - uses: actions/setup-go@v7
        with:
          go-version: "1.x"
          cache: false
      - uses: Hayao0819/Kamisato/actions/install@b0f4d89743f68070e72802533a916e56e1e921bc
        with:
          ayaka: "true"
          version: b0f4d89743f68070e72802533a916e56e1e921bc
      - name: Prune removed packages
        uses: Hayao0819/Kamisato/actions/prune@b0f4d89743f68070e72802533a916e56e1e921bc
        with:
          server: ${{ vars.AYATO_URL }}
          repo: ${{ matrix.repo }}
          arch: ${{ matrix.arch }}
          api_key: ${{ secrets.AYATO_TOKEN }}
```

KamisatoのActionは、記事執筆時のコミット`b0f4d89743f68070e72802533a916e56e1e921bc`へ固定しました。元にしたWorkflowは[`alterlinux-repo`の`build.yml`](https://github.com/FascodeNet/alterlinux-repo/blob/cbf106c90646b51fc52208502793fc9b71a7d8cd/.github/workflows/build.yml)です。

### plan

`plan`は`personal`のソースと`ayato`で配布中の内容を比較し、ビルド行列を作ります。パッケージのバージョンに加えて`makedepends`の連鎖も調べ、再ビルドが必要なパッケージを同じ計画に含めます。

初回は`packages`を空、`all`をfalseにして実行します。`ayaka plan`が配布前のパッケージを選びます。`all`は全パッケージを作り直すときに使います。

### bump

依存パッケージの更新に伴う再ビルドでは、`bump`が対象の`pkgrel`を増やして`main`へpushします。Workflowの`contents: write`はこの処理で使います。同じブランチの実行は`concurrency`で直列化します。

### build

`build`は計画された行列ごとにGitHub-hosted runnerを起動します。`ayaka`が依存されるパッケージから順にビルドし、完成するたびに`ayato`へ公開します。後続のビルドは`personal/repo.json`に書いたURLから新しい依存パッケージを取得できます。

### prune

`prune`はソースに残っている`PKGBUILD`と配布中の内容を比較し、削除されたパッケージを`ayato`から取り除きます。ビルド対象が0件の回にも実行されます。

## .SRCINFOを検査する

`.github/workflows/srcinfo.yml`から、Kamisatoの再利用可能なWorkflowを呼び出します。

```yaml
name: Check .SRCINFO

on:
  pull_request:
    paths: ["personal/**"]
  push:
    branches: [main]
    paths: ["personal/**"]

permissions:
  contents: read

jobs:
  srcinfo:
    uses: Hayao0819/Kamisato/.github/workflows/srcinfo-check.yml@b0f4d89743f68070e72802533a916e56e1e921bc
    with:
      repos: personal
      version: b0f4d89743f68070e72802533a916e56e1e921bc
```

例では記事執筆時のKamisatoのコミット`b0f4d89743f68070e72802533a916e56e1e921bc`へ固定しています。このWorkflowは`.SRCINFO`を再生成し、commit済みの内容との差を検査します。

## 上流の更新を取り込む

`.nvchecker.toml`を持つパッケージは、Kamisatoの`upstream-update.yml`で更新を確認できます。

```yaml
name: Update upstream versions

on:
  schedule:
    - cron: "0 3 * * *"
  workflow_dispatch: {}

permissions:
  contents: write
  actions: write

concurrency:
  group: build-refs/heads/main

jobs:
  update:
    uses: Hayao0819/Kamisato/.github/workflows/upstream-update.yml@b0f4d89743f68070e72802533a916e56e1e921bc
    with:
      version: b0f4d89743f68070e72802533a916e56e1e921bc
      ref: main
```

更新用Workflowは`PKGBUILD`と`.SRCINFO`を変更してpushし、その後に`build.yml`をdispatchします。[GitHub Actionsの仕様](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)では、`GITHUB_TOKEN`によるpushから別のWorkflowが起動しないためです。

Workflowを揃えたら、既定ブランチを`main`としてpushします。

```bash
git add .
git commit -m "feat: Add initial repository configuration"
git branch -M main
git push -u origin main
```

## 最初のビルドと動作確認

最初のpushには`personal`以下のファイルが含まれるため、`Build and publish`が自動で起動します。手動で実行し直す場合は`packages`を空、`all`をfalseにします。

push後に`main`ブランチから`Deploy`も実行します。Terraformの再適用に続いて`lumine`がCloudflare Pagesへ配置されます。

先に`ayato`の`/health`を確認します。

```bash
curl --fail --show-error https://repo.example.com/health
```

ビルド後はPacmanリポジトリのデータベースを取得します。R2への転送をたどるため、`--location`を付けます。

```bash
curl --fail --location --output /dev/null \
  --write-out '%{http_code}\n' \
  https://repo.example.com/repo/personal/x86_64/personal.db
```

どちらもHTTP 200を返せば、`ayato`とR2まで到達しています。

Pacmanから使う端末では、`/etc/pacman.conf`へ次の設定を追加します。

```ini
[personal]
SigLevel = Optional TrustAll
Server = https://repo.example.com/repo/$repo/$arch
```

設定後、データベースを更新してパッケージを確認します。

```bash
sudo pacman -Syu
pacman -Sl personal
```

`lumine`は`https://packages.example.com`で開きます。パッケージ一覧、検索、ビルド状況が表示され、API要求は`https://repo.example.com`へ送られます。

## 運用時に確認すること

この記事で使った[Cloud Run Domain Mapping](https://docs.cloud.google.com/run/docs/mapping-custom-domains)はPreviewで、利用できるリージョンも限られています。Google Cloudは本番環境の独自ドメインにGlobal external Application Load Balancerを推奨しています。個人用の範囲を越えて運用する場合は、独自ドメインの構成を先に見直します。

Workers KVは結果整合のストレージです。[Cloudflareの資料](https://developers.cloudflare.com/kv/concepts/how-kv-works/)では、書き込みが別の拠点から見えるまで60秒以上かかる場合があると説明されています。公開直後の確認では、参照する拠点によって以前のメタデータが返ることがあります。

現在のPacman設定は`SigLevel = Optional TrustAll`です。Kamisatoの署名機能を使う場合は、署名鍵の運用と利用端末への公開鍵の配布を決めたうえで、Pacman側の`SigLevel`を変更します。
