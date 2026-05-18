# 宋亚轩明星展示界面

一个中英双语粉丝视觉展示页，主色为月光蓝银，并接入 Netlify Identity 账号登录、注册与 GitHub OAuth。

## 预览

本项目使用 Vite 打包，因为 Netlify Identity 需要通过 `@netlify/identity` 模块接入。

```bash
npm install
npm run dev
npm run build
```

本地页面可预览界面，但 Netlify Identity 需要部署到 Netlify 后才能完整测试登录、注册、邮箱确认和 OAuth 回调。

## Netlify Identity

部署后请在 Netlify 项目中启用：

- Project configuration > Identity
- Registration: Open 或 Invite only
- External providers: GitHub

GitHub OAuth 按钮已在页面的「账号登录」区域接入，回调会在页面加载时自动处理。

## 图片命名

请将图片放入 `assets/images/`：

- `hero-landscape.png`：首屏横屏主视觉
- `gallery-01.png` 到 `gallery-12.png`：照片墙图片

如果图片暂时缺失，页面会显示同尺寸占位区域，之后按命名放入图片即可自动替换。
