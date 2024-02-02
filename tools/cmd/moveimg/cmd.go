package moveimg

import (
	"os"
	"path"
	"strings"

	"github.com/Hayao0819/hayao0819.com/tools/utils/cobrautil"
	"github.com/Hayao0819/nahi/fputils"
	"github.com/spf13/cobra"
)

func Cmd() *cobra.Command {
	var postsDir string
	var publicDir string
	var currnet_dir string

	cmd := cobra.Command{
		Use:   "moveimg",
		Short: "画像を移動します",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			var err error
			currnet_dir, err = os.Getwd()
			if err != nil {
				return err
			}
			return nil
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			files, err := fputils.FileList(path.Join(currnet_dir, "posts"))
			if err != nil {
				return err
			}

			for _, file := range *files {
				tp, err := fputils.DetectFileType(file)
				if err != nil {
					continue
				}
				if strings.HasPrefix(tp, "image") {

				}
			}

			cmd.Println(*files)
			return nil
		},
	}
	cobrautil.ApplyTemplate(&cmd)
	cmd.Flags().StringVarP(&postsDir, "posts-dir", "p", path.Join(currnet_dir, "posts"), "記事のディレクトリ")
	cmd.Flags().StringVarP(&publicDir, "public-dir", "P", path.Join(currnet_dir, "public"), "公開ディレクトリ")

	return &cmd
}
