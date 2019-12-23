---
title: JS设计模式
date: 2018-10-05 18:30:43
tags: 设计模式
categories: JavaScript
---
# **第一章 灵活语言--JavaScript**

## **1.1 全局变量 命名函数**
> function fnName() {}

## **1.2 全局变量 函数表达式**
> var fnName = function() {}

ps：全局变量污染全局作用域，容易被覆盖

## **1.3 对象收编变量**
````
var fnObj = {
  fn1: function() {},
  fn2: () => {}
}
````

## **1.4 对象另一种形式**
JS万事万物皆对象，函数也是对象

首先声明一个对象, 然后添加方法
````
var fnObj = function() {};
fnObj.fn1 = function() {};
````
ps: 对象不能复制, `new` 关键字 创建新对象，新对象不能继承方法

## **1.5真假对象**
简单复制，将方法放在一个函数对象中
````
var fnObj = function() {
  return {
    fn1: function() {},
    fn2: () => {}
  }
}

var a = fnObj();
a.fn1();
````
ps: 每次调用返回新对象, 状态不会互相干扰 / 新创建对象 和 `fnObj` 没有任何关系

## **1.6 类**
`1.5假对象`新创建对象 和`fnObj`没有任何关系
````
var fnObj = function() {
  this.fn1 = function(){}
  this.fn2 = () => {}
  this.fn3 = arguments => {}
}

var a = new fnObj();
a.fn1();
````
用类创建对象

## **1.7 检测类**
所有方法放在 函数内部 通过`this`定义。\
每次通过`new`关键字创建新对象，`新对象`对`类`的`this`上的`属性/方法`进行复制。新创建对象 都有自己的一套方法，**但是**造成的消耗很奢侈。

**第一种方法**
````
var fnObj = function() {};
fnObj.prototype.fn1 = function() {};
fnObj.prototype.fn2 = () => {};
````

实例 共享`prototype`上`属性/方法`

**第二种方法**
````
var fnObj = function() {};

fnObj.prototype = {
  fn1: function() {},
  fn2: () => {}
}
````
两种方法不能混用，第二种覆盖第一种.

## **1.8 方法的链式调用**
在声明的 每个方法末尾 将当前对象返回，JS中`this`关键字指向当前对象
````
var fnObj = {
  fn1: function() {
    // DoSomeThing
    return this;
  },
  fn2: () => {
    // DoSomeThing 
    return this;
  }
}

// 链式调用
> fnObj.fn1().fn2();
````

**构造函数原型链式调用**
````
var fnObj = function() {};

fnObj.prototype = {
  fn1: function() {
    // DoSomeThing
    return this;
  },
  fn2: () => {
    // DoSomeThing
    return this;
  }
}

// 使用时需要先创建一下
var a = new fnObj();
a.fn1().fn2();
````

## 1.9 函数祖先
`prototype.js / lodash.js`, `js框架`;

在内置对象`Function`原型上添加方法
> Function.prototype.fn1 = fucntion() {}

// 函数形式
> var f = function() {};
> f.fn1();

// 构造函数
> var f = new Function();
> f.fn1();

此种方法不被推荐，污染原生对象`Function`, 可抽象出一个 统一添加方法的 功能方法

````
// 在原型上挂载`addMethod`方法
Function.prototype.addMethod = function(name, fn) {
  this[name] = fn;
}

// 两种生成实例的方法，任选其一
var methods = function() {};
||
var methods = new Function();

methods.addMethod('fn1', function() {});
methods.addMethod('fn2', function() {});

methods.fn1();
methods.fn2();
````

## 1.10链式添加
````
// 在原型上挂载`addMethod`方法
Function.prototype.addMethod = function(name, fn) {
  this[name] = fn;
  return this;
}

// 顺便支持`链式调用`
var fn = function() {};
fn.addMethod('fn1', function() {
  return this;
}).addMethod('fn2', function() {
    return this;
  })

fn.fn1().fn2();
````

## 1.11 类式调用
````
// 在原型上挂载`addMethod`方法
Function.prototype.addMethod = function(name, fn) {
  this.prototype[name] = fn;
  return this;
}

// 顺便支持`链式调用`
var fn = function() {};
fn.addMethod('fn1', function() {
  return this;
}).addMethod('fn2', function() {
    return this;
  })

// 调用时需要注意
var fns = new fn();
fns.fn1();
````

## **总结:** 
JS是一种`灵活`的语言, `函数`扮演一等公民。使用JS可以编写出更多`优雅的艺术代码`。

**忆之获:** 函数 多样化 创建/使用. `灵活性`是语言特有气质。团队开发慎重，尽量保证团队代码风格一致。易开发、可维护、代码规范必然要求。

**问答:**

+ **问： [1.5真假对象](#1.5真假对象) 一节中如何实现方法链式调用?**\
  答：
  ````
  var fnObj = function() {
    return {
      fn1: function() {
        return this;
      },
      fn2: () => {
        return this;
      }
    }
  }

  var fn = fnObj();
  fn.fn1().fn2();
  ````

+ **问：试定义一个可为函数添加多方法的`addMethod`方法。**\
  答：参考[1.10链式添加](#1.10链式添加)

  **方式一**
  ````
  // 在原型上挂载`addMethod`方法
  Function.prototype.addMethod = function(name, fn) {
    this[name] = fn;
    return this;
  }

  // 顺便支持`链式调用`
  var fn = function() {};
  fn.addMethod('fn1', function() {
    return this;
  }).addMethod('fn2', function() {
      return this;
    })

  fn.fn1().fn2();
  ````

  **方式二**
  ````
  // 定义 参数类型 接口
  interface opt = {
    fnName: string,
    fn: function
  }

  // 支持 一次性 创建多个方法
  Function.prototype.addMethod = function(options: opt[]) {
    for(obj of options) {
      this[obj.fnName] = obj.fn;
    }
    trturn this;
  }

  var methods = [
    {
      fnName: 'fn1',
      fn: function() {}
    },
    {
      fnName: 'fn2',
      fn: () => {}
    }
    ...
  ]

  var '自定义Fn' = function() {};

  '自定义Fn'.addMethod(methods);
  ````

+ **问：试定义一个既可为函数添加多方法,又可为原型添加方法的`addMethod`方法。**\
  答：
  ````
  // 定义 参数类型 接口
  interface opt = {
    fnName: string,
    fn: function
  }

  // 支持 一次性 创建多个方法
  Function.prototype.addMethod = function(options: opt[], proto: string) {
    if(proto === "prototype") {
      for(obj of options) {
        this.protype[obj.fnName] = obj.fn;
      }
    } else {
      for(obj of options) {
        this[obj.fnName] = obj.fn;
      }
    }
    trturn this;
  }
  ````

# **第二章 面向对象编程**

## 2.1 `面向对象` `面向过程`
面向对象编程 就是 将 需求 抽象成一个对象, 针对对象分析 特征(属性) / 动作(方法). 这个对象称为`类`.

**核心思想：**`封装` `继承` `多继承` `多态`

## 2.2 包装明星--封装

### 2.2.1 创建一个类
首先声明一个函数，保存在一个变量里. 按编程习惯，将类名首字母大写.
然后在函数(类)内部通过对`this`(函数内部自带变量，用于指向当前对象)变量添加 属性/方法，实现对类添加`属性/方法`
````
var Book = function(id, bookName, price) {
  this.id = id;
  this.bookName = bookName;
  this.price = price;
}
````

也可通过`类`的原型(类本身也是对象，所以也有原型`prototype`)上添加`属性/方法`.\
两种方式：

①为原型对象属性赋值
````
Book.prototype.show = function() {};
````

②将一个对象赋值给类的原型对象.
````
Book.prototype = {
  show: function() {},
  fn2: function() {},
}
````
两种模式不能混用

使用时需要`new`关键字，实例化(创建)新对象.

**关于对实例方法和原型方法解释：**
通过`this`添加的`方法/属性`，是在当前对象上添加的\
JS是一种基于`prototype`原型的语言, 每创建一个对象(函数也是一种对象),都有一个prototype原型用于指向 其继承的 属性/方法. 通过prototype继承方法非对象自身所有，需要通过prototype逐级查找。
通过`this`定义的`方法/属性`，是对象自身拥有, 每次通过`类`创建新对象实例时，都会复制`类`本身方法、属性\
prototype上方法/属性是继承来,状态共享, 不会被多次创建。

### 2.2.2 属性与方法封装
理解：
1. 通过JS函数作用域 实现 函数内部创建
面向对象思想:

 `属性/方法` 的 隐藏、暴露, `私有属性/私有方法、公有属性/公有方法、保护属性/保护方法`

JS通过`函数作用域`实现`私有属性/私有方法`;

`this`创建`公有属性/公有方法`, 通过`this`创建的公有方法，可以访问`类(创建时)||对象`的`私有属性/私有方法`, 由于这些方法权利比较大, 又称为`特权方法`;
````
// 私有属性/私有方法, 特权方法, 对象公有属性/对象公有方法, 构造器
var Book = fucntion(id, name, price) {
  // 私有属性
  var num = 1;
  // 私有方法
  function checkId() {};
  
  // 特权方法
  this.getName = function() {};
  this.getPrice = function() {};
  this.setName = function() {};
  this.setPrice = function() {};

  // 对象公有属性
  this.id = id;
  // 对象公有方法
  this.copy = function() {};

  // 构造器
  this.setName(name);
  this.setPrice(price);
}
````
理解：
1. 通过JS`函数作用域`特征，来实现 函数内部创建 外部无法访问的`私有变量/私有方法`
2. 通过`new`关键字，实例化对象时，会对`类`执行一次，所以`类`内部`this`上定义的`属性/方法`自然可复制到 新创建对象上，成为 `对象公有属性/公有方法` 
3. 其中一些方法能访问到 `类`的`私有属性/私有方法`, 比外界权利大，得名`特权方法`
4. 通过`new`关键字 实例化对象 时，执行了一遍`类`的函数，里面通过调用`特权方法`，初始化对象的一些属性。
5. `类`外部通过 点语法 定义 属性/方法: 通过`new`关键字创建新对象时，由于`类`外面通过 点语法 定义的`属性/方法`没有执行到，所以 `新创建对象中无法获取`，但可通过`类`来使用，因此在类外面通过 点语法 定义的 属性/方法 被称为 `类的静态公有属性/静态公有方法`
6. `类`通过`prototype`创建的`属性/方法`在`类实例对象`中可通过this访问(新创建对象_proto_指向类的原型所指向的对象), 所以将`prototype`对象中`属性/方法`称为`公有属性/公有方法`

````
// 类静态公有属性(实例对象不能访问)
Book.isChinese = true;
// 类静态公有方法(实例对象不能访问)
Book.fn1 = function(){};

Book.prototype = {
  // 公有属性
  isBook: false,
  // 公有方法
  fn2: function() {}
}
````

通过`new`关键字创建的对象 **实质** 是对 新对象`this`的不断赋值，并将prototype指向 类的prototype 所指向的对象。

类的构造函数 外，通过点语法定义的属性/方法 是不会添加到 新创建 对象上去的。

想要在新创建对象中使用静态公有属性，得通过 类本身，不能通过this。

类的原型上定义的属性在 新对象里 可直接使用，因为 新对象 prototype和 类 的 prototype 指向同一对象

类私有属性 和 静态方法 在 实例对象中访问不到

公有属性在实例对象中可通过 点语法 访问到

### 2.2.3 闭包实现
类的静态变量 通过闭包实现

### 2.2.4 创建对象的安全模式
````
// 创建一个图书类
var Book = function(title, time, type) {
  this.title = title;
  this.time = time;
  this.type = type;
}

// 实例化一本书
var book1 = Book('js', '2018', 'js')

console.log(book); // undefined

console.log(window.title);  // js
console.log(window.time);   // 2018
console.log(window.type);   // js
````
总结：
1. new关键字作用 可看做 对当前对象 this 不停赋值，例中 没有用new, 直接执行函数在全局作用域，this指向 全局变量window;
2. 变量book 最终作用 得到Book类(函数)执行结果, 函数没有return语句, 变量book 得不到 Book类 的返回值, 遂为 undefined

**安全模式 || 检察长模式**
````
var Book = function(title, time, type) {
  // 判断执行过程中 this 是否为 当前对象(为true说明是用 new关键字 创建)
  if(this instanceof Book){
    this.title = title;
    this.time = time;
    this.type = type;
  } else {
    // 否则重新创建对象并返回
    return new Book(title, time, type);
  }
}
````
总结：
每个类有 3部分
1. 第一部分是构造函数内，供实例化对象复制
2. 第二部分是构造函数外，直接通过点语法添加，供类直接使用，实例化对象访问不到
3. 第三部分是类的原型中，实例化对象可通过原型链间接访问，为所有实例化对象共用

## 2.3 继承

### 2.3.1 子类原型对象--类式继承
**类式继承**
````
// 声明父类
function SuperClass() {
  this.superValue = true;
};

// 为父类添加公有方法
SuperClass.prototype.getSuperValue = function() {
  return this.superValue;
};

// 声明子类
function SubClass() {
  this.subValue = false;
}

// 继承父类
SubClass.prototype = new SuperClass();
// 先继承，再为子类添加公有方法
SubClass.prototype.getSubValue = function() {
  return this.subValue;
}

// 以上 类似`封装`的过程
````
总结：
类式继承 需要将 第一个类的实例 赋值给 第二个 类的原型\
类的原型对象 作用是 为类的原型添加公有方法，类不能直接访问原型中的`属性/方法`，必须通过 原型prototype 来访问。\
实例化一个父类时，新创建对象复制了父类构造函数内 属性/方法， 并且将 原型_proto_ 指向父类原型对象， 如此便拥有 父类 原型对象/构造函数 上 属性/方法，

**instanceof判断`对象`与`类`继承关系**\
`instanceof`通过判断对象`prototype链`来确定`对象`是否为`某类`实例，不关心`对象`与`类`自身结构
> console.log(obj instanceof Class); // true
> console.log(SubClass instanceof ParentClass); // false

instanceof 判断 前面对象是否为 后面 类(对象)实例，不表示两者的继承\
子类 继承 父类 时通过将 父类实例 赋值给 子类原型prototype, 子类原型 继承 父类 
> console.log(SubClass.prototype instanceof ParentClass); // true

所有`对象`都继承自`Object`原生对象构造函数
> console.log(allObj instanceof Object); // true

#### 类式继承缺点
1. `子类`通过`原型prototype`对`父类实例化`, 继承父类。


# 设计模式(慕课视频学习)
## 1-1 导学
+ 3年以上工作经验必考
+ 项目leader 设计架构能力是必要基础
+ 从写好代码到做好设计 必经之路

<!-- <h4><b></b></h4> -->
**困惑**
1. 学习资料 java 为主
2. 看懂就忘
3. 忙于框架、业务 很少接触底层

**课程概述**
+ 做什么: 讲解 JS 设计模式
+ 哪些部分: 面向对象、设计原则、设计模式
+ 技术: 面向对象、UML类图、ES6

**知识点介绍 & 课程安排**
+ 面向对象
  - ES6 class语法
  - 三要素
  - UML类图
  + 课程安排: 
    - webpack + babel 搭建 ES6 编译环境
    - ES6 class 面向对象语法介绍
    - 面向对象三要素 `封装 继承 多态`
+ 设计原则
  - 何为设计？
  - 5大设计原则
  - 从设计到模式
  + 课程安排: 
    - 通过《Linux/Unix设计哲学》理解何为设计
    - 5大设计原则 分析/理解 + 代码演示
    - "设计模式" -> 从 "设计" 到 "模式"
+ 设计模式
  - 分优先级讲解
  - 结合 ES6、Node 核心技术
  - 结合 框架应用
  + 课程安排: 
    - 针对23种设计模式 概述：创建型、结构型、行为型...
    - 常用、重点 设计模式 详细讲解，结合经典使用场景
    - 非常用 设计模式 理解概念，示例演示
    - 有主有次，掌握重点
+ 综合示例
  - 设计方案
  - 代码演示
  - 设计模式对应
  + 课程安排: 
    - 用 jQuery 实现简单购物车
    - 设计分析，画 UML 类图
    - 代码演示
    - 总结其中七种设计模式 如何 综合在一起使用

**讲授方式**
+ 先基础后实践，先`设计`后`模式`
+ 重点、常用 设计模式，配合经典使用场景
+ 综合示例，演示 设计模式 如何使用
+ 用JS讲解 面向对象 & 设计模式

**课程收获**
+ 面向对象思想，UML类图
+ 5大设计原则，23种设计模式
+ 应对前端面试相关面试题
+ 提升个人 设计能力

**学习前提**
+ 了解面向对象，熟练使用 JQuery 或类似工具库
+ ES6语法基础 用过 node + npm 
+ React | Vue

**重点提示**
+ 主讲 设计模式，不是实战项目 || 源码分析
+ 23种设计模式 分清主次
+ 设计模式在 Js 和 JAVA 讲解方式 有区别
+ 不适合小白
 

## 2-1 搭建开发环境
### 面向对象
**为何先讲面向对象**
1. 设计原则 是大众的\
  常用的23种设计模式 具体模式 都是基于 面向对象

2. JS弱类型 应先了解 面向对象

**搭建开发环境**
+ 初始化 npm 环境
  - $> npm init
+ 安装 webpack
  - cnpm i webpack webpack-cli --save
  - 创建 
    ```bash
    $> touch webpack.dev.config.js
    ```
  - 编辑`webpack.dev.config.js` 配置
    ```js
    module.exports = {
      entry: './src/index.js',  // 入口
      output: {                 // 出口
        path: __dirname,        // 出口路径
        filename: './release/bundle.js'   // 定义出口文件夹及文件 名称
      }
    }
    ```
  - 执行
    ```bash
    $> npm run dev
    ```
  
+ 安装 webpack-dev-server
  - cnpm i webpack-dev-server html-webpack-plugin --save-dev

+ 安装 babel

**什么是面向对象**

**UML类图**

**总结**

## 2-5 什么是面向对象
+ 概念
+ 三要素：封装 继承 多态
+ JS应用举例
+ 面向对象意义

### 概念
+ 类
  创建类，添加方法

+ 对象(实例)
  实例化

### 三要素
+ 继承 => 子类继承父类
+ 封装 => 属性|方法 的权限和保密
+ 多态 => 同一接口不同实现

## 2-7 面向对象-封装
+ public    完全开放 公共
+ protected 对自己和子类开放
+ private   仅对自己开放

> ES6 不支持 使用 TS编写
### 三要素
+ 减少耦合， 减少 暴露属性
+ 利于 数据、接口 权限管理
+ ES6约定 `_` 开头的属性是 `private`

## 2-8 面向对象-多态
+ 同一接口 不同表现
+ JS应用极少
+ 需结合JAVA等强面向对象语言的 接口 重写 重载 等语言特性

### 三要素
+ 保持子类的开放性和灵活性
+ 面相接口编程
+ JS引用极少 了解即可

## 2-9 面向对象-应用举例
+ JQuery 是一个 class
+ $('p') 是JQuery 一个实例
+ 工厂模式
```js
class JQuery {
  constructor(selector) {
    let slice = Array.prototype.slice;
    let dom = slice.call(document.querySelectorAll(selector))
    let len = dom ? dom.length : 0;
    for (let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len;
    this.selector = selector || ''
  }

  append(node) {}
  addClass(name) {}
  html(data) {}
  // more APIs
}

window.$ = function (selector) {
  return new JQuery(selector)
}
```

## 2-10 面向对象-总结
### 为何使用面向对象？
+ 存在价值？
+ 为何使用？
+ 程序执行: 顺序、判断、循环 —— 结构化
+ `goto` 属于例外
+ 面向对象 —— 数据结构化
+ 对于计算机 结构化才是最简单的
+ 编程应该 简单 & 抽象
+ 早期人类，没有设计出 计算机 是因为 他们的思维不够简单 —— 刘慈欣

### 总结
+ 概念 + Demo
+ 三要素：继承 封装 多态 + 演示
+ JQuery 应用实例
+ 意义: 数据结构化

## 2-11 UML类图1-介绍
+ 面向对象 必须学会画 UML类图
  ```ts
  const UML: string = 'Unified Modeling Language' // 统一建模语言
  ```
+ 类图 UML 包含很多种图，和本课相关的是 类图
+ 关系，主要讲 `泛化` & `关联`
+ 演示 代码 + 类图

### 工具
+ MS Office visio
  - 复杂
+ https://www.processon.com/
  - 在线简洁

### 类图
| 类名 |
| :---: |
| 属性 |
| + public 属性名A: 类型|
| # protected 属性名B: 类型|
| - private 属性名C: 类型|
| 方法 |
| + public 方法名A(参数1, 参数N): 返回值类型|
| # protected 方法名B(参数1, 参数N): 返回值类型|
| - private 方法名C(参数1, 参数N): 返回值类型|

## 2-12 UML类图2-关系
+ 泛化 => 继承 (空箭头)
+ 关联 => 引用 (实心箭头)

## 2-13 UML总结
作为 面向对象基本前置知识 UML原型类图，须在 开发前 通过UML类图 整理好程序逻辑！

+ 类图 属性 方法
+ 关系 泛化 关联
+ 示例演示 2-12
+ 后面学习设计模式, 会继续画 UML类图

### 面向对象 - 总结
+ 搭建开发环境: npm init | webpack | babel
  - ES6 开发环境搭建
+ 面向对象: 
  - 概念: 面向对象 类 { 属性 方法 } 实例 = new Class 
  - 三要素: 
    - 封装: 属性 和 方法 私有化
    - 继承: 抽取公共属性、方法 避免代码冗余, 增加复用
    - 多态: 一个接口不同实现
    - 应用举例: JQuery 工厂函数
    - 意义: 面向对象 把 数据结构化
  - UML类图: 类图 关系 示例

## 3-1 & 3-2 设计原则
分开来看待 `设计` & `模式`
先有`设计原则`再有`设计模式`
+ 何为设计
  - 描述
    1. 即按照哪一种思路或者标准来实现功能
    2. 功能相同, 可以有不同设计方案来实现
    3. 设计的作用伴随需求增加来体现
  - 结合《UNIX/LINUX设计哲学》
    1. 小即是美
    2. 每个程序只做好一件事
    3. 快速建立原型
    4. 可移植性 > 高效率
    5. 可读性 > 存储和执行效率
    6. 充分利用软件的杠杆效应(软件复用)
    7. 使用shell脚本提高杠杆效应和可移植性
    8. 避免强制性的用户界面
    9. 让每个程序都成为过滤器
  - 小准则
    1. 允许用户定制 配置
    2. 操作系统内核 小而轻量化 分离 解耦
    3. 使用小写字母并尽量简写 ls dir 
    4. 沉默是金
    5. 各本分之和 大于整体(大教堂 和 集市)
    6. 寻求 90% 的解决方案(满足绝大部分需求 小众大成本需求舍弃 没有完美)
  - 演示: 沉默是金 + 每个程序成为过滤器
+ 五大设计原则(solid)
+ 从设计到模式(设计和模式应分开)
  - 5种原则 23种模式
+ 介绍23种设计模式
+ 三种类型
  - 创建型
  - 组合型
  - 行为型

## 3-3 设计原则 - 何为设计2
**演示: 沉默是金 + 每个程序成为过滤器**

## 3-13 总结


## 4 工厂模式
### 介绍
+ 将`new`操作单独封装
+ 遇到`new` 考虑是否使用 `工厂模式`


### 演示 & 场景
```js
class Product {
  constructor(name) {
    this.name = name;
  }
  init() { alert(1) }
  fun1() { alert(2) }
  fun2() { alert(3) }
}

class Creator {
  create(name) {
    return new Product(name)
  }
}

// 测试
let creator = new Creator();
let p = creator.create('p1');
p.init();
p.fun1()
```

### 场景
+ JQuery - $('div')
+ React.createElement
+ vue 异步组件

### 总结
