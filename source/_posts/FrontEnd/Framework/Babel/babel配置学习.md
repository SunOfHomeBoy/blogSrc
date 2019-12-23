---
title: babel配置学习
date: 2019-12-13 16:26:47
tags: babel 配置 configuration
categories: Babel
---
## [babel用法](https://www.cnblogs.com/jiebba/p/9613248.html)

---

## babel报错-Error: Cannot find module '@babel/core' 
```bash
Error:
// webpack
Cannot find module '@babel/core'
```
babel 报错 主要和 `babel-loader`版本有关

解决办法：
1. 升级版本
```bash 
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

修改 `.babelrc` 配置
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": []
}
```

2. 降级版本
安装`babel-loader@7`版本
```bash
npm install -D babel-loader@7 babel-core babel-preset-env
```

[参考文档1](https://www.cnblogs.com/soyxiaobi/p/9554565.html) | 
[参考文档2](https://www.jianshu.com/p/7d26443001b9) |
[npm_babel-loader](https://www.npmjs.com/package/babel-loader) 

