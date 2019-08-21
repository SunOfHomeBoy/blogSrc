---
title: Node.js--process模块
date: 2018-05-10 09:37:05
tags: process
categories: Node
---
## [转][Node.js的process模块](http://www.css88.com/archives/4548)

`process`模块用来与`当前进程互动`，可以 `通过全局变量process` 访问，不必使用require命令加载。它是一个`EventEmitter`对象的实例。

### 一、属性
process对象提供一系列属性，用于返回系统信息。

+ process.pid：当前进程的进程号。

+ process.version：Node的版本，比如v0.10.18。

+ process.platform：当前系统平台，比如Linux。

+ process.title：默认值为“node”，可以自定义该值。

+ process.argv：当前进程的命令行参数数组。

+ process.env：指向当前`shell`的环境变量，比如`process.env.HOME`。

+ process.execPath：运行当前进程的可执行文件的绝对路径。

+ process.stdout：指向标准输出。

+ process.stdin：指向标准输入。

+ process.stderr：指向标准错误。

#### 主要属性介绍
**1. stdout**\
`process.stdout`用来控制标准输出，也就是在命令行窗口向用户显示内容。它的write方法等同于console.log。
````
exports.log = function() {
    process.stdout.write(format.apply(this, arguments) + '\n');
};
````

**2. argv**

`process.argv` 返回`命令行脚本`的 各个参数 组成的数组。

先新建一个脚本文件 argv.js。
````
// argv.js
 
console.log("argv: ",process.argv);
console.log("argc: ",process.argc);
````

在命令行下调用这个脚本，会得到以下结果。
````
> node argv.js a b c

# [ 'node', '/path/to/argv.js', 'a', 'b', 'c' ]
````

上面代码表示，argv返回数组的成员依次是命令行的各个部分。要得到真正的参数部分，可以把argv.js改写成下面这样。
````
// argv.js
 
var myArgs = process.argv.slice(2);
console.log(myArgs);
````

### 二、方法

`process`对象提供以下方法：

+ `process.exit()`：退出当前进程。
+ `process.cwd()`：返回运行当前脚本的工作目录的路径。_
+ `process.chdir()`：改变工作目录。
+ `process.nextTick()`：将一个回调函数放在下次事件循环的顶部。

**1. `process.chdir()` 改变工作目录的例子:**
````
process.cwd()
# '/home/aaa'
 
process.chdir('/home/bbb')
 
process.cwd()
# '/home/bbb'
````

**2. `process.nextTick()` 指定下次事件循环首先运行的任务:**
````
process.nextTick(function () {
    console.log('Next event loop!');
});
````

上面代码可以用`setTimeout`改写，但是`nextTick`的`效率`更高、`描述`更准确。
````
setTimeout(function () {
    console.log('Next event loop!');
}, 0)
````

### 三、事件
**1. exit事件**

`当前进程退出`时，会触发`exit事件`，可以对该事件指定`回调函数`。

这是一个用来 `定时检查模块状态` 的好`钩子(hook)`(例如单元测试), 当主事件循环在执行完`'exit'`的回调函数后将不再执行,所以在`exit事件`中定义的定时器可能不会被加入事件列表.
````
process.on('exit', function () {
    fs.writeFileSync('/tmp/myfile', 'This MUST be saved on exit.');
});
````

**2. uncaughtException事件**

当前`进程抛出`一个没有被捕捉的意外时，会触发uncaughtException事件。

````
process.on('uncaughtException', function (err) {
    console.error('An uncaught error occurred!');
    console.error(err.stack);
});
````

-----------------
[阅读原文](http://www.css88.com/archives/4548)