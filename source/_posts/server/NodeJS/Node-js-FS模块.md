---
title: FS模块
date: 2018-07-05 14:47:46
tags: FileSystem
categories: Node FS
---
## [Node.js fs模块(文件模块) 创建、删除目录(文件) 读取写入文件流](https://blog.csdn.net/houyanhua1/article/details/79443987)

````
/* 
 1. fs.stat  检测是文件还是目录(目录 文件是否存在) 
 2. fs.mkdir  创建目录 （创建之前先判断是否存在） 
 3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录) 
 4. fs.appendFile 写入追加文件 
 5. fs.readFile 读取文件 
 6. fs.readdir 读取目录 
 7. fs.rename 重命名 
 8. fs.rmdir  删除目录 
 9. fs.unlink 删除文件 
 10. fs.createReadStream('') 从文件流中读取数据
 11. fs.createWriteStream  写入文件流
 12. pipe 管道流 
 13. fs.access 判断目录、文件是否存在(读写权限)
*/
 
var fs=require('fs');   //fs是node.js的核心模块，不用下载安装，可以直接引入  
 
//1. fs.stat  检测是文件还是目录  fs.statSync()同步获取stats对象,通过返回值接收。
fs.stat('html',function(error,stats){
    if(error){
        console.log(error);
        return false;
    }
    console.log('文件：'+stats.isFile());
    console.log('目录：'+stats.isDirectory());
})
 
 
//2. fs.mkdir  创建目录  
fs.mkdir('css',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.log('创建目录成功');
})
 
 
//3. fs.writeFile  写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略  
fs.writeFile('123.txt','你好nodejs 覆盖','utf8',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.log('写入成功');
})
 
 
//4. fs.appendFile 追加文件  
fs.appendFile('123.txt','这是写入的内容\n',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.log('写入成功');
})
 
 
//5.fs.readFile 读取文件  
fs.readFile('123.txt',function(error,data){
    if(error){
        console.log(error);
        return false;
    }
    //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
    console.log(data.toString());  //读取出所有行的信息  
})
 
 
//6.fs.readdir 读取目录下第一级内容  把目录下面的文件和文件夹都获取到。  
fs.readdir('html',function(error,data){
    if(error){
        console.log(error);
        return false;
    }
    console.log(data);  //data是数组类型，包含文件夹以及文件的名字(只有第一级目录内容)。拿到一个文件夹下面的所有目录  
})
 
 
//7.fs.rename 重命名  1.改名  2.剪切文件(移动)  
fs.rename('html/index.html','html/news.html',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.log('修改名字成功');
})
 
 
//8. fs.rmdir  删除目录   rmdir 这个方法只能删除目录，不能删除文件  
fs.rmdir('abc目录',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.log('删除目录成功');
})
 
 
//9. fs.unlink删除文件  
fs.unlink('index.txt',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.log('删除文件成功');
})
 
 
//10. fs.createReadStream  从文件流中读取数据，读取的文件比较大时建议用流的方式读取，文件比较大会多次读取。  
var fileReadStream = fs.createReadStream( 'data1.json');
var str = '';
fileReadStream.on('data', (data) => {
    console.log("接收到" + data.length);   //文件比较大时，会多次读取，多次执行该回调函数  
str += data;
})
fileReadStream.on('end', () => {
    console.log(" --- 结束 ---");
console.log( str );
})
fileReadStream.on('error', (error) => {
    console.log(error)
})
 
 
//11. fs.createWriteStream  写入文件流  
var fs = require("fs");
var data  = "我是从数据库获取的数据，我要保存起来";
var writerStream = fs.createWriteStream('output.txt');
writerStream.write( data , 'UTF8' );
writerStream.end();  //标记文件末尾  结束写入流，释放资源  
writerStream.on( 'finish',  function() {
    console.log("写入完成。");
});
writerStream.on( 'error',  function(error){
    console.log(error.stack);
});
console.log("程序执行完毕");
 
 
//12. pipe 管道流  
var fs = require("fs");
var readerStream = fs.createReadStream( 'input.txt');
var writerStream = fs.createWriteStream( 'output.txt');
readerStream.pipe( writerStream );
console.log("程序执行完毕");
 
 
//13. fs.access 判断目录、文件是否存在(读写权限)
var  fs = require('fs');
fs.access('package.json',(err)=>{
    console.log(err ?  '目录/文件不存在': '文件存在,可以进行读写');
});
 

````

---

## [FS-文件系统](http://nodejs.cn/api/fs.html#fs_file_system)
fs 模块提供了一些 API，用于以一种类似标准 POSIX 函数的方式与文件系统进行交互。

**所有的文件系统操作都有异步和同步两种形式。**

`异步`形式的 **最后一个`参数`都是完成时`回调函数`**。 传给回调函数的参数取决于具体方法，但`回调函数的第一个参数都会保留给异常`。 如果操作成功完成，则第一个参数会是 null 或 undefined。

**同步操作**

当使用`同步操作`时，任何异常都会被立即抛出，可以使用 `try/catch` 来处理异常，或让异常向上冒泡。

````
const fs = require('fs');

try {
  fs.unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
````
**异步操作**

注意，异步的方法不能保证执行顺序。 所以下面的例子可能会出错，因为 fs.stat() 操作可能在 fs.rename() 操作之前完成。

**建议**

在繁忙的进程中，建议使用函数的异步版本。 同步的方法会阻塞整个进程，直到完成（停止所有连接）。

### 文件路径
大部分 `fs` 操作接受`字符串`、`Buffer`、或使用 `file:` 协议的 `URL` 对象作为文件路径。

`相对路径` 会相对于 `process.cwd()` 定义的当前工作目录进行处理。

使用 `Buffer` 定义的路径主要用于将文件路径处理为 opaque 字节序列的特定 POSIX 操作系统。 在这种系统上，一个文件路径可能包含使用多种字符编码的子序列。 与字符串路径一样，Buffer 路径也可以是相对的或绝对的。

**注意** 在 Windows 上 Node.js 遵循 per-drive 工作目录的理念。 当使用驱动器路径不带反斜杠时可以观察到该特性。 例如，fs.readdirSync('c:\\') 可能会返回与 fs.readdirSync('c:') 不同的结果。 详见 [MSDN路径文档]()

#### 支持 URL 对象

### **文件描述符**
在 `POSIX` 系统，`内核`为`所有进程`维护着一张当前打开着的`文件与资源表格`。 每个打开的文件都会分配一个名为`文件描述符`的数值标识。

在`系统层`，所有`文件系统操作`使用这些`文件描述符`来识别与追踪每个特定的文件。 

Window 系统使用了一个`不同但概念类似`的机制来追踪资源。 

为方便用户，`Node.js 抽象了不同操作系统间的差异`，为所有打开的文件分配了数值的文件描述符。

`fs.open()` 方法用于分配一个新的文件描述符。 一旦分配了，文件描述符可用于`读取`数据、`写入`数据、或`查看`文件信息。

`大多数操作系统`会`限制打开的文件描述符的数量`，所以当`操作完成时需关闭描述符`。 如果不这样做会导致`内存泄漏`，最终造成应用奔溃。

### 线程池的使用
注意，所有文件系统 API 中，除了 `fs.FSWatcher()` 和那些显式同步的方法之外，都使用了 `libuv` 的线程池，这对于某些应用程序可能会产生出乎意料问题和负面的性能影响，详见 [`UV_THREADPOOL_SIZE`](http://nodejs.cn/api/cli.html#cli_uv_threadpool_size_size) 文档。

# fs.FSWatcher 类
成功调用 `fs.watch()` 方法会返回一个新的 `fs.FSWatcher` 对象。

所有 `fs.FSWatcher` 对象都是 [`EventEmitter`](http://nodejs.cn/api/events.html) 的，每当监视的文件被修改时会触发 `'change'` 事件。

## 'change' 事件
+ `eventType` \<string> 发生的变化事件的类型。
+ `filename` \<string> | \<Buffer> 变化的文件名（如果是相关的或有效的）。

当被监视的目录或文件有变化时触发。 详见 `fs.watch()`

## 'close' 事件
当 `watcher` 停止监视文件变化时触发。 关闭的 `fs.FSWatcher` 对象在事件处理函数中不再可用。

## 'error' 事件
当监视文件发生错误时触发。 

发生错误的 `fs.FSWatcher` 对象在事件处理函数中`不再可用`。

## watcher.close()
`fs.FSWatcher` `停止监视`文件的变化。 

一旦停止，`fs.FSWatcher` 对象将`不再可用`。

# fs.ReadStream 类
成功调用 `fs.createReadStream()` 会返回一个新的 `fs.ReadStream` 对象。

`fs.ReadStream` 对象都是可读流。

## 'close' 事件
当 `fs.ReadStream` 底层的文件描述符被关闭时触发。

## 'open' 事件

## 'ready' 事件

## readStream.bytesRead
已读取的字节数。

## readStream.path

# fs.Stats 类
`fs.Stats` 对象提供了一个文件的信息。

## stats.isBlockDevice()
如果 `fs.Stats` 对象表示一个块设备，则返回 true 。

## stats.isCharacterDevice()
如果 `fs.Stats` 对象表示一个字符设备，则返回 true 。

## stats.isDirectory()
如果 `fs.Stats` 对象表示一个文件系统目录，则返回 true 。

## stats.isFIFO()
如果 `fs.Stats` 对象表示一个`先进先出 (FIFO) 管道`，则返回 true 。

FIFO( First Input First Output)简单说就是指先进先出。[百度百科: FIFO存储器](https://baike.baidu.com/item/FIFO存储器/4530258?fr=aladdin)

## stats.isFile()
如果 `fs.Stats` 对象表示一个普通文件，则返回 `true` 。

## stats.isSocket()
如果 `fs.Stats` 对象表示一个 `socket`，则返回 `true` 。

## stats.isSymbolicLink()
如果 `fs.Stats` 对象表示一个符号链接，则返回 `true` 。

该方法只在使用 `fs.lstat()` 时有效。

## stats属性

| type | description |
| :--: |   :-----   |
| stats.dev | 包含文件的设备的数值型标识。 |
| stats.ino | 文件系统特定的文件索引节点数值。 |
| stats.mode | 表示文件类型与模式的位域。 |
| stats.nlink | 文件的硬链接数量。 |
| stats.uid | 文件拥有者的数值型用户标识。 |
| stats.gid | 拥有文件的群组的数值型群组标识。 |
| stats.rdev | 如果文件是一个特殊文件，则返回数值型的设备标识。 |
| stats.size | 文件的字节大小。 |
| stats.blksize | 文件系统用于 I/O 操作的块大小。 |
| stats.blocks | 分配给文件的块的数量。 |
| stats.atimeMs | 表示文件最后一次被`访问`的时间戳。 |
| stats.mtimeMs | 表示文件最后一次被`修改`的时间戳。 |
| stats.ctimeMs | 表示文件`状态最后一次被改变`的时间戳。 |
| stats.birthtimeMs | 表示文件的`创建时间戳`。 |
| stats.atime | 表示文件`最后一次被访问`的时间。 |
| stats.mtime | 表示文件`最后一次被修改`的时间。 |
| stats.ctime | 表示文件`状态最后一次被改变`的时间。 |
| stats.birthtime | 表示文件的`创建`时间。 |
|  |  |

## Stat 时间的值
略

# fs.WriteStream 类

