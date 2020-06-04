FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add python make g++

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
