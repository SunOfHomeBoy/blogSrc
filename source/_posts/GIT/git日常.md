---
title: git日常
date: 2018-05-04 11:07:12
tags: git
---
# Git-everyday
## 实例
### 1、Use a tarball as a starting point for a new repository.
使用`tarball`作为新存储库的起点。
```shell
$ tar zxf frotz.tar.gz  # 注释 解压缩
$ cd frotz              # shell 命令
$ git init              # 初始化
$ git add . (1)         # 见 注释 1
$ git commit -m "import of frotz source tree."  # 添加 提交注释
$ git tag v2.43 (2)     # 见 注释 2
```
注解
1. add everything under the current directory. (添加当前目录下所有内容);
2. make a lightweight, unannotated tag.(制作一个轻量级的、不带注释的标记。)

<hr/>

### 2、Create a topic branch and develop.
创建一个主题分支并进行开发。
```shell
$ git checkout -b alsa-audio (1)
$ edit/compile/test
$ git checkout -- curses/ux_audio_oss.c (2)
$ git add curses/ux_audio_alsa.c (3)
$ edit/compile/test
$ git diff HEAD (4)
$ git commit -a -s (5)
$ edit/compile/test
$ git diff HEAD^ (6)
$ git commit -a --amend (7)
$ git checkout master (8)
$ git merge alsa-audio (9)
$ git log --since='3 days ago' (10)
$ git log v2.43.. curses/ (11)
```
注解
1. create a new topic branch.
创建 一个新的 主题分支
2. revert your botched changes in curses/ux_audio_oss.c.
3. you need to tell Git if you added a new file; removal and modification will be caught if you do git commit -a later.
4. to see what changes you are committing.
5. commit everything, as you have tested, with your sign-off.
6. look at all your changes including the previous commit.
7. amend the previous commit, adding all your new changes, using your original message.
8. switch to the master branch.
9. merge a topic branch into your master branch.
10. review commit logs; other forms to limit output can be combined and include -10 (to show up to 10 commits), --until=2005-12-10, etc.

# git使用日常

## 一、拉取项目添加 "用户名：密码"
 git clone http://`lsc:sc123456@`192.168.0.196:3000/jdyx/shrs2006.com.git

 克隆时可以 添加 `用户名：密码@` uri/url

<br>

## 二、["`git commit -m`" 与 "`git commit -am`" 的区别](https://segmentfault.com/q/1010000005900988)

````
git commit -am "str"
# 等同于
git commit -a -m "str"
````
### 拓展
通常我们提交git的时候都是

````
git add .
git commit -m "some str"
git push
````
这三大步，而实际上，你只需要两条命令就够了，除非有新的文件要被添加进去。
````
git commit -am "some str"
git push
````

但是，`git commit -m` 和 `git commit -am`的区别在哪里？在于`a.txt`文件修改之后的处理

下面，向`a.txt`添加内容'a'

文件a.txt处于已跟踪，但未暂存状态。这时，如果使用`git commit -m`是无法提交最新版本的a.txt的，提交的只是最开始空内容的旧版本a.txt

而如果使用`git commit -am`，则可以省略`git add a.txt`这一步，因为`git commit -am`可以提交跟踪过的文件，而`a.txt`一开始已经被跟踪过了

### **总结:**
使用这两个命令区别的`关键`就是`git add`命令

`git add`命令是个多功能命令，根据目标`文件状态`不同，此命令的效果也不同：可以用它`开始跟踪新文件`，或者`把已跟踪的文件放到暂存区`，还能用于`合并时把有冲突的文件标记为已解决状态`等

我们需要用`git add`命令来跟踪新文件，但如果使用`git commit -am`可以省略使用`git add`命令将已跟踪文件放到暂存区的功能

## git查看远程仓库信息
> git remote -v

> git remote show origin

## git切换远程仓库地址
方式一：修改远程仓库地址

> git remote set-url origin URL  // 更换远程仓库地址，URL为新地址。

方式二：先删除远程仓库地址，然后再添加

> git remote rm origin // 删除现有远程仓库 
> git remote add origin url // 添加新远程仓库

## git添加、查看、删除远程仓库地址

# [git命令大全](https://mp.weixin.qq.com/s?__biz=MjM5NTEwMTAwNg==&mid=2650215856&idx=1&sn=24add7911ff2d7c3b83d9f9e654ade82)
## 分支操作
1. git branch：创建分支
2. git branch -b：创建并切换到新建的分支上
3. git checkout：切换分支
4. git branch：查看分支列表
5. git branch -v：查看所有分支的最后一次操作
6. git branch -vv：查看当前分支
7. git brabch -b [分支名] origin/分支名：创建远程分支到本地
8. git branch --merged：查看别的分支和当前分支合并过的分支
9. git branch --no-merged：查看未与当前分支合并的分支
10. git branch -d 分支名：删除本地分支
11. git branch -D 分支名：强行删除分支
12. git branch origin 分支名：删除远处仓库分支
13. git merge 分支名：合并分支到当前分支上

## 暂存操作
1. git stash：暂存当前修改
2. git stash apply：回复最近的一次暂存
3. git stash pop：恢复暂存 并删除暂存记录
4. git stash list：查看暂存列表
5. git stash drop 暂存名(例：stash@{0})：移除某次暂存
6. git stash clear：清除暂存

## 回退操作
1. git reset --hard HEAD^：回退到上一个版本
2. git reset --hard ahdhs1(commit_id)：回退到某个版本
3. git checkout --file：撤销修改的文件(如果文件加入到了暂存区，则回退到暂存区的，如果文件加入到 版本库，则还原至加入版本库之后的状态)
4. git reset HEAD file：撤回暂存区的文件修改到工作区

## 标签操作
1. git tag 标签名：添加标签(默认对当前版本)
2. git tag 标签名 commit_id：对某一提交记录打标签
3. git tag -a 标签名 -m '描述'：创建新标签并增加备注