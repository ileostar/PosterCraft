# 使用Node.js官方镜像作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制monorepo根目录的package.json和pnpm-lock.yaml
COPY ../../package.json ../../pnpm-lock.yaml ./

# 复制apps/web目录的package.json
COPY package.json ./

# 安装pnpm
RUN npm install -g pnpm

# 安装monorepo根目录的依赖
RUN pnpm install --frozen-lockfile

# 复制monorepo根目录的pnpm-workspace.yaml
COPY ../../pnpm-workspace.yaml ./

# 复制apps/web目录的源代码
COPY . .

# 构建应用
RUN pnpm run build

# 暴露端口
EXPOSE 3000

# 运行应用
CMD ["pnpm", "run", "start"]
