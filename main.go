package main

import (
	"os"
	"strings"
	"time"

	"github.com/spf13/cobra"
	"gopkg.in/yaml.v3"
	//"text/template"
)

type BlogCategory string

var Categories = []BlogCategory{
	"hoge",
	"fugo",
	"anime",
}

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

func (f *BlogFrontMatter)MakeTemplate()([]byte, error){
	yamlData, err := f.GetYaml()
	if err !=nil{
		return []byte{}, err
	}
	return []byte("---\n" + strings.TrimSpace(string(yamlData))+"\n---\n"), nil
}

func newPostCmd() *cobra.Command {
	cmd := cobra.Command{
		Use:   "newpost タイトル 説明",
		Args:  cobra.RangeArgs(1, 2),
		Short: "新しい記事を作成します",
		RunE: func(cmd *cobra.Command, args []string) error {
			fm := NewBlogFrontMatter(args[0], "")
			if len(args) >= 2 {
				fm.Description = args[1]
			}

			//cmd.Println()
			tp, err := fm.MakeTemplate()
			if err !=nil{
				return err
			}
			cmd.Println(string(tp))

			return nil
		},
	}

	return &cmd
}

func rootCmd() *cobra.Command {
	cmd := cobra.Command{
		Use:   "blogtool",
		Short: "ブログを管理するためのいい感じなツール",
		Long:  "ブログの記事の新規作成やその他をよしなにしてくれるものです",
	}

	cmd.AddCommand(newPostCmd())

	return &cmd
}

func main() {
	cmd := rootCmd()
	cmd.SetOutput(os.Stdout)
	if err := cmd.Execute(); err != nil {
		cmd.SetOutput(os.Stderr)
		cmd.PrintErr(err)
		os.Exit(1)
	}
}
