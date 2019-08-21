---
title: CSS-潜藏着的BFC
date: 2015-04-16 15:54:04
tags: BFC
archives: 样式表
categories: CSS
---
 ### 一、什么是BFC(Block Formatting Context)
   写`CSS`样式时，对一个`元素`设置css,我们首先要知道这个元素是`块级元素`还是`行内元素`，而`BFC`就是用来**`格式化块级盒子`**的。<br>
  `Formatting Context`：指页面中一个渲染区域，并且拥有一套渲染规则，它决定了其子元素如何定位，以及与其他元素的相互关系和作用。<br>
  `BFC定义`：块级格式化上下文  它是指一个独立的块级渲染区域，只有`Block-level Box`参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。<br>
 
 ### 二、BFC的生成
  说到BFC是一块渲染区域，那么这块渲染区域到底在哪里呢，具体大小又是多少？这些都是由生成BFC的元素来决定的。<br>
  满足下列CSS声明`之一`的元素便会生成BFC：
   + 1.根元素或其它包含它的元素
   + 2.float的值不为none；
   + 3.overflow的值不为visible；
   + 4.position的值不为static；
   + 5.display的值为inline-block、table-cell、table-caption；
   + 6.flex boxes (元素的display: flex或inline-flex)；
   
   注：也有人认为`display: table`能生成BFC，我认为最主要原因是table会默认生成一个匿名的table-cell，正是这个匿名的table-cell生成了BFC。

 ### 三、BFC的布局规则
  菜鸟教程待续
  