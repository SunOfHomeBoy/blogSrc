---
title: 修改css的API
date: 2019-03-18 17:29:08
tags:
categories:
---
## cssText的应用
```js
// 重写
cssText = '';

// 累加
cssText += '';
```

```js
/** 
 * Element: DOM 元素
 * 切换元素的 className
 * 判断是否存在
 */
Element.classList.toggle('pause');
if (Element.classList.contains('pause')) {}
```

```js
/** 兼容写法 */
navContainer.currentStyle // IE
  ? navContainer.currentStyle
  : document.defaultView.getComputedStyle(navContainer, null)
```