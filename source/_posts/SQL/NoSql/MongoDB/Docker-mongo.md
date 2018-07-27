---
title: Docker-mongo
date: 2018-07-26 15:24:19
tags: Docker-mongo
categories: Docker-mongo
---
## Docker下的mongo操作
DockerShell访问和查看MongoDB日志
docker exec命令允许您在docker容器中运行命令。下面的命令行将在mongo容器中为您提供一个bash shell:
> docker ps // 查看`docker进程管理器`获得进程`NAMES`
> $ docker exec -it [some-mongo] bash

The MongoDB Server log is available through Docker's container log:
> $ docker logs [some-mongo]
---
[原文连接](https://hub.docker.com/_/mongo/)
