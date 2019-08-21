---
title: TS-VUE-Watch属性
date: 2018-05-24 18:23:12
tags: TSX-Watch
categories: TSX-VUE-Watch
---
## vue的Watch在tsx中用法
### [转：vue + typescript 项目起手式](https://segmentfault.com/a/1190000011744210)

[vue-property-decorator:官方文档](https://github.com/kaorun343/vue-property-decorator)
````
import { Component, Prop, Provide, Watch } from 'vue-property-decorator'

@Watch('$route', { immediate: true, deep: true })
on$routeChanged(val: any, oldVal: any) {
        this.cardList()
}
````