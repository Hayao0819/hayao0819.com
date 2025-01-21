package main

import (
	"os"

	"github.com/Hayao0819/hayao0819.com/tools/cmd"
)

func main() {
	cmd := cmd.Root()
	cmd.SetOutput(os.Stdout)
	if err := cmd.Execute(); err != nil {
		cmd.SetOutput(os.Stderr)
		cmd.PrintErrln(err)
		os.Exit(1)
	}
}
