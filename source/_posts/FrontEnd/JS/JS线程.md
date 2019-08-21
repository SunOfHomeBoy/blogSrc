---
title: JS线程
date: 2018-05-09 14:32:36
tags:
categories:
---
## [转][从setTimeout/setInterval看JS线程](https://mp.weixin.qq.com/s/FCy68lhFhEcm8o26f7970A)
`setTimeout`和`setInterval`的`延时最小间隔`是`4ms`(W3C在HTML标准中规定)；

在`JavaScript`中`没有`任何代码是`立刻执行`的，但`一旦进程空闲`就`尽快执行`。

这意味着无论是`setTimeout`还是`setInterval`，所设置的时间都只是 `n毫秒后被添加到队列中`，而`不是`过`n毫秒后立即执行`。

---------------------
[阅读原文](https://mp.weixin.qq.com/s/FCy68lhFhEcm8o26f7970A)