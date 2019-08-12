---
title: Vue-开发技巧
date: 2019-06-11 16:52:07
tags:
categories:
---
# [Vue开发技巧](https://mp.weixin.qq.com/s?__biz=MzAwNjI5MTYyMw==&mid=2651497482&idx=1&sn=5c1bf8865cecbf4585441f257d473d09&chksm=80f1adc2b78624d4b26284d65a2e8d3527f04ac186feb2a791aec68f365a8539f14d688ca9a4&scene=0&xtrack=1&key=9f119a2cc0889571aafd9635c6417fd27ab07c1f7c3dcebda2c4a69d22280b6285d0e152ae4a18cdc33e724c8446678b124e72b5216ceed29348a2f3efc69d1778ab5702455a372a785e4232335ddd81&ascene=1&uin=NDc0MjYzNDU1&devicetype=Windows+10&version=62060833&lang=zh_CN&pass_ticket=VKSwa6kXziXKUbDXPDWmyZxfaLh5uErMg1PwsZADDClFFQZmqrotIlucMHi9%2BAQT)

## 状态共享
vue.js 2.6 新增加的 Observable API

## 长列表性能优化
> `object.defineProperty`对数据进行劫持
> `object.freeze`方法来冻结一个对象
只是冻结 值，引用不会被冻结，当我们需要 reactive数据的时候，我们可以重新给 变量赋值。

## 去除多余的样式
> purgecss

## 作用域插槽

## 属性事件传递

## 函数式组件

## 监听组件的生命周期
