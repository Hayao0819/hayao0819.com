package cmd

import "github.com/Hayao0819/hayao0819.com/tools/cmd/moveimg"

func init() {
	SubCmds = append(SubCmds, moveimg.Cmd())
}
