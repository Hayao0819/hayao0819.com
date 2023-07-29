package newpost

import (
	"strings"
	"time"

	"gopkg.in/yaml.v3"
)

type BlogFrontMatter struct {
	Title       string         `yaml:"title"`
	Description string         `yaml:"description"`
	Date        time.Time      `yaml:"date"`
	Categories  []BlogCategory `yaml:"categories"`
}

func NewBlogFrontMatter(title string, desc string) *BlogFrontMatter {
	return &BlogFrontMatter{
		Title:       title,
		Description: desc,
		Date:        time.Now(),
		Categories:  Categories,
	}
}

func (f *BlogFrontMatter) GetYaml() ([]byte, error) {
	return yaml.Marshal(*f)
}

func (f *BlogFrontMatter) MakeTemplate() ([]byte, error) {
	yamlData, err := f.GetYaml()
	if err != nil {
		return []byte{}, err
	}
	return []byte("---\n" + strings.TrimSpace(string(yamlData)) + "\n---\n"), nil
}
