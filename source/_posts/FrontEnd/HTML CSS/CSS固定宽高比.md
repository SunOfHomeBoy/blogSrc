---
title: CSS固定宽高比
date: 2018-06-14 16:40:12
tags: 固定宽高比
categories: HTML+CSS
---
## 纯CSS实现固定宽高比
````
  <style type="text/css">
    .container {
      position: relative;
      width: 40%;
      /*触发BFC，否则内部元素撑不开container*/
      overflow: hidden;
      /*为了让大家看清楚效果加的边*/
      border: 1px solid black;
    }

    /*支架，用于按2:1的宽高比撑开父级元素，如果是4:3，那么这里改成75%即可*/
    .container::before {
      display: block;
      content: '';
      margin-top: 50%;
    }

    .target {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  </style>

<body>
  <div class="container">
    <img class="target" src="http://i2.tiimg.com/611341/b66c935ed2587806t.jpg" alt="">
  </div>
</body>
````
总结：

容器元素：宽度百分比，`overflow：hidden;` 防止与父元素margin重叠，进入BFC块级格式化上下文。相对定位，为`target`容器确定定位参照。

伪类元素：`margin-top`百分比值继承自父元素宽度,通过伪类元素撑开容器盒子,使其拥有高度.

目标元素：通过绝对定位，脱离文档流，并使 宽/高100% 继承父元素宽高值。来达到img固定宽高比。



---
[附：原文地址](https://www.cnblogs.com/coolle/p/6553092.html)

[参考文献](https://www.cnblogs.com/xjnotxj/p/5517651.html)

---
## 背景色
16进制cdc转rgb(204,221,204)

