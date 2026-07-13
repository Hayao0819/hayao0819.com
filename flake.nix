{
  description = "hayao0819.com devshell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              nodejs_22
              pnpm
              go
            ];

            shellHook = ''
              # 外部環境の GOROOT (system の /usr/lib/go 等) が nix の go と食い違い
              # コンパイラ不整合を起こすため、devshell 内では go に合わせて固定する
              export GOROOT="${pkgs.go}/share/go"

              echo "hayao0819.com dev environment"
              echo "  node: $(node --version)"
              echo "  pnpm: $(pnpm --version)"
              echo "  go:   $(go version | cut -d' ' -f3)"
            '';
          };
        }
      );
    };
}
