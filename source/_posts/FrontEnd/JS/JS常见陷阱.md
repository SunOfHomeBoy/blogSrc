---
title: JS常见陷阱
date: 2018-05-05 10:36:51
tags: JS常见坑
archives: JS
categories: JS
---
# JavaScript中8个常见的陷阱
## 1. 数组元素排序
JavaScript默认使用`字典序(alphanumeric)`来排序。因此，`[1,2,5,10].sort()`的结果是`[1, 10, 2, 5]`。

如果你想正确的排序，应该这样做：`[1,2,5,10].sort((a, b) => a - b)`

## 2. new Date()
`new Date()`的使用方法有：
+ 不接收任何参数：返回当前时间；
+ 接收一个参数x: 返回1970年1月1日 + x毫秒的值。
+ new Date(1, 1, 1)返回1901年2月1号。
+ new Date(2016, 1, 1)不会在1900年的基础上加2016，而只是表示2016年。

## 3. 替换函数(replace)

    let s = "bob"
    const replaced = s.replace('b', 'l')
    replaced === "lob" // 只会替换掉第一个b
    s === "bob" // 并且s的值不会变  

如果想把所有`b`都替换掉，要使用正则：

    "bob".replace(/b/g, 'l') === 'lol'

## 4. 谨慎对待比较运算
  // 这些可以
  'abc' === 'abc' // true
  1 === 1         // true
  // 然而这些不行
  [1,2,3] === [1,2,3] // false
  {a: 1} === {a: 1}   // false
  {} === {}           // false

  因为`[1,2,3]`和[1,2,3]是两个不同的数组，只是它们的元素碰巧相同。因此，不能简单的通过===来判断。

