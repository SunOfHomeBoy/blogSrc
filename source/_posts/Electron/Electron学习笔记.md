---
title: Electron学习笔记
date: 2018-05-26 18:07:20
tags: Electron学习笔记
categories: Electron
---
## Electron API DEMOS 学习笔记

### 第一章 WINDOWS
#### 第一节 Create and Manage Windows
创建新窗口，并管理现有窗口

每个浏览器窗口都是一个单独的进程，称为`renderer`进程。这个过程，像控制应用程序生命周期的主要过程一样，可以完全访问该 Node.js API。

##### 1.1 Create a new window(创建新窗口)
`BrowserWindow`模块提供了在应用程序中创建新窗口的能力。主进程模块可以通过远程模块从呈现程序中使用，如图所示。
