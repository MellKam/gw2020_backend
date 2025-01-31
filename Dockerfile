# Development and testing
FROM node:16.14.2-alpine3.15

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE ${CONTAINER_APP_PORT}
