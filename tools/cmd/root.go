package cmd

import (
	"github.com/Hayao0819/hayao0819.com/tools/utils/cobrautil"
	"github.com/Hayao0819/nahi/cobrautils"
	"github.com/spf13/cobra"
)

func Root() *cobra.Command {
	root := cobra.Command{
		Use:   "blogtool",
		Short: "ブログを管理するためのいい感じなツール",
		Long:  "ブログの記事の新規作成やその他をよしなにしてくれるものです",
	}
	cobrautils.BindSubCmds(&root)
	cobrautil.ApplyTemplate(&root)
	return &root
}

