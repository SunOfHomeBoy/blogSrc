---
title: 响应式布局JS事件
date: 2018-04-19 09:23:15
tags: 响应式
archives: 样式表
categories: JS
---
为解决屏幕分辨率问题，采用事件监听，动态修改 根节点 fontsize 
````
// getSize(解决rem布局)
(function(){
	getSize();
	window.addEventListener('resize',getSize);
	
	function getSize(){
		document.documentElement.style.fontSize 
		= document.documentElement.clientWidth/3.75/2+'px';
	}
})()
````