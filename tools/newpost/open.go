package newpost

import "os/exec"

func Open(path string)error{
	var cmd string
	for _, c := range []string{"xdg-open","open",}{
		
		if _, err := exec.LookPath(c); err ==nil{
			cmd=c
		}
	}
	if len(cmd) < 1{
		return exec.ErrNotFound
	}

	return OpenWithCmd(path, cmd)
}

func OpenWithCmd(path,cmd string)error{
	run := exec.Command(cmd, path)
	return run.Run()
}
