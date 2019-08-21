---
title: 剖析JS属性、方法
date: 2018-07-25 09:14:21
tags: JS属性与方法分类
categories: JS
---

## [剖析JS属性、方法](https://news.html5.qq.com/share/164582063261917465?url=http%3A%2F%2Fkuaibao.qq.com%2Fs%2F20180725A08BMB00&sh_sid=2__o9GiTuOu_QRC6DkXCyHHQgkLHmPo__2d72ce3ac1ca7644990ae3e313b788cb&ch=060000&qbredirect=&share=true&sc_id=uv6GTqC)

玩转JavaScript，得有很扎实的基础，基础体现在哪？其中一个最重要的点就是对`JavaScript的属性和方法`有足够的了解和认识。这里，我会带大家一起来彻底消灭这些盲点（对JavaScript属性和方法的分类还存在模糊的印象）。

### **一、属性**
JS属性四种类型：`私有属性`，`原型属性`，`实例属性`，`类属性`。

区别和使用：
````
var a = function () {
  var x = 'a'; // 私有属性
  this.z = 'c'; // 实例属性
}
a.y = 'b'; // 类属性
a.prototype.m = 'd'; // 原型属性
````

````
var t1 = new a();
console.log(t1.x) // undefined [`实例`不能访问`私有变量`，私有变量只在`函数内`使用]
console.log(t1.y) // undefined [`实例`不能访问`类属性`，类属性只有类本身才能访问，实例不能访问]
console.log(t1.z) // c [`实例`访问`实例属性`]
console.log(t1.m) // d [`实例`访问`原型属性`]

console.log(a.x) // undefined [`类`不能访问`私有变量`，私有变量只在`函数内`使用]
console.log(a.y) // b [`类属性`只有类本身才能访问]
console.log(a.z) // undefined [`类`本身无法访问`实例属性`]
console.log(a.m) // undefined [`类`本身无法访问`原型属性`]
````

**注意总结**

1. `私有变量`只能在`函数内`使用。
2. `实例属性`和`原型属性`拥有`相同变量`时，优先访问`实例属性`。
3. 如上`变量y`，只有`类本身`才能访问`类属性，实例不能访问。

### **二、方法**
方法类型：`静态方法`，`实例方法`，`内部方法`


1. 静态方法(不能被实例对象调用)
````
var b = function() {}
b.f1 = function() { // 定义一个`静态方法`
  console.log('静态方法')
}
b.f1() // 静态方法

var c = new b()
c.f1() // c.f1 is not a function
````

2. 实例方法(注意访问优先级)

JS定义一个`实例方法`有三种方式：
① 构造函数中使用`this`
② 直接绑定在`实例`上
③ 绑定在`原型`上
````
var b = function() {
  this.method1 = function() {
    console.log('this')
  }
} // 构造函数`this`

var c = new b()
c.method1 = function() {
  console.log('instance')
} // `实例`绑定

b.prototype.method1 = function() {
  console.log('prototype')
} // `原型`绑定
````
**总结**

上述代码展示了三种方式定义`实例方法`。

**执行顺序:**`实例上绑定`的优先级高于`this上绑定`的，`this上绑定`的高于`原型上绑定`的实例方法。

`实例上绑定` > `this上绑定` > `原型上绑定`

3. 内部方法(只能内部调用)
````
var b = function() {
  var method1 = function() {
    console.log('method1')
  }
  var method2 = function() {
    console.log('method2')
    method1()
  }
  this.method3 = function() {
    method2()
  }
}

var c = new b()
c.method1() // c.method1 is not a function
c.method3() // method2 method1
````
上面代码定义了两个内部方法`method1`和`method2`。由运行结果可知，内部方法method1和method2`只能在函数内部调用`，外部通过实例对象无法找到该方法。

## **最后总结一下：**
通过这篇文章，我们知道了`属性的定义`，属性分`私有属性`，`原型属性`，`实例属性`，`类属性`，这`四种`，它们各自是怎么定义，及访问原则。同时我们也知道了`方法的定义`，方法分`静态方法`，`实例方法`，`内部方法`三种，主要注意一下它们的调用，及`实例方法的三种创建形式`。

属性的定义[4种]  
1· 私有属性  
2· 原型属性  
3· 实例属性  
4· 类属性

方法的定义[3种]  
1· 静态方法  
2· 实例方法  
3· 内部方法  
