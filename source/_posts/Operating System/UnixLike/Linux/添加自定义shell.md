---
title: 添加自定义shell
date: 2018-05-04 11:34:46
tags: 自定义shell
archives: shell脚本
categories: shell
---
# 添加自定义github.shell
````
$ echo $PATH  // 打印 路径
$ cd /home/LiSC/bin  // 转到第一个路径
$ mkdir /home/LiSC/bin  // 创建文件夹
$ vim github.shell  // 创建文件[把shell脚本复制粘贴]
$ chmod +x github.shell  // 文件权限属性设置 => 用来变更文件或目录的权限
````

附：shell
````
#!/bin/bash
## Coptyright 2016 The HongJiang Library Authors. All rights reserved.
## Use of this source code is governed by a Apache-style
## license that can be found in the LICNESE file.
##
## Git(Github.com) Common Client Commands.
##
## @authors hjboss <hongjiangproject@gmail.com> 2018-04 $$
## @version 1.0.0
GIT=`/usr/bin/which git`
HOST='git@github.com'
NAME='hlibs'
SCRIPT=`basename $0`

case "$1" in
	"add")
		if [ $# -lt 2 ] || [ "$2" == "*" ]; then
			$GIT add --all
		else
			$GIT add "$2"
		fi
	;;

	"ci")
		if [ $# -lt 2 ]; then
			$GIT commit -a -m "Initial commit"
		else
			$GIT commit -a -m "$2"
		fi
		$GIT push -u origin master
	;;

	"co")
		if [ $# -lt 2 ]; then
			echo "版本庫名稱不能空值"
		elif [ $# -eq 2 ]; then
			$GIT clone "$HOST:$NAME/$2.git"
		else
			$GIT clone "$HOST:$2/$3.git"
		fi
	;;

	"rm")
		if [ $# -lt 2 ]; then
			echo "刪除文件名不能空值"
			exit
		fi
		$GIT rm "$2"
	;;

	"up")
		$GIT pull
	;;

	"st")
		$GIT status
	;;

	"help")
		echo "用法: $SCRIPT <subcommand> [args]"
		echo "版本: 1.0.0"
		echo "最常用的子命令:"
		echo "  add 添加文件内容至索引"
		echo "  ci 记录变更到版本库并且更新至github.com"
		echo "  co 将给定名称的版本库克隆到一个新目录"
		echo "  rm 从工作区和索引中删除文件"
		echo "  up 本地分支更新到最新版本"
		echo "  st 显示工作区状态"
	;;

	"version")
		echo "$SCRIPT version 1.0.0"
	;;

	*)
		echo "使用$SCRIPT help得到用法"
	;;
esac
````

# 自定义NPM脚本
`sbin & bin 区别` root可以访问 `sbin` 下的脚本
> /usr/local/sbin/npm.shell

````
#!/bin/sh
npm --registry=https://registry.npm.taobao.org $*
````
**`$*`**: 属于 process 环境变量