---
title: Ubuntu 安装 mySQL
date: 2019-01-31 18:41:31
tags:
categories:
---

教程：https://blog.csdn.net/weixx3/article/details/80782479

---

> GRANT ALL PRIVILEGES ON *.* TO root@localhost IDENTIFIED BY "123456";

> GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "123456"; // 允许 root 远程连接
---

重启 服务
> service '服务名' restart