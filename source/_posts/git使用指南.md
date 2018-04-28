---
title: git使用指南
date: 2018-04-28 10:18:52
tags: git
archives: 版本控制
categories: git
---
# git使用123

## 第一步(安装/全局配置)
**安装**
+ 百度 git 然后下载安装

**配置**(一次性配置,以后使用不用再管)设置`username`和`email`，因为github每次`commit`都会记录他们

+ $ git config --global user.name "自定义名字" (注册时填写的名字)
+ $ git config --global user.email "email@地址.com"(注册的地址)

**检验配置是否成功**
+ 使用 `git config -l` 查看里面的 `user.name` 和 `email` 的值

**查看git版本**
+ git --version

**创建公钥**
  + 第一步 : 创建 `ssh-keygen -t rsa -C '[email地址]'`
  + 第二步 : 查看公钥 根据git命令行提示走 然后 打开路径下的`id_rsa.pub`
    - 进入c盘的`C:\Users\标准用户\.ssh`（一般都是在这个文加下）生成了两个文件，用记事本打开`id_rsa.pub`，全选然后复制。
  + 第三步 : 登录 github 设置公钥
    - 进入github官网，选择`setting` -> `ssh and GPG keys` -> `new ssh key` 然后title随便写一个，在下面面的内容处粘贴刚复制的内容。
  + 选择则保存，然后进入git客户端输入：`ssh -T git@github.com`
  + 如果`ssh key`配置成功的话，会看到以下效果
    - $ ssh -T git@github.com
    - Hi SunOfHomeBoy! You've successfully authenticated, but GitHub does not provide shell access.
    - 您已经成功地进行了身份验证，但是GitHub不提供shell访问。

## 第二步(初始化项目/本地配置)
**git初始化**
  + 在项目目录下 输入 "git init"

**git简单命令**
  + "ls -a" 查看项目目录

  + "git status" 查看git状态 // 重要

  + "git add <文件名>" 向git仓库提交一个文件 // 重要
  
  + "$ git add ." #把前目录下的所有文件全部添加到暂存区
  
  + "git rm --cached <文件名>" 从git中移除文件
  
  + "git log" 查看日志

## 第三步(开始建立远程仓库连接)
+ `git remote add origin git@github.com:yourName/yourRepo.git`

  `yourName`和`yourRepo`表示你在`github的用户名`和`新建仓库`，加完之后进入.git

  git remote add origin git@github.com:SunOfHomeBoy/SunOfHomeBoy.github.io.git

  $ git push
  fatal: The current branch dev has no upstream branch.
  To push the current branch and set the remote as upstream, use

    `git push --set-upstream origin dev`

## 第四步(工作区与暂存区[版本库])
+ 在git add 提交文件后 使用 "git commit -m '一句话描述'" 命令

+ "git push origin master" 推送到远程服务器

+ "git pull origin master" 从远程服务器拉取到本地

+ "git checkout -- <文件名>"  放弃更改

+ "git reset ‘git log 打印出来的 commit 后面的字符串’ --hard"  //回退到某个版本

## 第五步(版本库管理)
**git 删除本地分支**
+ git branch -D br

**git 删除远程分支**
+ git push origin :br  (origin 后面有空格)
+ git push origin 【空格】【冒号】【你的分支名字】

**git代码库回滚** (指将代码库某分支退回到以前的某个"commit id")
本地代码库回滚
+ git reset --hard commit-id :回滚到commit-id，将commit-id之后提交的commit都去除
+ git reset --hard HEAD~3：将最近3次的提交回滚



## 附：
**Git 常用命令大全**
(http://blog.csdn.net/dengsilinming/article/details/8000622)

**如何使用git上传代码到github**
(https://jingyan.baidu.com/article/e5c39bf5c8c4d039d76033b2.html)

常用命令,仅供参考。

## 单位，win10电脑
  2017年12月29日 09:15:05
  Ubuntu SSH:

  $ ssh-keygen -t rsa -C '903317164@qq.com'

Generating public/private rsa key pair.

Enter file in which to save the key (/home/LiSC/.ssh/id_rsa):
Created directory '/home/LiSC/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/LiSC/.ssh/id_rsa.
Your public key has been saved in /home/LiSC/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:SIyNEhF5sQX8YgjxEFjPBQnCFexfrL9fYLPX+L05QO0 903317164@qq.com
The key's randomart image is:
+---[RSA 2048]----+
|B+OO==o          |
|o=.=+O           |
| .+o*.=       .  |
|  .oo..+     . . |
|   ...+ S+  . .  |
|     o  . + o. E |
|      .  . + ..  |
|       .  o . ...|
|       .o.   . +o|
+----[SHA256]-----+
-----------------------------------------------
~$ ssh-keygen -t rsa - c '903317164@qq.com
生成公共/私有的rsa密钥对。
输入保存密钥的文件(/ home/LiSC/.ssh/id_rsa):
创建目录/ home / LiSC / . ssh。
输入passphrase(没有密码):
再次输入相同的密码:
您的身份已经保存在/ home/ lisc/. ssh/id_rsa。

您的公钥已保存在/ home/ lisc/.ssh/id_rsa.pub中。

指纹的关键是:
SHA256:SIyNEhF5sQX8YgjxEFjPBQnCFexfrL9fYLPX + L05QO0 903317164 @qq.com

关键的随机图像是:
+ - - - - - -[RSA 2048]- - - - - +
| | B + OO = = o
| o =。= + O |
| + o *。=。|
|。