---
title: VUE获取当前路由的API
date: 2018-05-24 14:58:37
tags: 获取当前路由地址
categories: VUE
---
## TS语法
````
let curPath = (this.$router as any).history.current.path
````

## Vue模板语法
````
let curPath = this.$router.history.current.path

````