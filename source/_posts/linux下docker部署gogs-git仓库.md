---
title: linux下docker部署gogs git仓库
date: 2018-05-04 09:50:00
tags: gogs docker
archives: git仓库
categories: git
---
# linux下docker部署gogs git仓库

## 1. 远程登录Linux服务器
首先，linux 命令行使用 root ssh ([ssh远程登录命令简单实例](https://blog.csdn.net/ccfxue/article/details/52608829))

ssh root@192.168.0.xxx

## 2. 拉取docker下gogs
进入[gogs官网](https://hub.docker.com/r/gogs/gogs/)，在官网左侧找到 拉取命令

命令行输入 拉取命令 `docker pull gogs/gogs`

拉取完成后 有提示，接着输入查看状态的`docker`命令 `docker ps`

"`docker ps`": 属于Linux命令 是查看 `docker`状态的命令

"`ls`": 查看当前目录文件

## 3. 配置
"`vim gogs.docker`": 进入并编辑 gogs.docker 配置文件

## 4. 运行
"`chmod +x gogs.docker`": 

"`echo $PATH`": 打印 环境变量

"`./gogs.docker`"：启动服务

## 5. 重启服务
`docker ps`获取`CONTAINER ID`

`docker restart [19d724ea6ec9(ID)]`



