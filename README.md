# PosterCraft

<div align="center">
  <img src="./public/assets/logo.png" width="40%"/>
  <p>低代码全栈海报编辑器</p>
  <a href="https://poster-craft.leostar.top" style="text-decoration: none;">👀在线预览</a>&nbsp;&nbsp;
  |&nbsp;&nbsp;
  <a href="https://poster-craft-docs.vercel.app/" style="text-decoration: none;">📃在线文档</a>
</div>

## 🎈 项目介绍

本项目是一个海报编辑器，它融合了多种先进技术，为用户提供了强大而便捷的海报编辑体验。

## 🎯 技术栈

|   分类   |                                            工具                                             |
| :------: | :-----------------------------------------------------------------------------------------: |
|   前端   |                      react19、next.js、shadcn/ui、TailwindCSS、postcss                      |
|  工程化  |    eslint、commitlint、monorepo、cypress、vitest、jest、lint-staged、markdown、stylelint    |
| 第三方库 |               hotkeyjs（快捷键）、html2canvas（截图）、cropper.js（图片裁剪）               |
|   后端   | nest.js、drizzle-orm、redis、mysql、rbac（权限控制）、oss（云文件上传）、sharp（图片处理）  |
| 管理系统 |                             unstorage、ofetch/zod、veevalidate                              |
| 性能优化 |                          gzip 压缩、http 缓存、http2、图片转 webp                           |
|   CICD   | docker-compose 部署、github-action、vercel、lighthouse、sonarcloud、renovate、codecov、gulp |
|  云服务  |                        阿里云 OSS、阿里云 SMS、google、github Oauth2                        |

## 🚀 运行

### 1. 安装依赖

`clone` 仓库后进行 `pnpm i` 安装项目依赖（这里要保证你的node版本在20以上）

### 2. 环境配置

首先复制 `./apps/server/.env.example` 改成 `.env` 并更改里面配置，

👉[点此查看配置更改教程](./apps//server/README.md#环境变量配置)

配置完成后在根目录运行 `pnpm db:init` 初始化数据库表，按照提示选择 `yes` 即可

### 3. 运行服务

#### Server 端

```bash
pnpm dev:server
```

启动后访问 `localhost:3001` 即可

Swagger地址：`localhost:3001/swagger`

#### Web 端

```bash
pnpm dev:web
```

启动后访问 `localhost:3000` 即可

## 💖 贡献

欢迎各位大佬提 `PR/ISSUE` 贡献
