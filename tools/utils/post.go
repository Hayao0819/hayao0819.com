package utils

import (
	"github.com/Hayao0819/nahi/futils"
)

func GetPostFiles(dir string) (*[]string, error) {
	files, err := futils.RecursionFileList(dir)
	if err != nil {
		return nil, err
	}
	return files, nil
}
