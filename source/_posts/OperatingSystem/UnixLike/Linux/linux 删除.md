---
title: Linux 删除文件夹和文件的命令
date: 2018-04-28 16:32:00
tags: Linux 删除命令
archives: 删除命令
categories: Linux
---
# Linux 删除文件夹和文件的命令
+ -r 就是向下递归，不管有多少级目录，一并删除
+ -f 就是直接强行删除，不作任何提示的意思

## 删除文件夹实例：
    rm -rf /var/log/httpd/access

将会删除`/var/log/httpd/access`目录以及其下所有文件、文件夹

## 删除文件使用实例：

    rm -f /var/log/httpd/access.log

将会强制删除`/var/log/httpd/access.log`这个文件