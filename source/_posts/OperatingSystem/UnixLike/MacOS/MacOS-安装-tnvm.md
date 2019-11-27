---
title: MacOS 安装 tnvm
date: 2019-11-13 17:04:29
tags: Mac tnvm nvm node
categories: MacOS
---
## 安装步骤
  [阿里node链接](https://help.aliyun.com/document_detail/60338.html?spm=a2c4g.11174283.3.1.4fb130b1p4p1uu) | 
  [GitHub-tnvm](https://github.com/aliyun-node/tnvm)
  
  wget
  ```bash
  wget -O- https://raw.githubusercontent.com/aliyun-node/tnvm/master/install.sh | bash
  ```

  curl(Mac 已内置)
  ```bash
  bash -c "$(curl -fsSL https://raw.githubusercontent.com/aliyun-node/tnvm/master/install.sh)"
  ```

  PS: 内网环境或者代理环境可在执行上述命令前增加执行, 使用wget获取文件

  ```bash
  export METHOD=script
  ```
  手动 `source rc文件`或重新打开sh,即可启动。

  **Note:** MacOS 需要 执行下面命令
  ```bash
  $> source ~/.tnvm/tnvm.sh
  ```


## HomeBrew

## 制作 MacOS 10.14.6 Mojave cdr/iso  原生镜像 过程
按照 示例教程 配置，基本无修改

0. 通过在 Mac虚拟机中打开 `www.pc6.com/mac/gj_715_1.html` \
  从应用商店下载最新版本的macOS，完成后不要安装，之后打开终端操作即可

1. 创建空的 dmg 镜像文件
```bash
# 创建一个大小为6.5G(根据安装包大小确定)的dmg文件，然后依次为格式参数、文件系统格式
$> hdiutil create -o ~/Desktop/Mojave.cdr -size 6.5g -layout SPUD -fs HFS+J
```

2. 挂载到虚拟磁盘
```bash
# 挂载上面新建的 dmg 镜像到虚拟磁盘，载点为 install_build，之后会使用，需要对应
$> hdiutil attach ~/Desktop/Mojave.cdr.dmg -noverify -mountpoint /Volumes/install_build
```

3. 将下载的系统安装文件写入虚拟磁盘
```bash
# 将所下载的系统安装app文件写入到上面挂载的虚拟光驱磁盘中，即我们第一步建立的空镜像，首先需要输入管理员密码，然后回车，之后等待执行结束，包括擦除磁盘、复制文件、添加启动，结束之后，桌面上之前显示 untitled 的虚拟磁盘会变成我们需要的系统名称
$> sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/install_build --nointeraction
```

4. 取消挂载建立的dmg镜像\
  运行效果：
  提示disk2弹出，对应前面的挂载编号
  右侧虚拟磁盘弹出
```bash
# 取消挂载建立的dmg镜像，方便后续编辑，载点名已经从原来的install_build更改为Install macOS Mojave
$> hdiutil detach "/Volumes/Install macOS Mojave"
```

5. 格式转换
  运行效果：
  按分区读取文件，并写入新镜像文件中
```bash
# 格式转换，将制作好的dmg文件转换为cdr
$> hdiutil convert ~/Desktop/Mojave.cdr.dmg -format UDTO -o ~/Desktop/Mojave.iso
```

6. 重命名镜像文件
```bash
# 重命名 cdr 文件为 iso
# 实际上macos下的光盘镜像cdr格式就相当于Windows下常见的光盘镜像iso格式
$> mv ~/Desktop/Mojave.iso.cdr ~/Desktop/Mojave.iso
```

7. 删除 dmg 镜像文件 (非必要操作)
```bash
# 删除第2步建立的 dmg 镜像
# 可以释放磁盘空间，但是需要保留 dmg 镜像的情况下，不要执行这一条命令
$> rm ~/Desktop/Mojave.cdr.dmg
```

作者：CanonCanon
链接：https://www.jianshu.com/p/24212c95fcc1
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
