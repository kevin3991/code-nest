# 使用 Node.js 作為基礎鏡像
FROM node:18-alpine

# 安裝 pnpm
RUN npm install -g pnpm

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 pnpm-lock.yaml 到工作目錄
COPY package.json pnpm-lock.yaml ./

# 安裝應用程序的依賴
RUN pnpm install

# 複製其餘的應用程序代碼
COPY . .

# Copy the .env and .env.development files
COPY .env ./

# 暴露應用程序埠
EXPOSE 3000

# 編譯 NestJS 應用程序
# RUN pnpm run build

# 運行應用程序
# CMD ["pnpm", "run", "start"]
