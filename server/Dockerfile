FROM node:21.4.0-alpine3.18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
