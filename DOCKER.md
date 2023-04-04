# Docker

Docker:

```CMD
> docker images
> docker rmi <image-id>

> docker ps [-a]
> docker rm <container-id>

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

PostgreSQL CLI:

```CMD
> docker exec -it kubernetes_microservices_postgres -- bash
# psql -U postgres -h localhost -p 5432
postgres=# \l
```

Redis CLI:

```CMD
> docker exec -it kubernetes_microservices_redis -- bash
# redis-cli
127.0.0.1:6379> keys *
```

Networks:

```CMD
> docker network ls
> docker network create kubernetes_microservices_network
> docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-name>
```

Removing data:

```CMD
> docker image prune
> docker volume prune
> docker network prune
> docker rm $(docker ps --filter status=exited -q)
```
