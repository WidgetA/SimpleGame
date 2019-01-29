package main

import (
	"github.com/kataras/iris"
)

func IndexHandle (ctx iris.Context) {
	ctx.View("index.html")
}

func main() {
	app := iris.New()
	app.StaticWeb("js", "./js")
	app.StaticWeb("css", "./css")
	app.StaticWeb("images", "./images")
	app.RegisterView(iris.HTML("./", ".html"))
	app.Get("/", IndexHandle)
	app.Run(iris.Addr(":2333"))
}

