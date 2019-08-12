---
title: Echarts地图踩坑
date: 2019-05-10 10:31:44
tags: 地图
categories: Echarts
---
# GeoJSON
github 资源

# 引入 Echarts
需要包含`map`类型

# 按照官网实例 尝试
echarts成功渲染，但是 没有 地图边界 画线

```tsx
  echarts.registerMap('liuzhou', geoJson);

  let option = {
    ...
    geo: {
      map: 'liuzhou' // 必须与 注册地图 同名
    }
  }
```

## 如果自己写的有问题，一定先拿官方的例子跑一下

