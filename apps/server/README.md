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
DATABASE_URL="mysql://root:<your-database-password>@127.0.0.1:3306/poster_craft"
JWT_SECRET=<your-jwt-secret>

# Redis
REDIS_URL="redis://127.0.0.1:6379"
REDIS_PASSWORD=<your-redis-password>

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

`DATABASE_URL` 填上你的mysql数据库密码 `<your-database-password>`，

这里要确保你的数据库 `poster_craft` 已经创建

填上你的 `Redis` 信息，`REDIS_PASSWORD`没有可以不填

SMS短信服务，去阿里云 [开通SMS](https://dysms.console.aliyun.com/overview)

[Google Oauth2凭证获取](https://console.cloud.google.com/apis/credentials)

[Github Oauth2凭证获取](https://github.com/settings/developers)

[开通OSS](https://oss.console.aliyun.com/overview)

[开通Mail](https://mail.163.com/js6/main.jsp)
