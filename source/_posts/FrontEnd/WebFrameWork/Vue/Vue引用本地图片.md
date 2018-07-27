---
title: Vue引用本地图片
date: 2018-07-14 10:37:39
tags: Vue引用本地图片
categories: VUE
---
## Vue引用本地图片
````
import logoH from '@/images/logo-min.jpg' // 首先得静态引入
````

````
this.$store.commit('setAvator', logoH); // 其次再直接引用变量
````