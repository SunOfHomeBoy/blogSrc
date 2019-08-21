---
title: 元素垂直居中方法
date: 2018-08-06 16:21:31
tags: 元素垂直居中
categories: CSS
---
## 方法一

这个方法把一些 div 的显示方式设置为`表格`，因此我们可以使用表格的 `vertical-align property` 属性。

````
<div id="wrapper">
  <div id="cell">
    <div class="content">Content goes here</div>
  </div>
</div>

<style>
  wrapper {
    display: table;
  }

  cell {
    display: table-cell;
    vertical-align: middle;
  }
</style>
````

**优点：**
`content` 可以动态改变高度(不需在 CSS 中定义)。当 wrapper 里没有足够空间时， content 不会被截断

**缺点：**
Internet Explorer(甚至 IE8 beta)中无效，许多嵌套标签(其实没那么糟糕，另一个专题)

## 方法二
这个方法使用`绝对定位`的 div，把它的 top 设置为 50％，top margin 设置为负的 content 高度。这意味着对象必须在 CSS 中`指定固定的高度`。

因为有固定高度，或许你想给 `content` 指定 `overflow:auto`，这样如果 content 太多的话，就会出现滚动条，以免content 溢出。

````
<div class="content"> Content goes here</div>

<style>
  position: absolute; 
  top: 50%; 
  height: 240px; 
  margin-top: -120px; /* negative half of the height(高度的一半) */
</style>
````
**优点：**
适用于所有浏览器
不需要嵌套标签

**缺点：**
没有足够空间时，content 会消失(类似div 在 body 内，当用户缩小浏览器窗口，滚动条不出现的情况)

## 方法三

这种方法，在 `content` 元素外插入一个 div。设置此 div `height:50%; margin-bottom:-contentheight;`。
content 清除浮动，并显示在中间。
````
<div id="floater">
  <div id="content">Content here</div>
</div>

floater {
  float: left;
  height: 50%;
  margin-bottom: -120px;
}

content {
  clear: both;
  height: 240px;
  position: relative;
}
````
**优点：**
适用于所有浏览器
没有足够空间时(例如：窗口缩小) content 不会被截断，滚动条出现

**缺点：**
唯一我能想到的就是需要额外的空元素了(也没那么糟，又是另外一个话题)

## 方法四
这个方法使用了一个 `position:absolute`，有固定宽度和高度的 div。这个 div 被设置为 top:0; bottom:0;。但是因为它有固定高度，其实并不能和上下都间距为 0，因此 margin:auto; 会使它居中。使用 margin:auto;使块级元素垂直居中是很简单的。

````
<div id="content"> Content here</div>

content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 240px;
  width: 70%;
}
````
**优点：**
简单

**缺点：**
`IE(IE8 beta)`中无效; 
无足够空间时，content 被截断，但是不会有滚动条出现

## 方法五：文本居中

这个方法只能将单行文本置中。只需要简单地把 `line-height` 设置为那个对象的 height 值就可以使文本居中了。

````
<div id="content"> Content here</div>

content {
  height: 100px;
  line-height: 100px;
}
````
**优点：**
适用于所有浏览器
无足够空间时不会被截断

**缺点：**
只对文本有效(块级元素无效)
多行时，断词比较糟糕


