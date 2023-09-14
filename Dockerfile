FROM node:18

WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 4009

CMD [ "node", "main.js" ]