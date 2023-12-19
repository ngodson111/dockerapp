FROM node:16 AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4040

CMD ["npm", "start"]