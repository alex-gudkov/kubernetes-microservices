FROM node:18.15.0

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD [ "npm", "run", "start:dev" ]
