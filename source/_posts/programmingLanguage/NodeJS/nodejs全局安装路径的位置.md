---
title: nodejs全局安装路径的位置
date: 2018-05-08 11:17:12
tags: Node全局路径
archives: Node
categories: Node
---
一般nodejs安装在默认的C盘，如果不知道安装在哪里，可以打开控制面板-系统和安全-系统-高级配置中找到

![变量路径](https://images2017.cnblogs.com/blog/1275872/201712/1275872-20171206153014909-1350443214.png)


所谓全局安装：

是指安装在`node`中`node_module`的根目录里，可以在电脑的任何位置调用这个方法。

那么，如何在找到全局安装的位置呢？


## <font color=#f00>方法一：</font>

设置到自己想要放的位置：

<font color=#f90 style='font-size:18px'>
打开：nodejs安装目录/node_modules/npm/.npmrc这个文件，修改里面的路径

prefix = E:\nodejs\npm_global_modules
</font>

## <font color=#f00>方法二：</font>
使用快捷键 `win+R` ,输入cmd打开命令窗口，输入如下代码：

````
> npm config ls
````

![npm配置](https://images2017.cnblogs.com/blog/1275872/201712/1275872-20171206153727331-2045072377.png)

<b style='font-size:18px'>
其中：prefix=C:\Users\Administrator\AppData\Roaming\npm就是我们全局安装了哪些方法的地方，如图：</b>

![安装路径](https://images2017.cnblogs.com/blog/1275872/201712/1275872-20171206153926816-474788164.png)

这时可以通过命令来更改路径

````
npm config set prefix E:\
````

-----------------------------

[阅读原文](https://www.cnblogs.com/niuxiaoling/p/7993032.html)