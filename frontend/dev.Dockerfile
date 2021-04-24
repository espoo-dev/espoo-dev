# Builder
FROM node:14-alpine AS builder

# RUN yarn install

# RUN echo -e "yarn dev" > /start.sh
# RUN chmod +x /start.sh

# WORKDIR /frontend

# EXPOSE 3000

# ENTRYPOINT /start.sh

WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY package.json /frontend
COPY yarn.lock /frontend
RUN yarn install