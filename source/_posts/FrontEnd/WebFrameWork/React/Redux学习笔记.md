---
title: Redux学习笔记
date: 2018-09-05 16:44:43
tags: Redux
categories: Redux
---
## dispatch
````
function (action) {
  if (sagaMonitor && sagaMonitor.actionDispatched) {
    sagaMonitor.actionDispatched(action);
  }
  var result = next(action); // hit reducers
  sagaEmitter.emit(action);
  return result;
};
````

## 项目中学习Redux
记录在脚手架学习Demo中尝试使用Redux的过程。

1. 
2. 定义
3. Action中创建`AppRedux`文件夹, 创建`action.AppRedux.type.js` \
内容如下：
> export const APP_REDUX = "APP_REDUX";
4. 在`Action`文件夹下`index`中引入 需要抛出的变量
> import {APP_REDUX} from './AppRedux/action.appRedux.type';
5. 定义 一个 `Reducer` `APP_REDUX`, 并引入 action 变量 type
6. 每次程序 dispatch 一个 action，所有 reducer 都会在当前reducer中通过 switch 语句 判断 action 是否 触发本状态
7.
````
import { combineReducers } from 'redux';

// 所有 reducer 通过 `combineReducers({...Reducers})`方法 
````


