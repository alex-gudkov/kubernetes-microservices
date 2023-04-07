FROM node:18.15.0

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

# install dependencies
RUN npm ci --legacy-peer-deps

COPY . .

# make the entrypoint script executable
RUN chmod +x ./scripts/entrypoint.sh

# set the entrypoint script as the entry point for the container
ENTRYPOINT [ "/app/scripts/entrypoint.sh" ]
