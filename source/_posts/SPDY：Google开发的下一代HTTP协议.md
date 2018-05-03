---
title: SPDY：Google开发的下一代HTTP协议
date: 2018-05-03 14:46:47
tags: SPDY
archives: HTTP协议
categories: HTTP
---
# [SPDY(发音同"speedy")：Google开发的下一代HTTP协议](http://josh-persistence.iteye.com/blog/2200727)

（解决HTTP协议的缺点,Wrapper模式）

概述

SPDY是Google宣布正在开发的下一代网络协议，SPDY并不是一种用于替代HTTP的协议，而是对HTTP协议的增强。HTTP自上世纪90年代问世以来，已有二十年的历史，期间互联网本身发生了很大的变化，也使得HTTP的许多不足暴露了出来，现在它已经不能满足许多web app的要求。Google表示，引入SPDY协议后，在实验室测试中页面加载速度比原先快64%，并且目前已经在Gmail等应用中使用。目前业界支持SPDY的服务器有Netty和Nginx(将要支持)。Nginx 官方发布下一个版本 1.3.0 的路线图，该版本将支持 Google SPDY。