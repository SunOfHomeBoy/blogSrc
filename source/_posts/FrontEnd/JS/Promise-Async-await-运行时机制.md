---
title: JavaScript运行时
date: 2018-05-31 10:47:18
tags: JS运行时
categories: JS RunTime
---
## Promise Async/await 运行时机制
故事要从一道今日头条的笔试题说起～ 

题目来源：[半年工作经验今日头条和美团面试题面经分享！！！！！](https://juejin.im/post/5b03e79951882542891913e8)

````
async function async1(){

    console.log('async1 start')

    await async2()

    console.log('async1 end')

}

async function async2(){

    console.log('async2')

}

console.log('script start')

setTimeout(function(){

    console.log('setTimeout') 

},0)  

async1();

new Promise(function(resolve){

    console.log('promise1')

    resolve();

}).then(function(){

    console.log('promise2')

})

console.log('script end')
````
求打印结果？

题目考 js 事件循环和回调队列～ 假设看客已经了解 `setTimeout` 是`宏任务`会在`最后执行`的前提（因为它不是今天要讨论的重点），主要讨论 `promise`、`async` 和 `await` 之间的关系。

个人思路：
````
1. console.log('script start')
2. console.log('async1 start')
   async2 开始执行
   console.log('async1 end') 等待 async2
3. 
4. 

````

---

## JS `执行机制` 及 `异步回调`( setTimeout / setInterval / Promise )

`javascript执行机制` `代码执行顺序` `函数生命周期加载`等类似问题 都与`javascript执行机制`相关。

1. 关于javascript
`javascript`是一门`单线程语言`，在最新的`HTML5`中提出了`Web-Worker`，但`javascript是单线程这一核心仍未改变`。所以一切`javascript版的"多线程"都是用单线程模拟出来的`，一切javascript`多线程`都是`纸老虎`！
2. javascript事件循环
既然js是`单线程`，排队 办理业务, `js任务`也要一个一个顺序执行。如 `任务耗时过长`，后一个任务必须等着。浏览新闻 超清图片加载慢 需要异步加载 任务分为两类：
+ 同步任务
+ 异步任务
  打开网站，`网页渲染` 过程 就是 `同步任务`，比如 `页面骨架`和 `页面元素`的`渲染`。而 `加载 图片 音乐`之类`占用资源大耗时久`的任务，就是`异步任务`。关于这部分有严格的文字定义，但本文的目的是用最小的学习成本彻底弄懂执行机制，所以我们用导图来说明：
  ![js事件循环机制](https://img-blog.csdn.net/20171124105726497?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaGFvYWlxaWFu/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
导图要表达的内容用文字来表述的话：<br>
`同步`和`异步`任务分别进入不同的`执行”场所”`，`同步的进入主线程`，`异步的进入Event Table并注册函数`。当指定的事情`完成`时，`Event Table`会将这个`函数` `移入Event Queue`。`主线程`内的任务`执行完`毕为空，会去`Event Queue`读取对应的函数，进入主线程执行。

上述过程会不断重复，也就是常说的Event Loop(事件循环)。

我们不禁要问了，那`怎么知道`主线程执行栈为空啊？js引擎存在`monitoring process`进程，会`持续不断检查`主线程执行栈是否为空，`一旦为空`，就会去`Event Queue`那里检查是否有`等待被调用的函数`。 
说了这么多文字，不如直接一段代码更直白：略

3. 又爱又恨的setTimeout


(https://juejin.im/post/59e85eebf265da430d571f89)

(https://blog.csdn.net/haoaiqian/article/details/78622651)

---

## `Async/Await`替代 `Promise` 的6个理由


[阅读原文](https://www.cnblogs.com/fundebug/p/6667725.html)
