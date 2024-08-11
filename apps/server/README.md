<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## 描述

PosterCraft 海报编辑器服务端

## 安装

```bash
$ pnpm install
```

## 运行

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 测试

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 环境变量配置

```bash
# Mysql
DATABASE_URL="mysql://<your-database-name>:<your-database-password>@127.0.0.1:3306/poster_craft"
JWT_SECRET=<your-jwt-secret>

# Redis
REDIS_URL="redis://127.0.0.1:6379"

# SMS短信服务
ALIBABA_CLOUD_ACCESS_KEY_ID=<your-SMS-signName>
ALIBABA_CLOUD_ACCESS_KEY_SECRET=<your-SMS-signName>
SignName=<your-SMS-signName>
TemplateCode=<your-SMS-TemplateCode>

# Google Oauth2
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_REDIRECT_URI=<your-google-redirect-uri>

# Github Oauth2
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
GITHUB_REDIRECT_URI=<your-github-redirect-uri>

# OSS
OSS_ACCESS_KEY_ID=<your_access_key_id>
OSS_ACCESS_KEY_SECRET=<your_access_key_secret>
OSS_REGION=<your_region>
OSS_BUCKET=<your_bucket_name>

# Mail
EMAIL_HOST=<your-email-host>
EMAIL_PORT=<your-email-port>
EMAIL_ID=<your-email-id>
EMAIL_PASS=<your-email-pass>

```

`<your-secret>` 填一串字符串

这里要确保你的数据库 `<your-database>` 已经创建
