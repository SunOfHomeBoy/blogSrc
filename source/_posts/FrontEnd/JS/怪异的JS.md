---
title: 怪异的JS系列
date: 2018-05-05 17:50:36
tags: JS特殊情况判断
archives: JS特殊情况
categories: JS
---
# [怪异的JavaScript系列(一)](https://juejin.im/post/5ade89db6fb9a07aab297b15)
## [ ]等于![ ]
    [] == ![] // -> true

**相等(==)判断操作会将两边的类型都转换为数字(number)，然后再比较。**

因为`[]`和`![]`都会转换为`0`。我们可以理解`[]`是一个`数组`，只不过`为空`而已，那么为`true`。右侧`![]`则为`false`。`false`然后转换为数字`0`。`左侧[]`直接`转`换为`数字`，因为`空数组`会转换`为0`，所以尽管我们认为[]为true，这里却变成了0。
简算过程:
````
+[] == +![]
0 == +false
0 == 0
true
````

## true 是 false
    !!'false' ==  !!'true'  // -> true
    !!'false' === !!'true' // -> true

**true是一个真值，用1表示；`字符串的“true”则为NaN`。**

    true == 'true'    // -> false
    false == 'false'  // -> false

**'false'是一个有意义的字符串。**

## baNaNa
    'b' + 'a' ++ 'a' + 'a' // -> baNaNa

**这是一个旧笑话，不过改进过的。原始的长这样：**

    'foo' ++ 'bar' // -> 'fooNaN'

该表达式以`'foo' + (+'bar')`的形式计算，因为`bar不是数字`，所以转换为`NaN`。    

## NaN不等于NaN
    NaN === NaN // -> false

根据 === 的算法，我们可以容易理解为什么为false。

## fail
    (![]+[])[+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]] // -> fail

如果我们仔细观察序列的规律，会发现下面的模式出现很多次：

    (![]+[]) // -> 'false'
    ![]      // -> false    

因此，我们尝试将`[]`和`false`相加。但是根据内部一些列函数的计算(binary + Operator -> ToPrimitive -> [[DefaultValue]])，右侧的[]最终转换为string：

    (![]+[].toString()) // 'false'

对于一个字符串，我们就可以通过下标来获取对应的字符：
    
    'false'[0] // -> 'f'        

剩下的都很直观，除了`i`很取巧。`fail`中的`i`是通过在`falseundefined`中获取第十个下标对应的字符而得到。    

## [ ]包含值，但不是true

## null不等于false

## `document.all`是一个对象，不过是 undefined
**⚠️这个是前端浏览器API，在Nodejs环境无法使用。**

尽管`document.all`可以返回一个像`数组一样的对象`，可以用来`访问DOM节点`。但是呢，通过`typeof`查看`document.all`，你会惊讶地发现类型是`undefined`。

    document.all instanceof Object // -> true
    typeof document.all // -> 'undefined'

而且，`document.all`并不等于`undefined`。

    document.all === undefined // -> false
    document.all === null // -> false

而且，更惊讶的是：

    document.all == null // -> true

`document.all`是一个过去常用的`获取DOM元素`的方法，特别是老版本的IE。但是`从未进入标准`，尽管广泛使用在过去的JS代码中。当`新的API`突出来(比如`document.getElementById`)后，`document.all`就被`淘汰`了。标准委员会不知道怎么处理它。可是因为它已经被广泛使用，所以委员会觉得保留它，但是违背了`JavaScript`的规范。

## 最小值比0还大
`Number.MIN_VALUE`是最小的数，但是它比`0`还大。
    
    Number.MIN_VALUE > 0 // -> true

因为`Number.MIN_VALUE`是`5e-324`。也就是说即使`最小的值`也可以用`浮点数`表示出来，虽然`离0很接近`，但是`依然比0大`。其实最小的数是`Number.NEGATIVE_INFINITY`，尽管它`不是一个实际存在`的数。
