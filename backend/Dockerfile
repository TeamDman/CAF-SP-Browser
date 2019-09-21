FROM node:lts-alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm i

COPY . /app
EXPOSE 80

CMD ['node','/app/index.js']