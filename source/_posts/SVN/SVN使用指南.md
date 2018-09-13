---
title: SVN使用指南
date: 2018-09-12 11:20:12
tags: SVN使用
categories: SVN
---
## 几个概念要必须掌握：
`checkout`--->将SVN仓库的代码烤到本地，比如你现在参与一个团队项目，项目代码在你之前肯定已经写了很多了，你可以通过checkout项目代码，获得整个项目。

`update`--->在你写代码的过程中，同事很可能已经提交过代码到SVN服务器，而你本地项目显然没有同事新提交的代码，你可以通过update SVN获得SVN最新的代码。

`commit`--->当你完成一部分开发后，你可以通过commit提交代码到SVN服务器，这样别人就可以获得你写的代码，记得 **先update再commit**。

## TortoiseSVN图标介绍
+ 绿色对勾重载，表示Svn状态正常
+ 红色感叹号，表示文件状态状态变成 已修改
+ 黄色感叹号，表示提交过程出现冲突 
+ 蓝色加号，表示 一个 文件/目录 已经被加入到 版本控制中

## SVN Client 基础操作
1. SVN检出(Checkout)\
    输入 url ， 确定本地 代码库 地址

弹出`用户名` `密码验证`

### Add 增加
1. 先提交到变更列表，再 `commit` 到配置库：选择`新增文件`，右键SVN菜单执行`Add`， 提交到`变更列表`，然后右键SVN菜单执行`SVN Commit`提交到版本库

2. 不提交到变更列表，直接commit配置库：直接选择文件，右键SVN菜单执行`SVN Commit`操作。

### Delete 删除
如果被删文件 未入版本库，可直接使用操作系统删除

如果被删文件 已入版本库：
1. 选择被删文件， 右键 SVN菜单 执行`delete`操作
2. 选择被删文件父级目录， 右键 SVN菜单 执行`SVN Commit`

### Rename 改名


### SVN Revert 还原
右键SVN菜单 `Update to reversion`
