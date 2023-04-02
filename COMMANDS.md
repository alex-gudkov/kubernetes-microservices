# Commands

Docker:

```TEXT
$ docker images
$ docker rmi <image-id>

$ docker ps
$ docker rm <container-id>

$ docker build ./ --file <file-name> --tag <image-name>
$ docker run <image-id>
```

Docker Compose:

```TEXT
$ docker-compose up
$ docker-compose --file ./docker-compose.dev.yml up
$ docker-compose build
$ docker-compose up --build
$ docker-compose up --detach --build
```

PostgreSQL CLI in Docker

```TEXT
$ docker exec -it kubernetes_microservices_postgres sh
# psql -U postgres -h localhost -p 5432
postgres=# \l
```

Redis CLI in Docker

```TEXT
$ docker exec -it kubernetes_microservices_redis sh
# redis-cli
127.0.0.1:6379> keys *
```

Stop local PostgreSQL server:

```TEXT
$ net stop postgresql-x64-15
```

Docker networks:

```TEXT
$ docker network ls
$ docker network create kubernetes_microservices_network
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-name>
```

Removing Docker data:

```TEXT
docker image prune
docker volume prune
docker network prune
docker rm $(docker ps --filter status=exited -q)
```
