package stripexif

import (
	"errors"
	"os"
	"path"
	"path/filepath"
	"sync"

	"github.com/Hayao0819/hayao0819.com/tools/utils/cobrautil"
	"github.com/Hayao0819/nahi/flist"
	"github.com/Hayao0819/nahi/futils"
	"github.com/spf13/cobra"
)

func Cmd() *cobra.Command {
	var publicDir string
	var currentDir string
	cmd := cobra.Command{
		Use: "stripexif",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			var err error

			currentDir, err = os.Getwd()
			if err != nil {
				return err
			}

			publicDir, err = filepath.Abs(publicDir)
			if err != nil {
				return err
			}
			return nil
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			files, err := flist.Get(publicDir)
			if err != nil {
				return err
			}

			errs := []error{}

			wg := sync.WaitGroup{}
			wg.Add(len(*files))

			for _, file := range *files {
				go func() {
					if futils.IsDir(file) {
						wg.Done()
						return
					}

					cmd.PrintErrln("strip exif from", file)
					err := stripExif(file)
					if err != nil {
						cmd.PrintErrln(err)
						errs = append(errs, err)
					}

					wg.Done()
				}()
			}

			wg.Wait()

			if len(errs) > 0 {
				return errors.New("error occurred. see logs")
			}

			return nil
		},
	}
	cobrautil.ApplyTemplate(&cmd)
	cmd.Flags().StringVarP(&publicDir, "public-dir", "P", path.Join(currentDir, "public", "posts"), "公開ディレクトリ")
	return &cmd
}
