package stripexif

import (
	"strings"

	"github.com/Hayao0819/nahi/futils"
	"github.com/disintegration/imaging"
)

func stripExif(file string) error {

	ft, err := futils.DetectFileType(file)
	if err != nil {
		return err
	}

	isImage := strings.HasPrefix(ft, "image")

	if !isImage {
		return nil
	}

	img, err := imaging.Open(file, imaging.AutoOrientation(true))
	if err != nil {
		return err

	}

	// imaging.Save(img, file)
	if err := imaging.Save(img, file); err != nil {
		return err
	}

	return nil
}
