package cmd

import "github.com/Hayao0819/hayao0819.com/tools/cmd/list"

func init() {
	SubCmds = append(SubCmds, list.Cmd())
}
