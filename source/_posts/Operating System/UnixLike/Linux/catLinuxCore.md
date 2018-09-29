---
title: 查看Linux发行版核心
date: 2018-09-13 16:56:11
tags: catLinuxCore
categories: UnixLike
---
## Ubuntu查看系统版本-Linux内核版本

````
sudo lsb_release -a

cat /etc/os-release

cat /etc/redhat-release

rpm -q centos-release

uname -a

cat /proc/version
````

---

[转自CSDN](https://blog.csdn.net/haohaibo031113/article/details/70880864)

[ubuntu 16.04 安装nginx](https://www.baidu.com/s?wd=ubuntu%2016.04%20%E5%AE%89%E8%A3%85nginx&rsv_spt=1&rsv_iqid=0xe793a65000001553&issp=1&f=3&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=98012088_4_dg&ch=1&rsv_enter=1&oq=linux%25E6%259F%25A5%25E7%259C%258Bubuntu%25E7%2589%2588%25E6%259C%25AC&rsv_t=34e0PL5TYi1wHhbecCDMqieWCC0vKelIGuYW2od1EexG3UzWpfxhsOZUSlHq896i5PxNjA&inputT=11285&rsv_pq=bb5b65e700002916&rsv_sug3=46&rsv_sug1=44&rsv_sug7=101&rsv_sug2=0&prefixsug=ubuntu%252016.04%2520%25E5%25AE%2589%25E8%25A3%2585&rsp=3&rsv_sug4=11985)

````
> apt-get update // 升级集成软件包信息
> apt-get upgrade // 升级 已经安装好的本级软件
````
