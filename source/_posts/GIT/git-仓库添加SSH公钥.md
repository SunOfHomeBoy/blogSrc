---
title: git 仓库添加SSH公钥
date: 2018-09-27 10:06:10
tags: Git-SSH
categories: Git
---
# Git仓库添加SSH公钥
## 第一步 生成SSH key
> ssh-keygen -t rsa -C "xxxxx@xxxxx.com"  

## 第二步 查看公钥
> cat ~/.ssh/id_rsa.pub
复制生成的公钥，到 远程仓库-设置 里添加ssh

## 第三步 终端检测
添加公钥后 用下面命令检测，首次使用需要添加主机到本机SSH信任列表
> ssh -T git@gitee.com
