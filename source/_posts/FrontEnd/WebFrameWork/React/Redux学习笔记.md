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