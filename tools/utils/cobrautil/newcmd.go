package cobrautil

import "github.com/spf13/cobra"

func Command() cobra.Command {
	cmd := cobra.Command{}
	ApplyTemplate(&cmd)
	return cmd
}

func ApplyTemplate(cmd *cobra.Command) {
	cmd.CompletionOptions.DisableDefaultCmd = true
	cmd.SilenceUsage = true
	//cmd.SilenceErrors = true
	//println(cmd.UsageTemplate())
}
