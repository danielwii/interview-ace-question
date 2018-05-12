FROM node:10

ARG REGISTRY=https://registry.yarnpkg.com

COPY package.json /app/
WORKDIR /app

RUN yarn config set registry $REGISTRY && yarn

ADD . /app

RUN yarn build

EXPOSE 3000

CMD yarn start
