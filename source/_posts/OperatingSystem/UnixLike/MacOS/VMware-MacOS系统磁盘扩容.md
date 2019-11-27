---
title: VMware-MacOS系统磁盘扩容
date: 2019-11-15 10:24:59
tags: diskutil 拓容
categories: MacOS
---
## 背景介绍
使用VMware虚拟机搭建的MacOSX，安装xcode时出现磁盘空间不足的错误。

因为很多朋友在初次安装MacOSX的时候都默认选择40G的磁盘大小，结果用了没两天之后就发现磁盘不够用了。

这时，百度一下你会找到很多相关文章，大体上是正确的，但针对于OS10.10以上的版本就有可能会出现 PCI 外置磁盘大小通过 磁盘工具 无法扩展的问题。

呈现出来的效果，是可以在磁盘工具中看到对应的磁盘已经扩展到目标大小，但是不能进行分区，其中唯一一个MacOSX分区也不能进行抹掉和扩展操作，原因很简单，这是MacOSX的系统盘，所以你不能在系统运行的时候进行操作。而VMware又无法进入MacOSX的恢复分区，所以你只能干瞪眼。

折腾N久后，偶然间发现MacOSX有一个diskutil命令（在终端里面使用）。而diskutil有一个resizeVolume命令。好吧，你已经猜到我是怎么做了的。

### 步骤
0. VMWare 虚拟机磁盘拓容

1. 打开终端，输入
    ```bash
    $> diskutil list
    ```

2. 从显示的列表中找到你需要扩展的分区。disk0磁盘总共有xxxG，但系统分区为42.1GB。(分区的ID一般为diskXsX，我的ID是disk0s2);


3. 然后输入 
    ```bash
    $> diskutil resizeVolume disk0s2 100GB
    ```
    其中`disk0s2`为对应分区的ID，`100GB`为目标大小（这里的目标大小不能超过这个磁盘的总额）；回车，等待完成就可以使用了。

4. apfs格式
```bash
$> diskutil apfs resizeContainer disk0s2 106GB
```

---
[参考1](https://blog.csdn.net/woshiwoxinheqiu/article/details/60332849)
[参考2](https://www.jianshu.com/p/21d33bd99965)

作者：李牧敲代码
链接：https://www.jianshu.com/p/21d33bd99965
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。