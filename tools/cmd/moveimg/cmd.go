package moveimg

import (
	"errors"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/Hayao0819/hayao0819.com/tools/utils"
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
			abs, err = filepath.Abs(publicDir)
			if err != nil {
				return err
			}
			publicDir = abs
			return nil
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			files, err := utils.GetPostFiles(postsDir)
			if err != nil {
				return err
			}

			errs := []error{}
			for _, file := range *files {
				tp, err := fputils.DetectFileType(file)
				if err != nil {
					continue
				}

				if strings.HasPrefix(tp, "image") {
					// 移動先
					dist := strings.Replace(file, postsDir, publicDir, 1)

					// ディレクトリがなければ作成
					if err = os.MkdirAll(filepath.Dir(dist), 0755); err != nil {
						cmd.PrintErrln(err)
						errs = append(errs, err)
						continue
					}

					// 移動
					cmd.Println(file, " => ", dist)
					err = os.Rename(file, dist)
					if err != nil {
						cmd.PrintErrln(err)
						errs = append(errs, err)
					}
				} //else if strings.HasPrefix(tp, "text") {

				// 	data, err := os.ReadFile(file)
				// 	if err != nil {
				// 		cmd.PrintErrln(err)
				// 		errs = append(errs, err)
				// 		continue
				// 	}

				// 	// 画像のパスを変更
				// 	data = []byte(strings.ReplaceAll(string(data), "![", "!["+path.Base(postsDir)+"/"))
				// }

			}
			if len(errs) > 0 {
				return errors.New("error occured. see logs")
			}

			return nil
		},
	}
	cobrautil.ApplyTemplate(&cmd)
	cmd.Flags().StringVarP(&postsDir, "posts-dir", "p", path.Join(currnet_dir, "posts"), "記事のディレクトリ")
	cmd.Flags().StringVarP(&publicDir, "public-dir", "P", path.Join(currnet_dir, "public", "posts"), "公開ディレクトリ")

	return &cmd
}
