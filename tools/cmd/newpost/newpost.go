package newpost

import (
	"github.com/spf13/cobra"
)

func Cmd() *cobra.Command {
	argdata := struct {
		url    string
		title  string
		desc   string
		wizard bool
	}{
		url:    "",
		title:  "",
		desc:   "",
		wizard: false,
	}

	cmd := cobra.Command{
		Use:     "new URL タイトル 説明",
		Aliases: []string{"newpost"},
		Args:    cobra.MatchAll(cobra.ExactArgs(0), cobra.RangeArgs(2, 3)),
		Short:   "新しい記事を作成します",
		PreRun: func(cmd *cobra.Command, args []string) {
			if len(args) == 0 {
				argdata.wizard = true
				return
			} else {
				argdata.wizard = false
			}

			if len(args) >= 1 {
				argdata.url = args[0]
			}
			if len(args) >= 2 {
				argdata.title = args[1]
			}
			if len(args) >= 3 {
				argdata.desc = args[2]
			}
		},
		RunE: func(cmd *cobra.Command, _ []string) error {
			var (
				path *string
				err  error
			)

			// Make file and return path
			if argdata.wizard {
				path, err = MakePostWizard()
			} else {
				path, err = MakePost(argdata.url, argdata.title, argdata.desc)
			}

			// Error handling
			if err != nil {
				return err
			}

			// Print path
			if path != nil {
				cmd.Println(*path)
			}

			return nil
		},
	}

	return &cmd
}
