package post

import (
	"os"
	"strings"
	"time"

	"github.com/Hayao0819/nahi/tputils"
	"gopkg.in/yaml.v3"
)

type FrontMatter struct {
	Title       string    `yaml:"title"`
	Description string    `yaml:"description"`
	Date        time.Time `yaml:"date"`
	Categories  []string  `yaml:"categories"`
	Draft       bool      `yaml:"draft"`
	Publish     bool      `yaml:"publish"`
}

func GetFrontMatterFromYaml(path string) (*FrontMatter, error) {
	buf, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	fm := FrontMatter{}
	err = yaml.Unmarshal(buf, &fm)
	if err != nil {
		return nil, err
	}
	return &fm, nil
}

func NewFrontMatter(title, desc string) *FrontMatter {
	return &FrontMatter{
		Title:       title,
		Description: desc,
		Date:        time.Now(),
	}
}

func NewFrontMatterFromYaml(yamlPath, title, desc string) (*FrontMatter, error) {
	fm, err := GetFrontMatterFromYaml(yamlPath)
	if err != nil {
		return nil, err
	}

	fm.Title = title
	fm.Description = desc
	fm.Date = time.Now()

	return fm, nil
}

func (f *FrontMatter) GetYaml() ([]byte, error) {
	return yaml.Marshal(*f)
}

func (f *FrontMatter) GetYamlString() (string, error) {
	yamlData, err := f.GetYaml()
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(yamlData)), nil
}

func (f *FrontMatter) GenerateMdFromTemplate(tmplPath string) ([]byte, error) {
	// テンプレート用のデータ構造
	type applyData struct {
		FrontMatterString string
		FrontMatter
	}

	// フロントマターをYAMLに変換
	yaml, err := f.GetYamlString()
	if err != nil {
		return nil, err
	}

	//fmt.Println(yaml)

	// テンプレートに適用するデータを作成
	data := applyData{
		FrontMatterString: yaml,
		FrontMatter:       *f,
	}

	buf, err := tputils.ApplyTemplate(tmplPath, data)
	if err != nil {
		return nil, err
	}
	return buf.Bytes(), nil

}
