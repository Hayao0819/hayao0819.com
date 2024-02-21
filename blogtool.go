package main

import (
	"os"

	"github.com/Hayao0819/hayao0819.com/tools"
)

func main() {
	cmd := tools.Cmd()
	cmd.SetOutput(os.Stdout)
	if err := cmd.Execute(); err != nil {
		cmd.SetOutput(os.Stderr)
		cmd.PrintErrln(err)
		os.Exit(1)
	}
}
