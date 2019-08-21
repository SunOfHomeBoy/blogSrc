---
title: JS笔记-廖雪峰
date: 2018-04-16 17:22:06
tags: ES5/ES6
archives: 
categories: 原生JS
---
## ES6 Map和Set(廖雪峰)
(https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345007434430758e3ac6e1b44b1865178e7aff9082e000)<br>
JavaScript的 默认对象 表示方式`{}`可以视为其他语言中的`Map`或`Dictionary`的数据结构，即一组`键值对`。
但是JavaScript的对象有个小问题，就是`键`必须是`字符串`。但实际上`Number`或者`其他数据类型`作为键也是非常合理的。

为了解决这个问题，最新的`ES6`规范引入了 新的 数据类型`Map`。
测试浏览器是否支持`ES6规范` 执行以下代码，如浏览器报ReferenceError错误，那么你需要换一个支持ES6的浏览器：
````
'use strict';
var m = new Map();
var s = new Set();
console.log('你的浏览器支持Map和Set！');
````
### Map(`增set` `删delete` `改set` `查get has`)
`Map`是一组`键值对`的结构，具有极快的查找速度。
> var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]); <br>
> m.get('Michael'); // 95

初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法：
````
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
````
一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：
````
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88
````

### Set(`没有重复的key`)
`Set`和`Map`类似，也是一组`key的集合`，但`不存储value`。由于`key不能重复`，所以，在Set中，`没有重复的key`。
要`创建一个Set`，需要提供一个`Array`作为输入，或者`直接创建一个空Set`：
````
var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
````
重复元素在Set中自动被过滤：
> var s = new Set([1, 2, 3, 3, '3']);
> s; // Set {1, 2, 3, "3"}

通过`add(key)`方法可以`添加元素到Set`中，可以重复添加，但不会有效果：
通过`delete(key)`方法可以删除元素：

