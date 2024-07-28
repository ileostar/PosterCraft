# PosterCraft 贡献指南

## 开发环境

你需要 Nodejs 版本在 20 +, 并且 pnpm 版本 9 + 。

`clone` 代码后，运行：

```bash
pnpm i # 安装依赖
```

简述使用工具：

- TypeScript 作为开发语言
- Tsup 和 Vite 作为打包工具
- Jest 作为单元测试工具
- Tsx 运行TS
- Nextjs 作为前端框架
- Nestjs 作为后端框架
- Unocss 写样式
- Prettier 格式化代码
- ESLint 用于静态错误预防(在类型之外)

详细技术栈：

|   分类   |          工具          | 描述                                     |
| :------: | :--------------------: | :--------------------------------------- |
|   前端   |        react19         | 用于构建用户界面的 JavaScript 库。       |
|   前端   |        next.js         | 一个用于构建服务器端渲染应用的框架。     |
|   前端   |       shadcn/ui        | 一套 UI 组件库。                         |
|   前端   |      tailwindCss       | 一个实用的 CSS 框架。                    |
|   前端   |        postcss         | 用于处理 CSS 的工具。                    |
|  工程化  |         eslint         | 代码检查工具，帮助保持代码风格的一致性。 |
|  工程化  |       commitlint       | 用于规范提交信息的工具。                 |
|  工程化  |        monorepo        | 单一代码仓库管理方式。                   |
|  工程化  |        cypress         | 端到端测试工具。                         |
|  工程化  |         vitest         | 轻量级的测试框架。                       |
|  工程化  |          jest          | 常用的测试框架。                         |
|  工程化  |      lint-staged       | 在提交代码时执行特定 lint 任务。         |
|  工程化  |        markdown        | 一种标记语言。                           |
|  工程化  |       stylelint        | CSS 代码风格检查工具。                   |
| 第三方库 |   hotkeyjs（快捷键）   | 用于处理快捷键操作的库。                 |
| 第三方库 |  html2canvas（截图）   | 将网页内容转换为图片的工具。             |
| 第三方库 | cropper.js（图片裁剪） | 用于图片裁剪的库。                       |
|   后端   |        nest.js         | 一个用于构建高效后端应用的框架。         |
|   后端   |      drizzle-orm       | 数据库 ORM 工具。                        |
|   后端   |         redis          | 内存数据库。                             |
|   后端   |         mysql          | 关系型数据库。                           |
|   后端   |    rbac（权限控制）    | 基于角色的访问控制机制。                 |
|   后端   |   oss（云文件上传）    | 对象存储服务。                           |
|   后端   |   sharp（图片处理）    | 用于图片处理的工具。                     |
| 管理系统 |       unstorage        | 数据存储管理工具。                       |
| 管理系统 |       ofetch/zod       | 数据请求和验证工具。                     |
| 管理系统 |      veevalidate       | 表单验证工具。                           |
| 性能优化 |       gzip 压缩        | 减少网络传输数据量的压缩技术。           |
| 性能优化 |       http 缓存        | 提高资源加载速度的缓存策略。             |
| 性能优化 |         http2          | 新的 HTTP 协议版本，提升性能。           |
| 性能优化 |      图片转 webp       | 将图片格式转换为 webp 以优化性能。       |
|   CICD   |  docker-compose 部署   | 使用 Docker 进行应用部署。               |
|   CICD   |     github-action      | GitHub 提供的自动化工作流程工具。        |
|   CICD   |         vercel         | 用于部署前端应用的平台。                 |
|   CICD   |       lighthouse       | 用于评估网页性能的工具。                 |
|   CICD   |       sonarcloud       | 代码质量分析工具。                       |
|   CICD   |        renovate        | 自动更新依赖的工具。                     |
|   CICD   |        codecov         | 代码覆盖率分析工具。                     |
|   CICD   |          gulp          | 任务自动化工具。                         |
|  云服务  |       阿里云 OSS       | 阿里云对象存储服务。                     |
|  云服务  |       阿里云 SMS       | 阿里云短信服务。                         |
|  云服务  | google、github Oauth2  | 第三方认证服务。                         |

## 命令

| 命令              | 描述                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `schema:build`    | 运行`@poster-craft/schema`包的`build`脚本，该命令用于构建或编译数据库模式或相关配置。                                |
| `db:init`         | 首先执行`schema:build`，然后运行`@poster-craft/db`包的`init`脚本，用于初始化数据库。                                 |
| `db:init:test`    | 类似于`db:init`，但运行的是`@poster-craft/db`包的`init:test`脚本，用于初始化测试数据库。                             |
| `db:init:test:ci` | 类似于`db:init:test`，为了持续集成（CI）环境优化的版本。                                                             |
| `dev:web`         | 运行`web`包的`dev`脚本，通常用于启动Web开发服务器。                                                                  |
| `dev:server`      | 运行`server`包的`start`脚本，用于启动后端服务。                                                                      |
| `lint`            | 使用`turbo`（一种多包管理工具）执行`lint`任务，`--no-daemon`选项可能用于避免使用守护进程。                           |
| `test`            | 使用`turbo`执行测试任务，`--no-daemon`选项同样可能用于避免使用守护进程。                                             |
| `format`          | 使用`prettier`格式化项目中的代码，`--write --cache`选项表示写入更改并缓存结果以优化后续运行。                        |
| `format-check`    | 使用`prettier`检查代码格式是否符合要求，`--check --cache`选项表示仅检查不写入更改并缓存结果。                        |
| `build`           | 首先执行`schema:build`，然后使用`turbo`执行构建任务，`--no-daemon`选项用于避免使用守护进程。                         |
| `build:server`    | 类似于`build`，但专注于后端服务的构建，首先执行`schema:build`，然后运行`server`包的`build`脚本。                     |
| `build:web`       | 运行`web`包的`build`脚本，用于构建Web应用的生产版本。                                                                |
| `test:ci`         | 在CI环境中执行测试，首先运行`server`包的测试脚本，然后运行`web`包的`test:ci`脚本，可能是为了更严格的测试环境或配置。 |
| `docs:dev`        | 运行`docs`包的`docs:dev`脚本，通常用于启动文档开发服务器。                                                           |
| `build:docs`      | 运行`docs`包的`docs:build`脚本，用于构建文档的静态版本。                                                             |
| `preinstall`      | 在`pnpm install`之前运行，使用`npx only-allow pnpm`确保只能通过`pnpm`进行包管理。                                    |
| `postinstall`     | 在`ppnpm install`之后运行，`simple-git-hooks`安装Git钩子                                                             |

## 代码提交

请下载 `gitmoji` 插件来规范commit，支持的emoji可以再[`./scripts/verify-commit`](./scripts//verify-commit.ts)查看

## 目录结构

```txt
├─📁 .github-------------------------- // github文件夹
│ ├─📄 budget.json
│ ├─📄 FUNDING.yml
│ ├─📄 renovate.json
│ └─📁 workflows---------------------- // github action工作流
├─📁 .turbo
├─📁 .vscode
├─📁 apps----------------------------- // 主应用
│ ├─📁 monitor------------------------ // 监控服务
│ ├─📁 server------------------------- // 后端服务
│ └─📁 web---------------------------- // 前端应用
├─📁 packages------------------------- // 包
│ ├─📁 db----------------------------- // 数据库
│ ├─📁 docs--------------------------- // 文档
│ ├─📁 schema------------------------- // 数据库表
│ ├─📁 shared------------------------- // 公共包
│ └─📁 ui----------------------------- // ui库
├─📁 public--------------------------- // 公共资源
│ ├─📁 assets------------------------- // 资源
│ └─📁 screenshot--------------------- // 截图
├─📁 scripts-------------------------- // 脚本
├─📄 .gitignore
├─📄 .gitattributes------------------- // git属性配置
├─📄 .editorconfig-------------------- // IDE配置
├─📄 CHANGELOG.md
├─📄 CONTRIBUTING.md
├─📄 LICENSE
├─📄 package.json
├─📄 pnpm-lock.yaml
├─📄 pnpm-workspace.yaml
├─📄 prettier.config.mjs
├─📄 .lintstagedrc.mjs
├─📄 .node-version
├─📄 .npmrc
├─📄 .prettierignore
├─📄 .simple-git-hooks.js
├─📄 README.md
├─📄 tsconfig.json
└─📄 turbo.json
```
