# Docker

Basics:

```CMD
> docker images
> docker rmi <image-id>

> docker ps [-a]
> docker rm <container-id>

> docker network ls
> docker network rm

> docker build ./ [--file <file-name>] [--tag <image-name>]
> docker run <image-id>
```

Docker Compose:

```CMD
> docker-compose up
> docker-compose down
> docker-compose build
> docker-compose [--file <file-name>] up [--build] [--detach]
```

Connect to PostgreSQL CLI:

```CMD
> docker exec -it kubernetes_microservices_postgres sh
# psql -U postgres
postgres=# \l
```

Connect to Redis CLI:

```CMD
> docker exec -it kubernetes_microservices_redis sh
# redis-cli
127.0.0.1:6379> keys *
```

Networks:

```CMD
> docker network ls
> docker network create kubernetes_microservices_network
> docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-name>
```

Removing all data:

```CMD
> docker image prune
> docker volume prune
> docker network prune
> docker container prune
```
