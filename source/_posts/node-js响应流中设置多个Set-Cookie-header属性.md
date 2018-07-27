---
title: node.js Set-Cookie header属性
date: 2018-07-27 15:21:18
tags: Set-Cookie
categories: Set-Cookie
---
## Node设置Cookie
### 读取cookie
cookie的读取很简单，通过`req.headers.cookie`就能取到，是一个类似"a=1;b=2"的字符串，手动分割一下就行。

### 设置cookie
> `res.setHeader("Set-Cookie","a=1")`

### 设置多个附加属性

> `res.setHeader("Set-Cookie","a=1;max-age=86400;HttpOnly")`

### 设置多个值 

> `res.setHeader("Set-Cookie",["a=1;max-age=86400","b=2;max-age=3600"])`


## Node设置多个Cookie
````
res.setHeader("Set-Cookie", ['a=000', 't=1111', 'w=2222']);

// HTTP response `writeHead`对象
res.writeHead(200, [
    ['Set-Cookie', 'mycookie1=value1'],
    ['Set-Cookie', 'mycookie2=value2']
]);

res.setHeader('Set-Cookie', [ 'mycookie1=value1',  'mycookie2=value2']);
````