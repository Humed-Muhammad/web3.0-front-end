FROM node:16-buster

RUN apt-get update

RUN apt-get install -y build-essential

WORKDIR /app
ADD package.json yarn.lock /app/
COPY . /app/

RUN yarn

ENV PORT=3002
EXPOSE ${PORT}

RUN yarn run build

CMD yarn run serve

