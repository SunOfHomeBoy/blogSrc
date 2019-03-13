---
title: CSS-placeholder样式修改
date: 2019-03-13 10:31:22
tags: placeholder
categories: CSS
---
# [placeholder样式选择器](https://www.cnblogs.com/JennyLin77/p/5308431.html)
```css
::-webkit-input-placeholder{}    /* 使用webkit内核的浏览器 */

:-moz-placeholder{}                  /* Firefox版本4-18 */

::-moz-placeholder{}                  /* Firefox版本19+ */

:-ms-input-placeholder{}           /* IE浏览器 */
```
注1：冒号前写对应的input或textarea元素等。\
注2：placeholder属性是css3中新增加的属性，IE9和Opera12以下版本的CSS选择器均不支持占位文本。

```css
[input || textarea]::-webkit-input-placeholder {
  color: #3c5482;
}
```
