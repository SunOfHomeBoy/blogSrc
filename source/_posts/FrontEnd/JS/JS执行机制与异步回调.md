---
title: JS执行机制与异步回调
date: 2018-05-09 14:38:24
tags: JS执行机制 异步回调
categories: JS
---
## [转][理解JavaScript 执行机制及异步回调(setTimeout/setInterval/Promise)](https://blog.csdn.net/haoaiqian/article/details/78622651)
'`javascript执行机制`' / '`代码执行顺序`' / '`函数生命周期加载`' 等类似问题 都与`javascript执行机制`相关。

## 1. 关于JavaScript
`JavaScript` 是一门 `单线程语言`，在最新的`HTML5`中提出了`Web-Worker`，但`JS 是单线程`这一`核心仍未改变`。所以一切`JS 版的"多线程"都是用单线程模拟出来的`，一切 JavaScript `多线程` 都是`纸老虎`！

## 2. JavaScript事件循环
既然JS是`单线程`，排队 办理业务, `js任务`也要一个一个顺序执行。如 `任务耗时过长`，后一个任务必须等着。浏览新闻 超清图片加载慢 需要异步加载 任务分为两类：
+ 同步任务\
打开网站，`网页渲染` 过程 就是 `同步任务`，比如 `页面骨架`和 `页面元素`的`渲染`。
+ 异步任务\
  而 `加载 图片 音乐`之类`占用资源大耗时久`的任务，就是`异步任务`。
  
  关于这部分有严格的文字定义，但本文的目的是用最小的学习成本彻底弄懂执行机制，所以用导图来说明：
  ![js事件循环机制](https://img-blog.csdn.net/20171124105726497?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaGFvYWlxaWFu/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
  
  导图要表达的内容用文字来表述的话：<br>
`同步`和`异步`任务分别进入不同的`执行”场所”`，`同步的进入主线程`，`异步的进入Event Table并注册函数`。当指定的事情`完成`时，`Event Table`会将这个`函数` `移入Event Queue`。`主线程`内的任务`执行完`毕为空，会去`Event Queue`读取对应的函数，进入主线程执行。

  上述过程会不断重复，也就是所谓的 `Event Loop(事件循环)`。

  我们不禁要问了，那`怎么知道`主线程执行栈为空啊？js引擎存在`monitoring process`进程，会`持续不断检查`主线程执行栈是否为空，`一旦为空`，就会去`Event Queue`那里检查是否有`等待被调用的函数`。 
说了这么多文字，不如直接一段代码更直白：略

## 3. [又爱又恨的setTimeout](https://juejin.im/post/59e85eebf265da430d571f89)

大名鼎鼎的`setTimeout`无需再多言，大家对他的第一印象就是`异步`可以`延时执行`，我们经常这么实现延时3秒执行：
````
setTimeout(() => {
    console.log('延时3秒');
},3000)
````

随着`setTimeout`使用的增加，问题也出现了，有时候明明写的延时3秒，实际却5，6秒才执行函数，这是为何？

渐渐的setTimeout用的地方多了，问题也出现了，有时候明明写的延时3秒，实际却5，6秒才执行函数，这又咋回事啊？

先看一个例子：
````
setTimeout(() => {
    task();
},3000)
console.log('执行console');
````

根据前面我们的结论，setTimeout是异步的，应该先执行console.log这个同步任务，所以我们的结论是：
````
//执行console
//task()
````

去验证一下，结果正确！
然后我们修改一下前面的代码：
````
setTimeout(() => {
    task()
},3000)

sleep(10000000)
````
乍一看其实差不多，但把这段代码在chrome执行一下，却发现控制台执行task()需要的时间远远超过3秒，为何需要这么长时间？

这时候我们需要重新理解`setTimeout的定义`。我们先说上述代码是怎么执行的：

+ `task()`进入Event Table并注册,计时开始。

+ 执行`sleep`函数，很慢，非常慢，计时仍在继续。

+ 3秒到了，计时事件`timeout`完成，`task()`进入`Event Queue`，但是`sleep`也太慢了吧，还没执行完，只好等着。

+ `sleep`终于执行完了，`task()`终于从Event Queue进入了主线程执行。

上述的流程走完，我们知道`setTimeout`这个函数，是经过指定时间后，把要执行的任务(本例中为`task()`)加入到Event Queue中，又因为是单线程任务要一个一个执行，如果前面的任务需要的时间太久，那么只能等着，导致真正的延迟时间远远大于3秒。
