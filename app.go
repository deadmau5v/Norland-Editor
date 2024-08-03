package main

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App 结构体
type App struct {
	ctx   context.Context
	title string
}

// NewApp 创建一个新的 App 应用程序结构体
func New() *App {
	return &App{}
}

// startup 在应用程序启动时调用
func (a *App) startup(ctx context.Context) {
	// 在此处执行您的设置
	a.ctx = ctx
}

// domReady 在前端资源加载完成后调用
func (a App) domReady(ctx context.Context) {
	// 在此处添加您的操作
}

// beforeClose 在应用程序即将退出时调用，
// 可能是通过点击窗口关闭按钮或调用 runtime.Quit。
// 返回 true 将导致应用程序继续运行，返回 false 将正常继续关闭。
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown 在应用程序终止时调用
func (a *App) shutdown(ctx context.Context) {
	// 在此处执行您的清理工作
}

func (a *App) Minimize() {
	runtime.WindowMinimise(a.ctx)
}

func (a *App) Close() {
	runtime.Quit(a.ctx)
}

func (a *App) GetTitle() string {
	return a.title
}
