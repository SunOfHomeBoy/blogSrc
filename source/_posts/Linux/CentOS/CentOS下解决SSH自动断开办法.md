---
title: CentOS下解决SSH自动断开办法
date: 2018-08-08 15:03:51
tags: 解决SSH自动断开
categories: SSH
---
## [CentOS解决SSH自动断开](https://blog.csdn.net/moliyiran/article/details/54809090)
````
echo "ClientAliveInterval 60" >> /etc/ssh/sshd_config
echo "ClientAliveCountMax 1" >> /etc/ssh/sshd_config
````
重启SSH服务

> service sshd restart

