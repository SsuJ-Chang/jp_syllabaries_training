# 使用官方 Python 3.12 基礎映像
FROM python:3.12

# 設定工作目錄
WORKDIR /app

# 複製 requirements.txt 並安裝 Python 依賴
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 複製當前目錄中的所有內容到容器中
COPY . /app

# 暴露 FastAPI 運行的端口
EXPOSE 8000

# 設定啟動命令
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
