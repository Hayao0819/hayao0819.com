package tools

import (
	"github.com/Hayao0819/hayao0819.com/tools/newpost"
	"github.com/spf13/cobra"
	//"text/template"
)

func Cmd() *cobra.Command {
	cmd := cobra.Command{
		Use:   "blogtool",
		Short: "ブログを管理するためのいい感じなツール",
		Long:  "ブログの記事の新規作成やその他をよしなにしてくれるものです",
	}

	cmd.AddCommand(newpost.Cmd())

	return &cmd
}
