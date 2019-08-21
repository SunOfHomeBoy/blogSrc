---
title: vue-resize
date: 2018-05-14 15:59:59
tags: VueJs 监听 window.resize
categories: VUE
---
## 主要记录方案二：

在vue 2.x 里面的时候，可以在 `mounted` 钩子中 全局监听 `resize` 事件，然后绑定的函数再做具体的处理。

````
data(){
    return {
        clientHeight: '600px',
    },
},
mounted() {
    // 动态设置背景图的高度为浏览器可视区域高度

    // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
    > this.clientHeight.height = `${document.documentElement.clientHeight}px`;
    
    // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
    > const that = this;
    > window.onresize = function temp() {
    >     that.clientHeight = `${document.documentElement.clientHeight}px`;
    > };
},
````

-----------------
[阅读原文](https://blog.csdn.net/qq_25386583/article/details/77161478)