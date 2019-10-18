---
title: 'CSS-自定义Input[type=radio]样式'
date: 2019-09-12 10:32:06
tags: Input radio
categories: HTML+CSS
---
[伪类 :checkbox 实现](https://www.cnblogs.com/xinjie-just/p/5911086.html)

```html
<div class="female">
    <input type="radio" id="female" name="sex" />
    <label for="female">女</label>
</div>
<div class="male">                
    <input type="radio" id="male" name="sex" />
    <label for="male">男</label>
</div>
```

```css
/* 未选中 */
input[type="radio"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    box-sizing: border-box;
    width: 1em;
    height: 1em;
    margin-right: .4em;
    font-size: 18px;
    line-height: 1; 
    text-indent: .15em;
    vertical-align: middle;
    border-radius: 50%;
    border: 1px solid #01cd78;
}

/* 选中 */
input[type="radio"]:checked + label::before {
    background-color: #01cd78;
    background-clip: content-box;
    padding: .2em;
}

/* 隐藏原来选中框 */
input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}
```
隐藏原来的单选按钮时，如果使用 `display: none;`，那样会把它从键盘 tab 键切换焦点的队列中完全删除。

于是可采用剪切的方式，让剪切后的尺寸为零，这样就隐藏了原来的单选按钮。