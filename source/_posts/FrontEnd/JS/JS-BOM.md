---
title: JS-BOM
date: 2018-05-14 15:48:51
tags: BOM
categories: JS
---
document.documentElement.clientWidth // 设备宽度

window.innerWidth  // 窗口宽度

document.documentElement.style.fontSize // 根节点 fontSize: string

 let rootFZ = Number(document.documentElement.style.fontSize.split('px')[0]); // 根节点 fontSize: number

### 事件监听
`onTransitionEnd`