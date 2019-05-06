---
title: CSS-行内元素 消除边距
date: 2019-02-26 11:07:58
tags:
categories: CSS
---
```html
<div class="parent">
　　<span class="child">美女如云</span>
　　<span class="child">高山流水</span>
</div>

<style type="text/css">
*{
　　margin:0 auto;
}
/* 父元素 font-size 设为0; text-size-adjust: none */
.parent {
　　font-size: 0;
　　-webkit-text-size-adjust: none
}
/* 设置字体大小，不然可能看不到字 */
.child {
    display:inline-block; 
    width:100px; height:100px; 
    color: #000;
    font-size: 15px;
    background:green;
}
</style>

```