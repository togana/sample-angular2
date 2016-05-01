FROM node:6.0.0-slim

WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install && npm cache clean

COPY . /usr/src/app
CMD ["npm", "start"]
