---
title: linux下docker部署gogs git仓库
date: 2018-05-04 09:50:00
tags: gogs docker
archives: git仓库
categories: git
---
# linux下docker部署gogs git仓库

## 1. 远程登录Linux服务器
首先，linux 命令行使用 root ssh ( [ssh远程登录命令简单实例](https://blog.csdn.net/ccfxue/article/details/52608829) )

例如: [公司内网服务器]
````
ssh root@192.168.0.196

psd: Jdyx[5个8]
````

## 2. 拉取docker下gogs
进入[gogs官网](https://hub.docker.com/r/gogs/gogs/)，在官网左侧找到 拉取命令

命令行输入 拉取命令 `docker pull gogs/gogs`

拉取完成后 有提示，接着输入查看状态的`docker`命令 `docker ps`

"`docker ps`": 属于Linux命令 是查看 `docker`状态的命令

"`ls`": 查看当前目录文件

## 3. 配置
"`vim gogs.docker`": 进入并编辑 gogs.docker 配置文件

[gogs-git官网 配置](https://github.com/gogits/gogs/tree/master/docker)

````
# Pull image from Docker Hub.
$ docker pull gogs/gogs

# Create local directory for volume.
$ mkdir -p /var/gogs

# Use `docker run` for the first time.
$ docker run --name=gogs -p 10022:22 -p 10080:3000 -v /var/gogs:/data gogs/gogs

# Use `docker start` if you have stopped it.
$ docker start gogs
````

配置文件：
````
#!/bin/bash
docker run --restart=always --name=gogs -p 3000:3000 -v /var/gogs:/data gogs/gogs
````


## 4. 运行
"`chmod +x gogs.docker`": 

"`echo $PATH`": 打印 环境变量

"`./gogs.docker`"：启动服务

## 5. 重启服务
`docker ps`获取`CONTAINER ID`

`docker restart [19d724ea6ec9(ID)]`



