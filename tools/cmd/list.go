package cmd

import (
	"github.com/Hayao0819/hayao0819.com/tools/cmd/list"
	"github.com/Hayao0819/nahi/cobrautils"
)

func init() {
	cobrautils.AddSubCmds(list.Cmd())
}
