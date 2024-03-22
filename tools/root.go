package tools

import (
	"github.com/Hayao0819/hayao0819.com/tools/cmd"
	"github.com/Hayao0819/hayao0819.com/tools/utils/cobrautil"
	"github.com/spf13/cobra"
)

func Cmd() *cobra.Command {
	root := cobra.Command{
		Use:   "blogtool",
		Short: "ブログを管理するためのいい感じなツール",
		Long:  "ブログの記事の新規作成やその他をよしなにしてくれるものです",
	}
	root.AddCommand(cmd.SubCmds...)
	cobrautil.ApplyTemplate(&root)
	return &root
}
