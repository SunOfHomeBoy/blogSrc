---
title: AliCloud-SSL证书认证
date: 2018-08-08 11:18:53
tags: SSL认证
categories: SSL
---
## 阿里云-SSL证书认证
保证在规定域名下可以访问到`证书编号`
![](../../assets/img/AliCloud-SSL证书认证.jpg)

### 配置Nginx
首先因为 `Nginx反向代理` 问题，需要配置目录文件
+ SSH登录 生产服务器 `jdyxqq.com root` psd:**** 5*
+ 找到Nginx服务配置
  > find / -name nginx
  ````
  /usr/local/sbin/nginx  # 程序文件
  /usr/local/etc/rc.d/nginx  # 后台程序 管理重启、开机启动
  /usr/local/etc/nginx  # 系统配置项
  /usr/ports/www/nginx  # Nginx文档
  /mnt/www/etc/nginx  # 分配置文件(要修改的路径)
  /var/tmp/nginx  # 临时、缓存文件
  /var/log/nginx  # 临时、缓存文件
  ````
+ 进入`/mnt/www/etc/nginx`修改添加
  ````
  vim jing*.conf

  # 添加代理
  location /.well-known {
    alias /mnt/www/jing*/html/.well-know; # 分号很重要
  }
  ````

### 进入配置路径并添加文件
+ mkdir -p /mnt/www/jing*/html/.well-know/pki-validation  # 创建目录路径
+ vim fileauth.txt  # 创建目标文件 并把 认证码 键入

### 保证访问路径可以访问认证码
http://jdyxqq.com/.well-known/pki-validation/fileauth.txt

## p.s 一般代理路径下都有 空的 index.html 防止获取 路径下文件 [内容保护]
