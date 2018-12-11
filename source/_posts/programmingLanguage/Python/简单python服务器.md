---
title: 简单python服务器
date: 2018-06-08 15:44:31
tags: python SimpleHTTPServer
categories: Python 
---
## Python 2.7.14 SimpleHTTPServer
````
python -m SimpleHTTPServer 8000
````

这里的“Web服务器模块”有如下三种：

`BaseHTTPServer`: 提供基本的Web服务和处理器类，分别是HTTPServer和BaseHTTPRequestHandler。

`SimpleHTTPServer`: 包含执行GET和HEAD请求的SimpleHTTPRequestHandler类。

`CGIHTTPServer`: 包含处理POST请求和执行CGIHTTPRequestHandler类。