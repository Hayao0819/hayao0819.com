package utils

import (
	"github.com/Hayao0819/nahi/fputils"
)

func GetPostFiles(dir string) (*[]string, error) {
	files, err := fputils.RecursionFileList(dir)
	if err != nil {
		return nil, err
	}
	return files, nil
}
