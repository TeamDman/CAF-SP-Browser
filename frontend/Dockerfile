FROM node:lts-alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm i

COPY --chown=node:node . /app

EXPOSE 8080
CMD ["npm", "run", "serve"]