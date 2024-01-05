package newpost

import (
	"os"
	"path"
	"path/filepath"

	//"strings"
	"time"

	"github.com/spf13/cobra"
)

type BlogCategory string

var Categories = []BlogCategory{
	"hoge",
	"fugo",
	"anime",
}

func Cmd() *cobra.Command {
	cmd := cobra.Command{
		Use:   "newpost URL タイトル 説明",
		Args:  cobra.RangeArgs(2, 3),
		Short: "新しい記事を作成します",
		RunE: func(cmd *cobra.Command, args []string) error {
			desc := ""
			if len(args) >= 3 {
				desc = os.Args[2]
			}
			path, err := MakePost(args[0], args[1], desc)
			if err != nil {
				return err
			}
			if path != nil {
				cmd.Println(*path)
			}

			return nil
		},
	}

	return &cmd
}

func MakePost(url, title, desc string) (*string, error) {
	fm := NewBlogFrontMatter(title, desc)

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
