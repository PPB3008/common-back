FROM node

EXPOSE 3000

WORKDIR /src

COPY . /public

RUN node ./src/index.js

ENV dev test
