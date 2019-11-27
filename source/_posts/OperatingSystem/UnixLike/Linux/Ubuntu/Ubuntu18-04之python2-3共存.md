---
title: Ubuntu18.04之python2/3共存
date: 2019-11-07 15:25:22
tags: python2 python3 pip
categories: Ubuntu python
---
## [`转`][玩转ubuntu18.04之python2、3共存与pip安装、更换国内镜像源](https://blog.csdn.net/kan2016/article/details/81639292)
P.S: 个人电脑建议使用 sudo su 进行
+ 1.安装python/pip

```bash
$> sudo apt install python       # 安装python2，因为系统已经安装了python3

$> sudo apt install python-pip   # 指定python2的pip,使用为pip

$> sudo apt install python3-pip  # 指定为python3的pip，使用为pip3
```
**Node:** 安装完成 并查看版本
```bash
$> python --version     # 默认为 python2
$> python2 --version    # python2
$> python3 --version    # python3
```

+ 2.替换pip为国内源
```bash  
# 创建pip.config文件
$> mkdir  ~/.pip

# 打开pip.conf
$> vim  ~/.pip/pip.conf

# 输入：’i’ 或者按insert键，进入编辑模式
# 粘贴以下内容：
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host=mirrors.aliyun.com

# 按Esc键，输入 ‘:wq’    回车,就保存退出了。
```

