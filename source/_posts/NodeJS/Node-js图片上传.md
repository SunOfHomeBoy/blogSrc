---
title: Node.js图片上传
date: 2018-07-04 18:24:59
tags:
categories:
---
## [转][node.js 实现图片上传服务](https://blog.csdn.net/ziyetian666/article/details/79737495)

## 使用multiparty插件实现上传
### 安装multiparty
> npm i --save multiparty

### 代码实现
````
const multiparty = require('multiparty');

let form = new multiparty.Form({uploadDir: upload.path});
````

### 构造参数说明

`encoding` 设置接收数据编码，默认是utf-8

`maxFieldsSize` 限制字段可以分配的内存量,默认2M

`maxFields` 限制在发出错误事件之前将要解析的字段数,默认1000

`maxFilesSize` 限制总文件大小，默认无穷大

`autoFields` 启用字段事件并禁用字段的部分事件。如果添加字段侦听器，则自动将其设置为true。

`autoFiles` 启用文件事件并禁用文件的部分事件。如果添加了一个文件侦听器，则自动将其设置为true。

`uploadDir` 文件上传的目录

**如果回调提供，`autofields`和`autofiles`被设置为`true`，所有字段和文件的收集和传递给回调，不再需要听任何形式的事件。**


### 事件说明

+ part 请求文件数据时触发，回调函数是一个实现可读流的实例对象
  - headers：头部文件
  - name：字段名称
  - filename：文件名称
  - byteFffset：主体数据的字节偏移量
  - byteCount：数据总的字节长度
