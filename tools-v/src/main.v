module main

import cli
import os


fn root () cli.Command{
	cmd := cli.Command{
		name: "blogtool",
	}

	return cmd
}

fn main() {
	mut cmd := root()
	cmd.setup()
	cmd.parse(os.args)
}
