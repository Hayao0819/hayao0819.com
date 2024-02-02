package post

import (
	"strings"
	"time"

	"gopkg.in/yaml.v3"
)

type FrontMatter struct {
	Title       string         `yaml:"title"`
	Description string         `yaml:"description"`
	Date        time.Time      `yaml:"date"`
	Categories  []Category `yaml:"categories"`
}

func NewFrontMatter(title string, desc string) *FrontMatter {
	return &FrontMatter{
		Title:       title,
		Description: desc,
		Date:        time.Now(),
		Categories:  Categories,
	}
}

func (f *FrontMatter) GetYaml() ([]byte, error) {
	return yaml.Marshal(*f)
}

func (f *FrontMatter) MakeTemplate() ([]byte, error) {
	yamlData, err := f.GetYaml()
	if err != nil {
		return []byte{}, err
	}
	return []byte("---\n" + strings.TrimSpace(string(yamlData)) + "\n---\n"), nil
}
