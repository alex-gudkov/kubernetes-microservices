# Commands

PostgreSQL CLI in Docker

```TEXT
$ docker exec -it kubernetes_microservices_postgres sh
# psql -U postgres -h localhost
postgres=# \l
```

Redis CLI in Docker

```TEXT
$ docker exec -it kubernetes_microservices_redis sh
# redis-cli
127.0.0.1:6379> keys *
```
