---
title: git日常
date: 2018-05-04 11:07:12
tags:
---
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

文件a.txt处于已跟踪，但未暂存状态。这时，如果使用`git commit -m`是无法提交最新版本的a.txt的，提交的只是最开始空内容的旧版本a.txt

而如果使用`git commit -am`，则可以省略`git add a.txt`这一步，因为`git commit -am`可以提交跟踪过的文件，而`a.txt`一开始已经被跟踪过了

### **总结:**
使用这两个命令区别的`关键`就是`git add`命令

`git add`命令是个多功能命令，根据目标`文件状态`不同，此命令的效果也不同：可以用它`开始跟踪新文件`，或者`把已跟踪的文件放到暂存区`，还能用于`合并时把有冲突的文件标记为已解决状态`等

我们需要用`git add`命令来跟踪新文件，但如果使用`git commit -am`可以省略使用`git add`命令将已跟踪文件放到暂存区的功能