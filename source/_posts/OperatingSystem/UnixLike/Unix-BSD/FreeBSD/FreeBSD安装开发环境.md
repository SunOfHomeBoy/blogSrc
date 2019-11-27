---
title: FreeBSD部署开发环境
date: 2018-08-13 09:47:40
tags: BSD部署
categories: FreeBSD
---
## pkg安装bash
> pkg install bash
BSD 使用方便，简洁。安装依赖更容易。

## FreeBSD `df` 
查看 系统硬盘
> cd /mnt/www
> 

> vim /usr/local/etc/mongodb.conf // 修改mongodb配置文件
> /mnt/www/STORAGE/MONGO // 自定义 data 目录
> /var/db/mongodb // 默认 data 目录
> ls -ld /var/db/mongodb // -l 详细信息 -d 目录本身，如不加d，显示第一层文件 -r 递归显示
> chmod 
> /usr/local/etc/rc.d // 服务的 配置文件 目录

> service mongod onestart
> rmdir // 删除无效空文件夹，非空有提示 删除错误

**项目目录规范**
前端页面叫 `www`
后台管理 `administrator`
接口服务 `service`
后台上传公共资源 `public`
接口 log日志 `/tmp/xxx/`

p.s :
修改配置文件，须先stop服务
如无法stop(新配置文件，无法关闭之前的配置)，可用`kill -KILL [进程ID]`


npm 淘宝镜像
+ --registry=https://registry.npm.taobao.org


## [linux修改文件所有者和文件所在组](https://www.cnblogs.com/DawaTech/p/7249734.html)
> chown 用户名:组 文件名  -R // -R表示递归目录下所有文件  
> chown [-R] 账号名称:组群  文件/目录  
> ega: chown mongodb:mongodb 文件名
