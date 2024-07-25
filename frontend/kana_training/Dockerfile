# 使用 Node 的官方映像
FROM node:14

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 並安裝依賴
COPY package*.json ./

RUN npm install

# 複製應用的所有文件
COPY . .

# 編譯應用
RUN npm run build

# 暴露應用運行的端口
EXPOSE 3000

# 設定啟動命令
CMD ["npm", "start"]
