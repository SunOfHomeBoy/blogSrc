---
title: npm 上传包
date: 2018-05-08 10:53:07
tags: npm 上传包
archives: npm 
categories: NPM
---
# npm上传包，github封装库
  1. github新建项目，上传项目，根据杨清项目配置
   ````
  {
    "name": "absweek",
    "version": "1.0.2",
    "description": "获取从1970.1.1 至今 绝对星期数",
    "private": false,
    "author": "LiSC <903317164@qq.com>",
    "license": "MIT",
    "repository": {
        "type": "git",
        "url": "https://github.com/SunOfHomeBoy/absWeek"
    },
    "main": "./index.js",
    "typings": "./index.d.ts",
    "scripts": {
        "build": "tsc --declaration true --noImplicitUseStrict --removeComments ./index.ts"
    },
    "dependencies": {}
  }
   ````
  2. 配置好项目 npm login 
  3. npm publish . 上传项目
  NOTE: 版本号，项目名称禁止大写，Token,添加github地址，上传包之前编译。TS版，包声明。

  4. 在其他项目 npm install '包名'
  5. 引入，调用
