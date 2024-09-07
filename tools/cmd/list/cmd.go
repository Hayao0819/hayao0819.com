package list

import (
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/Hayao0819/hayao0819.com/tools/utils"
	"github.com/Hayao0819/hayao0819.com/tools/utils/cobrautil"
	"github.com/Hayao0819/nahi/futils"
	"github.com/spf13/cobra"
)

func Cmd() *cobra.Command {
	var postsDir string
	var currnet_dir string

	cmd := cobra.Command{
		Use:   "list",
		Short: "記事の一覧を表示します",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			// カレントディレクトリを取得
			var err error
			currnet_dir, err = os.Getwd()
			if err != nil {
				return err
			}

			// 絶対パスに変換
			abs, err := filepath.Abs(postsDir)
			if err != nil {
				return err
			}
			postsDir = abs
			return nil
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			files, err := utils.GetPostFiles(postsDir)
			if err != nil {
				return err
			}

			for _, file := range *files {
				filetype, err := futils.DetectFileType(file)
				if err != nil {
					continue
				}

				if strings.HasPrefix(filetype, "text") || strings.HasSuffix(file, ".md") || strings.HasSuffix(file, ".mdx") {
					cmd.Println(file)
				}

			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&postsDir, "posts-dir", "p", path.Join(currnet_dir, "posts"), "記事のディレクトリ")

	cobrautil.ApplyTemplate(&cmd)
	return &cmd
}
