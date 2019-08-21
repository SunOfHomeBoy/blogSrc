---
title: CSS日常
date: 2018-08-02 14:48:51
tags: CSS日常发现
categories: CSS
---
## background

### 关于 `background-size` 无效
`b-size` 必须写在 `b:url()` 后面，否则不会生效
```` 
background: url() no-repeat center center;  

background-size: 100% 100%;
````