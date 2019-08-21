---
title: Vue-$nextTick()作用
date: 2018-07-14 09:44:23
tags: $nextTick()作用
categories: Vue
---
## [Vue中`$nextTick()`作用](https://blog.csdn.net/shuidinaozhongyan/article/details/72630573)

官方文档解释如下：

在下次 DOM `更新循环结束之后`执行延迟回调。在修改数据之后立即使用这个方法，获取`更新后的 DOM`。

所以就衍生出了这个获取更新后的DOM的Vue方法。所以放在Vue.nextTick()回调函数中的执行的应该是会`对DOM进行操作的 js代码`.

### 什么时候需要用的`Vue.nextTick()` ?

在Vue生命周期 `created()`钩子函数进行的`DOM操作`一定要放在`Vue.nextTick()`的回调函数中。

原因是 `created()`钩子函数执行时, DOM 并未进行任何渲染，此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进`Vue.nextTick()的回调函数中`。

与之对应的就是`mounted()`钩子函数，因为该钩子函数执行时所有的DOM挂载已完成。

使用时机：el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子函数，此时页面并未全部渲染。

在某个动作有可能`改变DOM元素结构`的时候，对`DOM一系列的js操作`都要放进`Vue.nextTick()的回调函数`中.