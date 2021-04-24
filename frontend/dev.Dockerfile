# Builder
FROM node:14-alpine AS builder

WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY package.json /frontend
COPY yarn.lock /frontend
RUN yarn install
