---
title: CSS-reset-scssMixin
date: 2019-10-21 14:41:05
tags:
categories: CSS
---
## reset.css
```css
/*
* @Author: LiShiChen
* @Date:   2016-02-22 16:54:49
* @Last Modified by:   wangc
* @Last Modified time: 2018-06-01 17:44:19
* @Email: 903317164@qq.com
* @File Path: /Users/LiShiChen/node/gitlab/tueasy/tueasy5/FE/src/container/App/reset.css
* @File Name: reset.css
* @Descript 重置浏览器默认设置
*/

* {
  margin: 0;
  padding: 0;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
}

input, textarea {
	user-select: text;
	-moz-user-select: text;
	-webkit-user-select: text;
	-ms-user-select: text;
}
html {
	color: #53585f;
	height: 100%;
}
html, input, textarea {
	color: #53585f;
}
body {

	overflow: hidden;
	height: 100%;
	font-family: 'Microsoft YaHei';
}
body, td, th {
	font-size: 13px;
	font-family: "Hiragino Sans GB","Hiragino Sans GB W3","WenQuanYi Micro Hei","Helvetica Neue",Helvetica,Arial,sans-serif;
}
body, div, dl, dt, dd, ul, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, blockquote, table, iframe, p, img {
	padding: 0;
	margin: 0;
}
article, section, hgroup, header, footer, nav {
	display: block;
}
div, p {
	display: block;
}
img {
	border: none;
}
ul, ol, dl {
	list-style: none;
}
fieldset, img {
	border: 0;
}
button {
	cursor: pointer;
}
textarea {
	resize: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
address, caption, cite, code, dfn, em, th, var, optgroup {
	font-style: normal;
	font-weight: normal;
}
input, button, textarea, select, optgroup, option {
	font-family: inherit;
	font-size: inherit;
	font-style: inherit;
	font-weight: inherit;
}
a {
	color: #ed4441;
	text-decoration: none;
}
a:link {
	text-decoration: none;
}
a:visited, a:hover {
	cursor: pointer;
}
a:active, a:focus {
	outline: 0;
}
input, button, textarea {
	border: none;
	outline: none;
}
input[type="text"]:focus, input[type="password"]:focus, textarea:focus {
	outline: 0 none;
}
input::-ms-clear {
	display: none;
}
input::-ms-reveal {
	display: none;
}
.clearfix:after {
	clear: both;
	content: "";
	display: block;
	height: 0;
	visibility: hidden;
}
.clearfix {
	display: inline-block;
}
* + html .clearfix {
	height: 1%;
}
.clearfix {
	display: block;
}
.clearfloat {
	display: inline-block;
}
h2, h3, h4, h5 {
	font-weight: normal;
}
h1 {
	font-size: 20px;
}
h2 {
	font-size: 16px;
}
h3 {
	font-size: 16px;
}
h4 {
	font-size: 14px;
}
h5 {
	font-size: 13px;
}
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
	background-color: none;
}

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
	color: #ccc;
}
input:-moz-placeholder, textarea:-moz-placeholder {
	color: #ccc;
}
input::-moz-placeholder, textarea::-moz-placeholder {
	color: #ccc;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
	color: #ccc;
}

::-webkit-scrollbar {
    min-width: 1px;
    min-height: 1px;
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    width: 3px;
    height: auto;
    border-radius: 5px;
    background: #edeff1;
    padding: 0 2px;
}
::-webkit-scrollbar-thumb {
    width: 6px;
    border-radius: 5px;
    background: #000d30;
}

input.regular[readonly] {
    padding: .25em .5em;
    background-color: #f6f6f6;
    border: 0;
    color: rgba(39,54,78,.4);
}
textarea.regular[readonly] {
    padding: .25em .5em;
    background-color: #f6f6f6;
    border: 0;
    color: rgba(39,54,78,.4);
}

```

## MIXIN.scss
```scss
/*
* @Author: lishichen
* @Date:   2019年5月21日 
* @Last Modified by:   lishichen
* @Last Modified time: 2019年5月21日 
* @Email: lishichen@hiynn.com
* @Descript: 
*/

/* 样式重置 */
* {
  margin: 0;
  padding: 0;
  user-select: none;
}

input,
textarea {
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
}

/** 全局变量 */
// 字体颜色
$fontColor: #0ff;

/** 依赖的定位 */
@mixin all-position($p, $t: null, $r: null, $b: null, $l: null) {
  position: $p;
  top: $t;
  right: $r;
  bottom: $b;
  left: $l;
}

/** 
 * @param {Number} $w 元素宽度 
 * @param {Number} $h 元素高度 
 * @param {String} $bgUrl 引用图片路径 
 * @param {Number} $bgSize 引用图片尺寸 
 * @param {Number} $marginTop 元素margin-top值 
*/
@mixin itemStyle($w, $h, $bgUrl, $bgSize: 100%, $marginTop: 0) {
  width: $w;
  height: $h;
  margin-top: $marginTop;
  background: $bgUrl center;
  background-size: $bgSize;
}

/** 
 * @param {Number} $w 元素宽度 
 * @param {Number} $h 元素高度 
 * @param {String} $bgUrl 引用图片路径 
 * @param {Number} $bgSize 引用图片尺寸 
 * @param {Number} $marginTop 元素margin-top值 
*/
@mixin title($w, $h, $c, $fontSize, $lineH, $url, $bgS: 100% 100%) {
  width: $w;
  height: $h;
  color: $c;
  font-size: $fontSize;
  line-height: $lineH;
  text-align: center;
  background: url($url) no-repeat;
  background-size: $bgS;
}
```

使用方式
```scss
element-Select {
	@include title(1006px, 40px, #fff, 18px, 40px, "~img/Content/BGBar1.png");
	@include all-position(absolute, $t: 17px, $l: 17px);
}
```