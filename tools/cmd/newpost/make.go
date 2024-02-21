package newpost

import (
	"os"
	"path"
	"path/filepath"
	"time"

	"github.com/Hayao0819/hayao0819.com/tools/post"
)

func MakePost(url, title, desc string) (*string, error) {
	// ファイルパスを取得
	currnet_dir, err := os.Getwd()
	if err != nil {
		return nil, err
	}

	fm, err := post.NewFrontMatterFromYaml(path.Join(currnet_dir, "tools", "assets", "frontmatter.yaml"), title, desc)
	if err != nil {
		return nil, err
	}

	mdpath := path.Join(currnet_dir, "posts", time.Now().Format("20060102"), url, "index.md")
	template := path.Join(currnet_dir, "tools", "assets", "template.mdx")

	// 存在確認
	if _, err := os.Stat(mdpath); err == nil {
		return nil, os.ErrExist
	}

	// Make template
	mddata, err := fm.GenerateMdFromTemplate(template)
	if err != nil {
		return nil, err
	}

	// ファイルを作成して書き込み
	os.MkdirAll(filepath.Dir(mdpath), os.FileMode(0750))
	err = os.WriteFile(mdpath, mddata, os.FileMode(0640))
	if err != nil {
		return nil, err
	}

	return &mdpath, nil
}
