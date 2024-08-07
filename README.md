# cf downloader

## 📖 项目简介

cf downloader 是一个强大而灵活的文件下载工具,运行在 Cloudflare Workers 平台上。

> [!IMPORTANT]
> 请不要滥用，以免 CF 被封禁至完全不能访问

## 🌟 主要特性

- 🔒 安全代理: 通过密钥验证保护文件访问
- 🔗 灵活URL: 支持代理任何可公开访问的文件URL
- 🚄 高性能: 利用Cloudflare的全球网络,提供快速的文件访问
- 📤 保留headers: 维持原始文件的Content-Type和Content-Disposition
- 📥 多种请求方式: 同时支持GET和POST请求

## 🛠️ 如何使用

1. 克隆仓库 `git clone https://github.com/TinsFox/cf-downloader.git`
2. 安装依赖 `npm install`
3. 把 `wrangler.example.toml` 复制成 `wrangler.toml`，并且把其中的 `key` 修改成一个字符串，这是用来认证的 **密钥**。推荐使用 `openssl rand -hex 5` 生成
4. 部署Worker到您的Cloudflare账户，`npm deploy`(这个过程会提示你授权 cf 的 CLI)
5. 通过以下方式之一请求文件:
	 - GET 请求: https://your-worker.your-subdomain.workers.dev/?key=Your_Secret_Key&fileUrl=https://example.com/path/to/file.pdf

	 - POST 请求: 发送一个包含 `key` 和 `fileUrl` 字段的表单数据

	 - 使用谷歌扩展提供的页面，[传送门](https://github.com/TinsFox/cf-downloader-extension)

6. 静待文件下载。Worker将验证您的密钥,然后代理请求的文件

## 🤝 贡献

欢迎提交问题和拉取请求!让我们一起改进这个项目。

## 📜 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件

---

💡 如果您觉得这个项目有用,请给它一个星标 ⭐️
