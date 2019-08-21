---
title: Nginx配置
date: 2018-08-10 10:00:45
tags: 
categories: 
---
## find / -name nginx*
> vim /etc/*/nginx.conf
> include /etc/nginx/conf.d/*.conf; // 分配置文件目录 绑定域名

## Tsxt服务器 Nginx 分配置目录
> /etc/nginx/conf.d >> *.conf


## jdyxqq.com 自定义 Nginx主配置目录
> /mnt/www/etc/nginx

## mv 修改拓展名

## 注意端口有没有被占用

## 重启服务器 或者 关闭占用端口进程

## 每次修改分配置文件都要重启Nginx
> service nginx restart

## 
