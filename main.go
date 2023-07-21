package main

import (
	"os"
	"time"

	"github.com/spf13/cobra"
	//"text/template"
)

type BlogFrontMatter struct{
	Title string
	Description string
	Date time.Time
}

func NewBlogFrontMatter(title string, desc string) *BlogFrontMatter{
	return &BlogFrontMatter{
		Title: title,
		Description: desc,
		Date: time.Now(),
	}
}

func rootCmd()*cobra.Command{
	cmd := cobra.Command{
		Use: "blogtool",
		Short: "ブログを管理するためのいい感じなツール",
		Long: "ブログの記事の新規作成やその他をよしなにしてくれるものです",
	}

	return &cmd
}

func main(){
	cmd := rootCmd()
	cmd.SetArgs(os.Args)
	if cmd.Execute() != nil{
		os.Exit(-1)
	}
}
