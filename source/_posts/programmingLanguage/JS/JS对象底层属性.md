---
title: JS对象底层属性
date: 2019-10-21 17:30:09
tags: 对象 object 属性
categories: JS
---
## 四个数据属性
+ writable
对象属性是否可以被任意改写

+ enumerable
```js
if(`对象属性是否可枚举`) {
  for in;  Object.keys; JSON.stringify
}
```

+ value
对象属性默认值

+ configurable(Boolean)
能否使用`delete?`;`修改属性特性`;`修改访问器属性`;

## 两个访问器属性
+ get
获取对象属性 触发

+ set
给对象属性赋值 触发