FROM node:18.15.0

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN chmod +x ./scripts/entrypoint.sh

ENTRYPOINT [ "/app/scripts/entrypoint.sh" ]
