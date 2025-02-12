# Sử dụng Node.js 18
FROM node:18

# Cài đặt LibreOffice
RUN apt-get update && apt-get install -y libreoffice

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy toàn bộ project vào container
COPY . .

# Cài đặt dependencies
RUN yarn install

# Expose port
EXPOSE 5000

# Chạy server
CMD ["node", "index.js"]
