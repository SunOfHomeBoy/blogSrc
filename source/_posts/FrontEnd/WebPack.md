---
title: WebPack
date: 2018-07-26 08:59:44
tags: WebPack配置
categories: WebPack
---
## webpack详解
[原文出处: WsmDyj](https://segmentfault.com/a/1190000015611030)  

webpack是一个`打包工具`，他的宗旨是`一切静态资源即可打包`。  
有人就会问为什么要webpack？webpack是现代前端技术的基石，常规的开发方式，比如jquery,html,css静态网页开发已经落后了(也可以配合webpack技术开发)。现在是MVVM的时代，数据驱动界面。webpack将现代js开发中的各种新型有用的技术，集合打包。  

**webpack生态圈:**
![webpack生态圈](https://mmbiz.qpic.cn/mmbiz_jpg/zPh0erYjkib3EVfKmEFGibiaqqKlnWmGLMouXAfJQL0cWMtd2pZt67AeZDxjM3VZ3sbbUVccbqTPA6Pa6T2jvTafA/640)

**webpack4.0的配置(实际上是`Node`干活)**
````
const path = require('path'); //引入node的path模块
const webpack = require('webpack'); //引入webpack,使用lodash
const HtmlWebpackPlugin = require('html-webpack-plugin') //将html打包
const ExtractTextPlugin = require('extract-text-webpack-plugin') //打包的css拆分,将一部分抽离出来  
const CopyWebpackPlugin = require('copy-webpack-plugin')
// console.log(path.resolve(__dirname,'dist')); // 物理地址拼接
module.exports = {
    entry: './src/index.js', //入口文件  在vue-cli main.js
    output: { //webpack如何输出
        path: path.resolve(__dirname, 'dist'), //定位，输出文件的目标路径
        filename: '[name].js'
    },
    module: { //模块的相关配置
        rules: [ //根据文件的后缀提供一个loader,解析规则
            {
                test: /\.js$/, //es6 => es5
                include: [
                    path.resolve(__dirname, 'src')
                ],
                // exclude:[], 不匹配选项（优先级高于test和include）
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                })
            },
            { //图片loader
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader' //根据文件地址加载文件
                    }
                ]
            }
        ]
    },
    resolve: { // 解析模块的可选项  
        // modules: [ ] // 模块的查找目录 配置其他的css等文件
        extensions: [".js", ".json", ".jsx", ".less", ".css"], //用到文件的扩展名
        alias: { //模快别名列表
            utils: path.resolve(__dirname, 'src/utils')
        }
    },
    plugins: [ // 插进的引用, 压缩，分离美化
        new ExtractTextPlugin('[name].css'), // [name] 默认  也可以自定义name  声明使用
        new HtmlWebpackPlugin({ // 将模板的头部和尾部添加css和js模板,dist 目录发布到服务器上，项目包。可以直接上线
            file: 'index.html', // 打造单页面运用 最后运行的不是这个
            template: 'src/index.html' // vue-cli放在根目录下
        }),
        new CopyWebpackPlugin([ // src下其他的文件直接复制到dist目录下
            {
                from: 'src/assets/favicon.ico',
                to: 'favicon.ico'
            }
        ]),
        new webpack.ProvidePlugin({ //引用框架 jquery  lodash工具库是很多组件会复用的，省去了import
            '_': 'lodash' //引用webpack
        })
    ],
    devServer: { //服务于webpack-dev-server  内部封装了一个express
        port: '8080',
        before(app) {
            app.get('/api/test.json', (req, res) => {
                res.json({
                    code: 200,
                    message: 'Hello World'
                })
            })
        }
    }
}
````

## <span style="color:red">一、前端环境搭建</span>
使用 `npm` 或 `yarn` 来安装 `webpack`
````
npm install `webpack` `webpack-cli` -g 
# 或者 || 
yarn global add `webpack` `webpack-cli`
````

为什么`webpack`分为`两个文件`呢？  
在`webpack3`中，webpack本身和它的cli以前都是在同一个包中;  
但在第4版中，他们已经将两者分开来更好地管理它们。

新建一个`webpack的文件夹`，在其下新建一个`try-webpack` ( 防止`init`时项目名和安装包同名 ) 并初始化和配置webpack。

> npm init -y  // -y 默认所有的配置

> yarn add webpack webpack-cli -D // -D webpack安装在devDependencies环境中

## <span style="color:red">二、部署webpack</span>
在上面搭建好的环境项目中，我们来到`package.json`里配置我们的`scripts`,让webpack
````
{
    "scripts": {
        "build": "webpack --mode production" //我们在这里配置，就可以使用npm run build 启动我们的webpack
    },
    "devDependencies": {
        "webpack": "^4.16.0",
        "webpack-cli": "^3.0.8"
    }
}
````
配置好我们`webpack的运行环境`时，联想下`vue-cli`。  
平时使用`vue-cli`会自动帮我们配置并生成项目。  
我们在`src`下进行项目的开发，最后 `npm run build` 打包生成我们的dist的目录。  
不知道你是否还记得，还是让我们进入下一节让我们感受下这其中的整个流程吧。

## <span style="color:red">三、npm run build 发生了什么</span>
在我们的根项目下`try-webpack`新建一个`src`目录。在`src`目录下新建一个`index.js`文件。  
在里面我们可以写任意的代码，以案例为主:
> const a = 1;

写完后, 在终端运行命令 `npm run build` ；会发现新增了一个`dist`目录，里面存放着webpack打包好的`main.js`文件。  
这和我们在`vue-cli`里操作是一样的。

## <span style="color:red">四、webpackp配置流程篇</span>
我们在开发是一般会打包src下的什么文件呢？我们可以回忆一下，其实vue-cli项目src下不就这几点嘛：

+ 发布时需要的html，css，js
+ css预编译器stylus，less，sass
+ es6的高级语法
+ 图片资源.png，.gif，.ico，.jpg
+ 文件间的require
+ 别名@等修饰符

分几点来讲解webpack中`webpack.config.js`的配置，跟着脚步，一步一步的来完成我们的流程线。

### **✍️Html在webpack中的配置**

在项目的根目录`try-webpack`下新建`webpack.config.js`文件，以`commonJS`模块化机制向外输出,并且新建一个`index.html`。
> module.exports = { }

配置我们的入口`entry`，在`vue-cli`里相当于根目录下的`main.js`，我们的出口`output`。  
我们可以把`webpack`理解为一个工厂，进入相当于把各种各样的原料放进我们的工厂了，然后工厂进行一系列的打包操作把打包好的东西，向外输出，然后就可以去出售了(上线)。
````
const path = require('path'); // 引入我们的node模块里的path
// 测试下 console.log(path.resolve(__dirname,'dist')); // 物理地址拼接
module.exports = {
    entry: './src/index.js', // 入口文件  在vue-cli main.js
    output: { // webpack如何向外输出
        path: path.resolve(__dirname, 'dist'), // 定位，输出文件的目标路径
        filename: '[name].js' // 文件名[name].js默认，也可自行配置
    },
}
````
**HTML打包** 需要 **安装/引入** `html-webpack-plugin`
> yarn add html-webpack-plugin -D // 在开发环境中安装

> const HtmlWebpackPlugin = require('html-webpack-plugin')  //引入打包我们的HTML

在module.exports里配置我们的plugins(插件):
````
plugins: [  //插进的引用, 压缩，分离美化
    new HtmlWebpackPlugin({  // 将模板的头部和尾部添加css和js模板, dist 目录发布到服务器上，项目包。可以直接上线
        file: 'index.html', // 打造单页面运用 最后运行的不是这个
        template: 'src/index.html'  // vue-cli放在跟目录下
    }),
],
````
配置好后，在终端输入`npm run dev`后webpack将我们的html打包好并且`自动将js引进`来。
````
<body>
    <p class="main">Hello World</p>
    <script type="text/javascript" src="main.js"></script>
</body>
````
`live-sever` 我们的dist目录，启动一个`8080端口`，我们就可以看到我们的Hello World了。这就是我们上线版的页面。

### **css在webpack中的配置**
在`vue-cli`里，我们可以使用css去写我们的样式，也可以使用高级`stylus，less，sass`等预编译器。这里就以less为例，看看webpack怎么将他打包成一个css。
````
.main {
  color: red;
}
````
在`src目录`下新建我们的`style.less`文件，在配置之前我们需要`npm安装`我们的`css-loader`和`sass-loader`， `sass、less`
> yarn add css-loader less less-loader style-loader -D

执行完上述命令我们在 `packge.json` 里可以看到我们的配置文件
````
"devDependencies": {

    "css-loader": "^1.0.0",

    "html-webpack-plugin": "^3.2.0",

    "sass": "^1.9.0",

    "sass-loader": "^7.0.3",

    "webpack": "^4.16.0",

    "webpack-cli": "^3.0.8"

}
````
安装好后，开始配置`webpack.config.js`文件。  
这里申明一下，css 在 dist 目录下 需要和 `HTML`分离，还需引入`extract-text-webpack-plugin`，先安装
> yarn add extract-text-webpack-plugin -D

> npm install extract-text-webpack-plugin -D

这里有一个坑，`extract-text-webpack-plugin`在`4.0并不支持`这样的安装，可自行chrome。  
换一种方式,选择`4.00-beta.0版本`
> yarn add extract-text-webpack-plugin@last -D

来到我们的`module.exports`里，完成moudel的配置

---
[阅读原文](https://mp.weixin.qq.com/s/kZ9Y99yO5_CmUzKjP_M4Nw)

