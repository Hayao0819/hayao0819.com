package moveimg

import (
	"errors"
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
	var publicDir string
	var currentDir string

	cmd := cobra.Command{
		Use:   "moveimg",
		Short: "画像を移動します",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			// カレントディレクトリを取得
			var err error
			currentDir, err = os.Getwd()
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
				tp, err := futils.DetectFileType(file)
				if err != nil {
					continue
				}

				isImage := strings.HasPrefix(tp, "image")

				// if !isImage {
				// 	slog.Info("not image", "file", file, "type", tp)
				// }

				if isImage {
					// 移動先
					dist := strings.Replace(file, postsDir, publicDir, 1)

					// ディレクトリがなければ作成
					if err = os.MkdirAll(filepath.Dir(dist), 0755); err != nil {
						cmd.PrintErrln(err)
						errs = append(errs, err)
						continue
					}

					// 移動先チェック
					if futils.Exists(dist) {
						cmd.PrintErrln("already exists", dist)
						errs = append(errs, errors.New("already exists"))
						continue
					}

					// 移動
					cmd.Println(file, " => ", dist)
					err = os.Rename(file, dist)
					if err != nil {
						cmd.PrintErrln(err)
						errs = append(errs, err)
					}
				}

			}
			if len(errs) > 0 {
				return errors.New("error occured. see logs")
			}

			return nil
		},
	}
	cobrautil.ApplyTemplate(&cmd)
	cmd.Flags().StringVarP(&postsDir, "posts-dir", "p", path.Join(currentDir, "posts"), "記事のディレクトリ")
	cmd.Flags().StringVarP(&publicDir, "public-dir", "P", path.Join(currentDir, "public", "posts"), "公開ディレクトリ")

	return &cmd
}
