---
title: React学习笔记
date: 2018-09-05 17:45:25
tags: 
categories: 
---
## 第一步 实现功能模块
1. npm install antd --save-dev
2. import 'antd css style sheets'
3. 创建 模板
4. import {Menu, Table, Pagination} from 'antd';
5. 导出模板到 ./index.js
6. Router 注册； Nav 里面 添加 路由 link
Compelite

## 四大部分(`props` `state` `lifecircle` `context`)

## 组件构建三种方法
① React.createClass
````
const Button = React.createClass({
  // method/lifecircle
})
````
② ES6class

③ 无状态函数
无状态组件只传入`props`和`context`,不存在`state`.
`propsTyps`和`defaultProps` 可通过 向 方法 设置 静态属性

## 组件五种形式
[`容器`, `业务逻辑`, `取数据`, `布局(layout)`, `无状态组件`]

## 生命周期(lifecircle)
[参考文档](https://segmentfault.com/a/1190000004168886)
**初始化:** 
````
constructor
componentWillMount
+ render()
componentDidMount
````

**周期改变:**(`props/state` 改变时 触发)
````
componentWillReceiveProps(nextProps) {
  <!-- 当组件可能接收到`新道具`时调用。即使道具没有改变，你也可以这样称呼它，所以如果你只想处理改变，一定要比较新的和现有的道具。 -->
  <!-- 调用组件setstate通常不会触发这种方法。 -->
}
shouldComponentUpdate(nextProps, nextState) 
componentWillUpdata() {
  <!-- willUpdata 下 设置 setState 会触发 componentReceiveProps -->
}
+ render()
componentDidUpdata
````

**组件销毁:**
````
componentDis
````

## 单向数据流
被动接收 => 数据流逻辑

## 无状态组件如何避免`重绘(reflow)`/`重排版(repaint)`

## React 路由跳转
````
  this.props.history.push('/login')
````

## React.Children.map渲染对象
````
{
    React.Children.map(children, (child) => {
        return <Fragment>{child}</Fragment>
    })
}
````

## React-router 去掉url上的#
````
import {browserHistory} from 'react-router'
<Router history={browserHistory}>
...
</Router>
````

