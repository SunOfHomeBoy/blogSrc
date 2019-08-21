---
title: 修改样式
date: 2018-05-29 10:15:08
tags: JS修改样式
categories: JS修改CSS
---
## JS修改CSS样式

### 1. `setAttribute`
````
let evedd = sideMenu.children[i].getElementsByTagName('dd')[0]

evedd.setAttribute('style', `height: 0px`)
````

### 2. `.style`
````
document.documentElement.style.fontSize
    = document.documentElement.clientWidth / 3.75 + 'px';
````