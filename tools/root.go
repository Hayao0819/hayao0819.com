package tools

import (
	"github.com/Hayao0819/hayao0819.com/tools/cmd/moveimg"
	"github.com/Hayao0819/hayao0819.com/tools/cmd/newpost"
	"github.com/Hayao0819/hayao0819.com/tools/utils/cobrautil"
	"github.com/spf13/cobra"
)

func Cmd() *cobra.Command {
	cmd := cobra.Command{
		Use:   "blogtool",
		Short: "ブログを管理するためのいい感じなツール",
		Long:  "ブログの記事の新規作成やその他をよしなにしてくれるものです",
	}
	cmd.AddCommand(newpost.Cmd(), moveimg.Cmd())
	cobrautil.ApplyTemplate(&cmd)
	return &cmd
}
