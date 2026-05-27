# 宋亚轩 Song Yaxuan Showcase

一个以“月光蓝银”为主视觉的中英双语明星展示页，聚焦首屏氛围、照片墙和轻量资料展示，并接入 Netlify Identity 登录体验。

## 在线预览

- Live Site: https://song-yaxuan-showcase.netlify.app
- GitHub: https://github.com/wushg1224/song-yaxuan-showcase

## 项目亮点

- 首屏使用横屏主视觉和双语排版，突出 `宋亚轩 / Song Yaxuan`
- 照片墙支持本地图片直接替换，缺图时自动显示占位布局
- 视觉风格围绕月光蓝、银白、深夜蓝展开，兼顾轻盈和舞台感
- 内置 Netlify Identity 登录、注册和 GitHub OAuth 入口
- 使用 Vite 构建，可直接部署到 Netlify

## 技术栈

- HTML
- CSS
- Vanilla JavaScript
- Vite
- Netlify Identity

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 部署说明

项目已包含 [netlify.toml](./netlify.toml)，默认配置如下：

- Build command: `npm run build`
- Publish directory: `dist`

当前线上版本已部署在 Netlify。若要启用 Git 持续部署，需要在 Netlify 后台将该站点连接到 GitHub 仓库 `wushg1224/song-yaxuan-showcase`。

## Netlify Identity

部署后可在 Netlify 后台启用：

- `Project configuration > Identity`
- Registration: `Open` 或 `Invite only`
- External providers: `GitHub`

页面中的 GitHub 登录按钮已接入，完成 Netlify Identity 和 GitHub Provider 配置后即可使用。

## 图片约定

图片目录为 `assets/images/`：

- `hero-landscape.png`: 首屏横屏主视觉
- `gallery-01` 到 `gallery-12`: 照片墙图片，可使用 `.jpg`、`.jpeg`、`.png` 或 `.webp`

若图片缺失，页面会保留同尺寸占位区域，方便后续直接替换。

## 项目结构

```text
.
|-- assets/
|   `-- images/
|-- src/
|   `-- main.js
|-- index.html
|-- styles.css
|-- netlify.toml
`-- agent.md
```
