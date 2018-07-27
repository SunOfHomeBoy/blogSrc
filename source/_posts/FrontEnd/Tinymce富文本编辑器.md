---
title: Tinymce富文本编辑器
date: 2018-07-18 14:26:06
tags: 富文本
categories: Tinymce
---
## [富文本编辑器tinymce获取文本内容和设置文本内容](https://blog.csdn.net/u012679583/article/details/50505842)

1、如果当前页面只有一个编辑器： 

获取内容：`tinyMCE.activeEditor.getContent()` 

设置内容：`tinyMCE.activeEditor.setContent(“需要设置的编辑器内容”)`

2、如果当前页面有多个编辑器（下面的“[0]”表示第一个编辑器，以此类推）： 

获取内容：`tinyMCE.editors[0].getContent()`

设置内容：`tinyMCE.editors[0].setContent(“需要设置的编辑器内容”)`

3、获取不带HTML标记的纯文本内容： 
````
var activeEditor = tinymce.activeEditor; 

var editBody = activeEditor.getBody(); 

activeEditor.selection.select(editBody); 

var text = activeEditor.selection.getContent( { ‘format’ : ‘text’ } );
````
取到的 text 即为纯文本内容。// 一般不需要，因为如果只取纯文本，没必要用富文本编辑器