---
title: JavaScript`this`原理
date: 2018-06-22 15:20:13
tags: JS-this原理
categories: JS
---
# JavaScript 的 this 原理
## 一、问题的由来
学懂 JavaScript 语言，一个标志就是理解下面两种写法，可能有不一样的结果。

````
var obj = {
  foo: function () {}
};
var foo = obj.foo;
// 写法一
obj.foo()
// 写法二
foo()
````
上面代码中，虽然obj.foo和foo指向同一个函数，但是执行结果可能不一样。请看下面的例子。

````
var obj = {
  foo: function () { console.log(this.bar) },
  bar: 1
};
var foo = obj.foo;
var bar = 2;
obj.foo() // 1
foo() // 2
````

这种差异的原因，就在于函数体内部使用了`this`关键字。很多教科书会告诉你，this指的是函数运行时所在的环境。
对于obj.foo()来说，foo运行在obj环境，所以this指向obj；对于foo()来说，foo运行在全局环境，所以this指向全局环境。所以，两者的运行结果不一样。

这种解释没错，但是教科书往往不告诉你，为什么会这样？也就是说，函数的运行环境到底是怎么决定的？举例来说，为什么obj.foo()就是在obj环境执行，而一旦var foo = obj.foo，foo()就变成在全局环境执行？

本文就来解释 JavaScript 这样处理的原理。理解了这一点，你就会彻底理解this的作用。

## 二、内存的数据结构
JavaScript 语言之所以有`this`的设计，跟`内存`里面的`数据结构`有关系。

````
var obj = { foo:  5 };
````

上面的代码将一个`对象`赋值给变量`obj`。JavaScript 引擎会先在`内存`里面，`生成一个对象{ foo: 5 }`，然后把这个对象的`内存地址`赋值给变量obj。

也就是说，变量obj是一个地址 (reference) 。后面如果要读取obj.foo，引擎先从obj拿到内存地址，然后再从该地址读出原始的对象，返回它的foo属性。

`原始的对象`以`字典结构`保存，每一个属性名都`对应`一个属性描述对象。举例来说，上面例子的foo属性，实际上是以下面的形式保存的。

**注意**：foo属性的值保存在属性描述对象的value属性里面。

## 三、函数
这样的结构是很清晰的，问题在于属性的值可能是一个`函数`。

````
var obj = { foo: function () {} };
````
这时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性。

````
{
  foo: {
    [[value]]: 函数的地址
    ...
  }
}
````

由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。

````
var f = function () {};
var obj = { f: f };
// 单独执行
f()
// obj 环境执行
obj.f()
````

## 四、环境变量
JavaScript 允许在函数体内部，引用当前环境的其他变量。
````
var f = function () {
  console.log(x);
};
````
上面代码中，函数体里面使用了变量`x`。该变量由运行环境提供。

现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在`函数体内部获得当前的运行环境（context）`。所以，`this就出现`了，它的`设计目的`就是在函数体内部，指代函数当前的运行环境。

````
var f = function () {
  console.log(this.x);
}
````
上面代码中，函数体里面的this.x就是指当前运行环境的x。

````
var f = function () {
  console.log(this.x);
}
var x = 1;
var obj = {
  f: f,
  x: 2,
};
// 单独执行
f() // 1
// obj 环境执行
obj.f() // 2
````
上面代码中，函数f在全局环境执行，this.x指向全局环境的x。
![](https://mmbiz.qpic.cn/mmbiz_png/btsCOHx9LAOGjicfd5I43teJ3ickrLuhxcIaH1qiaI67Lt0fZ31q7eTFIqIBcg8mViacnWQD4MChFlaicu4HaUX4SKw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

在obj环境执行，this.x指向obj.x
![](https://mmbiz.qpic.cn/mmbiz_png/btsCOHx9LAOGjicfd5I43teJ3ickrLuhxco6hl0vCicIXHMat4Kgt1UgdoniaMMldWogk74hVyia9DIXBHbIe142BtQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

回到本文开头提出的问题，obj.foo()是通过obj找到foo，所以就是在obj环境执行。一旦var foo = obj.foo，变量foo就直接指向函数本身，所以foo()就变成在全局环境执行。

---
[阅读原文](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html) 作者：阮一峰