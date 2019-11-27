---
title: 解决SSH登录自动断开
date: 2018-08-08 15:03:51
tags: 心跳检测
categories: SSH
---
## [CentOS解决SSH自动断开](https://blog.csdn.net/moliyiran/article/details/54809090)
````
echo "ClientAliveInterval 60" >> /etc/ssh/sshd_config
echo "ClientAliveCountMax 1" >> /etc/ssh/sshd_config
````
重启SSH服务

> service sshd restart


## [Ubuntu解决SSH自动断线](https://www.jianshu.com/p/f8d9f28b830e)


**1、依赖ssh客户端定时发送心跳检测**
> vim /etc/ssh_config
````
// 末尾添加

ServerAliveInterval 20

ServerAliveCountMax 999
````
每隔20秒向服务器发出一次心跳检测，若超过999次请求都没有成功，就主动断开与服务器端的连接。

**2、依赖ssh服务器端定时发送心跳检测**
> vim /etc/sshd_config // 注意两文件不同
````
// 末尾添加

ClientAliveInterval 30

ClientAliveCountMax 6
````
每隔30秒向客户端发出一次心跳检测，若超过6次请求都没有成功，就会主动断开与客户端的连接。

**3、设置ssh心跳检测后，重启ssh服务生效**
> service ssh restart

