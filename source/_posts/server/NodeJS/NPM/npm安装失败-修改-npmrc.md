---
title: 修改.npmrc
date: 2018-08-14 14:11:24
tags: .npmrc
categories: npm
---
## Windows修改.npmrc
> vim /mnt/c/Users/Administrator/.npmrc

## [node-sass 安装失败解决](https://segmentfault.com/a/1190000010984731)

@4.8.3 postinstall: `node scripts/build.js`
### 解决方法一：创建.npmrc文件
在项目根目录创建.npmrc文件，复制下面代码到该文件。
````
phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
registry=https://registry.npm.taobao.org
````

### 解决方法二：使用淘宝镜像源
> npm uninstall node-sass // 如果出现安装失败，**须先卸载**  

> npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ // 亲测有效

````
// 也可以设置系统环境变量的方式。示例
// linux、mac 下
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

// window 下
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ && npm install node-sass
````

### 设置全局淘宝镜像
> npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

## 

