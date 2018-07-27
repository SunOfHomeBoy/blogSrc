---
title: React-02
date: 2017-09-14 22:51:40
tags: React
archives: 前端
categories: 前端
---
React作用：提供jsx的语法糖支持和Component的功能
ReactDom作用：渲染虚拟Dom和控制桌面内容
ReactDom.render(){渲染虚拟Dom,Element元素}

核心概念：组件化！
组件：创建一个构造函数，使用ES6语法。
````
class App extends Component{
  constructor(){  //（ES6提供方法）
    和 super()结合使用,来继承Compoent的方法
    引入护法 state 状态（数据驱动视图）
    //所有初始化属性都会存放在state
    this.state={
      count:0;
    }
  }
  xxx(){//其他自定义事件}
  '{}'在任何地方都能插值
  render(){   //（React提供方法）
    *React插入事件的方法
    '{}'大括号的用法
    <button onClick={this.clickHandler}>点我</button>
  }
  //React里面function的=>(箭头函数)写法能改变this的指向（如果用function会打印出window对象而不是App对象），call()和bind()也可以绑定this
  // 在React中 修改state 不能直接修改 必须通过调用 this.setState()当前组建提供方法
  // 数据驱动视图，当修改state的时候，数据修改如何驱动的视图？当每修改一次state后，render()方法会重新再走一次
}
````
01.19分分析state和生命周期的匹配与使用

小心this的指向！

09-14 02 29分 :
插值数组


