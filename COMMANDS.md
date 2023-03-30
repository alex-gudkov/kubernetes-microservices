# Commands

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
