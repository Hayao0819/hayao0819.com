package newpost

import (
	"os"
	"path"
	"path/filepath"
	"time"

	"github.com/Hayao0819/hayao0819.com/tools/post"
)

func MakePost(url, title, desc string) (*string, error) {
	fm := post.NewFrontMatter(title, desc)

	// Make template
	tp, err := fm.MakeTemplate()
	if err != nil {
		return nil, err
	}

	// path
	currnet_dir, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	path := path.Join(currnet_dir, "posts", time.Now().Format("20060102"), url, "index.md")

	// Make file
	os.MkdirAll(filepath.Dir(path), os.FileMode(0750))
	err = os.WriteFile(path, tp, os.FileMode(0640))
	if err != nil {
		return nil, err
	}

	return &path, nil
}
