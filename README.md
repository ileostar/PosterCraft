# PosterCraft

低代码全栈海报编辑器

[👀在线预览](https://poster-craft.leostar.top) |
[📃在线文档](https://poster-craft-docs.vercel.app/)

## 🎯 技术栈

![techStack](/public/screenshot/techStack.jpg)

### 架构

- monorepo
- pnpm

### web端

- [Next.js](https://nextjs.org/)
- [Shacdn/ui](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/)

### server端

- [Nestjs](https://docs.nestjs.com/)
- [Drizzle Orm](https://orm.drizzle.team/)
- [Mysql](https://www.mysql.com/cn/)
- [Redis](https://redis.io/)
- [Jest](https://jestjs.io/)

## 🚀 运行

### 1. 安装依赖

`clone` 仓库后进行 `pnpm i` 安装项目依赖，这里要保证你的node版本在20以上

### 2. 环境配置

首先复制 `./apps/server/.env.example` 改成 `.env` 并更改里面配置，

```bash
mysql://root:root@127.0.0.1:3306/<your-database>
SECRET=<your-secret>
REDIS_URL="redis://127.0.0.1:6379"
```

`<your-secret>` 填一串字符串

这里要确保你的数据库 `<your-database>` 已经创建

接着在根目录运行 `pnpm db:init` 初始化数据库表，按照提示选择 `yes` 即可

### 3. 运行服务

#### Server 端

```bash
pnpm dev:server
```

启动后访问 `localhost:3001` 即可

Swagger地址：`localhost:3001/swagger`

#### Web 端

```bash
pnpm dev:server
```

启动后访问 `localhost:3000` 即可

## 💖 贡献

欢迎大家提 PR/ISSUE 贡献
