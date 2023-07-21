package newpost

import (
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
		Use:   "newpost タイトル 説明",
		Args:  cobra.RangeArgs(1, 2),
		Short: "新しい記事を作成します",
		RunE: func(cmd *cobra.Command, args []string) error {
			fm := NewBlogFrontMatter(args[0], "")
			if len(args) >= 2 {
				fm.Description = args[1]
			}

			//cmd.Println()
			tp, err := fm.MakeTemplate()
			if err != nil {
				return err
			}
			cmd.Println(string(tp))

			return nil
		},
	}

	return &cmd
}
