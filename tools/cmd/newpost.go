package cmd

import "github.com/Hayao0819/hayao0819.com/tools/cmd/newpost"

func init() {
	SubCmds = append(SubCmds, newpost.Cmd())
}
