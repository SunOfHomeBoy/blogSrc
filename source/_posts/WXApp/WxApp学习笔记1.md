---
title: WxApp学习笔记1
date: 2018-06-06 12:16:14
tags: WX小程序
categories: WxApp
---
## 一、简介
+ 前端
  + PC
    + WEB
    + OS-Native(Windows/Unix[Linux/MaxOS])
  + MB
    + WAP
    + hybrid
    + OS-Native(Android/ios)
    + WXApp(微信小程序)
+ 后台
  + Server
    + Java
    + PHP
    + NodeJS
    + Python
    + Golang
    + Ruby
    + ...
  + DataBase
    + SQL
      + MySQL
      + MsSQL
      + ...
    + NoSQL
      + MongoDB
      + Redis
      + ...

## 二、小程序开发工具下载安装
  百度小程序开发下载工具，默认安装即可

## 三、组件
### **scroll-view**
| 属性名 | 类型 | 默认值 | 说明 |
| :-: | :-: | :-: | :-: |
| scroll-x | Boolean | false | 横向滚动 |
| scroll-y | Boolean | false | 纵向滚动 |
| upper-threshold | Number | 50 | 距`顶部/左边`??px, 触发 scrolltoupper 事件 |
| lower-threshold | Number | 50 | 距`底部/右边`??px, 触发 scrolltolower 事件 |
| scroll-top | Number |  | 控制横向滚动条位置 |
| scroll-left | Number |  | 控制纵向滚动条位置 |
| scroll-into-view | String |  | 值为子元素ID,表现为: 元素对齐滚动区域顶部 |
| bindscrolltoupper | EventHandle |  | 滚动到顶部/左边,触发`scrolltoupper` 事件 |
| bindscrolltolower | EventHandle |  | 滚动到底部/右边,触发`scrolltolower` 事件 |
| bindscroll | EventHandle |  | 滚动过程中触发`scroll` 事件, event.detail = {scrollLeft/Top/Width/Height、detailX/Y} |


### **swiper**
子元素只有\<swiper-item/>组件,其余节点会被自动删除。

\<swiper-item/>只可放置在\<swiper/>组件中，宽高自动100%。

| 属性名 | 类型 | 默认值 | 说明 |
| :-: | :-: | :-: | :-: |
| indicator | Boolean | false | 控制显示面板指示点 |
| autoplay | Boolean | false | 自动切换 |
| current | Number | 0 | 切换到指定 index |
| interval | Number | 5000 | 自动切换时间间隔 |
| duration | Number | 1000 | 过渡动画时长 |
| bindchange | EventHandle |  | current 改变触发`change` 事件, event.detail = {current: current} |
