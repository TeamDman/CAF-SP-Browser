FROM node:lts-alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm i

COPY --chown=node:node . /app

EXPOSE 4000
CMD ["node","index.js"]
