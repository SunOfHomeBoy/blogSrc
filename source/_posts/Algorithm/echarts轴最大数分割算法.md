---
title: echarts轴最大数分割算法
date: 2018-12-29 11:45:00
tags:
categories: Algorithm
---
## 最大值 以及 分割数 计算
````
// echarts 支持callback函数
max: ({ max, min }) => {
  /** 判断最大值的长度 减一是因为 两位数只用 除10 即可，即保留十位上的为整数，以此类推 */
  let maxLen = max.toString().length - 1;

  /** 取平方 */
  let pow = Math.pow(10, maxLen)
  let pow2 = Number(`10e${max.toString().length - 1}`)

  // 取整
  let ceilMax = Math.ceil(max / pow) * pow;
  this.state.max = ceilMax;
  this.state.min = min;
  return ceilMax
},

// 不支持 callback，可以 通过 state缓存 max 函数 中最大值计算
interval: (() => this.state.max / 5)(),
````
