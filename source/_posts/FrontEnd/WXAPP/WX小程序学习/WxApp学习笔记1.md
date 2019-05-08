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

# 起步
## 小程序简介
  + 小程序技术发展史
  + 小程序与普通网页开发区别
  + 体验小程序

## 开始
  + 申请账号
  + install dev tool
  + your first 小程序
  + build | preview

## 小程序代码构成
  + JSON 配置
  + WXML 模板
  + WXSS 样式
  + JS 交互逻辑

## 小程序宿主环境
  + 渲染层和逻辑层
  + 程序与页面
  + 组件
  + API

## 小程序协同工作和发布
  + 协同工作
  + 小程序的版本
  + 发布上线
  + 运营数据

## 小程序开发指南

# 小程序App 目录结构
## 微信小程序 目录结构解读
小程序包含一个描述整体程序的 `app` 和多个描述各自页面的 `page`。

+ project.config.json // 项目配置文件

小程序 `主体` 部分由三个文件组成，必须放在项目的根目录，如下：
+ entry(入口 | 主体)
  - app.js    // 小程序逻辑
  - app.json  // 小程序公共配置
  - app.wxss  // 小程序公共样式表

小程序`页面`由四个文件组成，分别是：
+ page(页面)
  - pageName.js   // 页面逻辑
  - pageName.wxml // 页面结构
  - pageName.json // 页面配置
  - pageName.wxss // 页面样式表

**注意：为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名。**

## 允许上传的文件(白名单)
1. wxs
2. png
3. jpg
4. jpeg
5. gif
6. svg
7. json
8. cer
9. mp3
10. aac
11. m4a
12. mp4
13. wav
14. ogg
15. silk

# 配置小程序

## 全局配置

## 页面配置

## sitemap 配置
配置其小程序页面是否允许微信索引

# 小程序框架
## 场景值

## 逻辑层
  + 注册小程序
  + 注册页面
  + 页面生命周期
  + 页面路由
  + 模块化
  + API

## 视图层
  + WXML
  + WXSS
  + WXS
  + 事件系统
    - WXS响应事件
  + 基础组件
  + 获取界面上的节点信息
  + 响应显示区域变化
  + 动画

# 小程序运行时

## 运行环境

## JS支持情况

## 运行机制
### **小程序启动**
  + 热启动：假如用户已经打开过某小程序，然后在一定时间内再次打开该小程序，此时无需重新启动，只需将 `后台态` 的小程序切换到前台，这个过程就是热启动；
  
  + 冷启动：用户首次打开或小程序被微信主动销毁后再次打开的情况，此时小程序需要重新加载启动，即冷启动。
  
  - 小程序没有重启的概念。
---

### 前台/后台状态

### 小程序销毁
**注意**：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。

  + 当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）小程序会被微信主动销毁。
  + 当小程序占用系统资源过高，可能会被系统销毁或被微信客户端主动回收。
    - 在 iOS 上，当微信客户端在一定时间间隔内（目前是 5 秒）连续收到两次及以上系统内存告警时，会主动进行小程序的销毁，并提示用户 「该小程序可能导致微信响应变慢被终止」。
    - 建议小程序在必要时使用 wx.onMemoryWarning 监听内存告警事件，进行必要的内存清理。
> 基础库 1.1.0 及以上，1.4.0 以下版本： 当用户从扫一扫、转发等入口（场景值为1007, 1008, 1011, 1025）进入小程序，且没有置顶小程序的情况下退出，小程序会被销毁。
---

### 再次打开逻辑
> 基础库 1.4.0 开始支持，低版本需做兼容处理。
用户打开小程序的预期有以下两类场景：
+ A. 打开首页： 场景值有以下几项：
+ B. 打开小程序指定的某个页面： 场景值为除 A 以外的其他

## 更新机制

# 自定义组件
## 组件模板和样式
## Component 构造器
## 组件间通信与事件
## 组件生命周期
## behaviors(行为)
## 组件间关系
## 数据监听器
## 抽象节点
## 自定义组件扩展
## 开发第三方自定义组件
## 单元测试

# 插件
## 开发插件
## 使用插件
## 插件调用API的限制
## 插件使用组件的限制
## 插件功能页
### 用户信息功能页
### 支付功能页
### 收货地址功能页

# 基础能力
## 网络
## 存储(持久化)
## 文件系统
## 画布(canvas)
## 分包加载
## 多线程(Worker)
## 服务端能力(server)
## 自定义(tabBar)

# 硬件能力
## 蓝牙
## NFC
## Wi-Fi

# 开放能力
## 用户信息
+ 小程序登录
+ UnionID机制说明
+ 授权
+ 开放数据校验与解密
+ 获取手机号
+ 生物认证

## 转发
+ 转发
+ 动态消息

## 打开APP

## 消息
+ 模板消息
+ 统一服务消息
+ 客服消息
  - 概述
  - 接收消息和事件
  - 发送消息
  - 转发消息
  - 下发客服输入状态
  - 临时素材
+ 卡券
  - 概述
  - 会员卡组件
+ 获取小程序码
+ 数据分析
+ 附近的小程序
+ 物流助手
  - 商户侧接入说明
  - 快递侧接入说明
  - 打单软件
+ 广告
  - Banner广告
  - 激励视频广告
  - 插屏广告

# 调试

# 性能
## 优化建议
## 分析工具

# 基础库
## 版本分布
## 低版本兼容

