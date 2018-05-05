---
title: React-入门
date: 2017-09-13 15:21:11
tags: React
archives: Front-end
categories: 前端
---
<h2>入门</h2>
<ol>
  <li>一个核心思想——组件化</li>
  <li>两位带头大哥——react & react-dom</li>
  <li>一个基本运作方式——数据驱动视图</li>
  <li>一位神秘卧底——jsx语法</li>
  <li>三位护法——state（状态）、props（属性）、refs（实例）</li>
  <li>一群打杂小弟——生命周期</li>
</ol>
<p>
create-React-app是一个全局的命令行工具用来创建一个新的项目
react-scripts是一个生成的项目所需要的开发依赖
</p>
<p>
一般我们开始创建react应用程序的时候，要自己通过npm或者安装项目的全部依赖，再写webpack.config.js，一系列复杂的配置，搭建好开发环境后写src源代码
</p>
<p>
现在如果你正在搭建react运行环境，使用create-react-app去自动构建你的程序。你的项目所在的文件夹下是没有配置文件的。react-scripts是唯一的额外的构造依赖
</p>
<p>
在你的package.json中，你的运行环境将有每一个你需要用来构建一个现代应用程序所需要的依赖，在配置文件中编写的配置代码，React脚本都帮你写了，比如：react-scripts帮你自动下载需要的webpack-dev-server依赖，然后react脚本自己写了一个nodejs服务端的脚本代码start.js来实例化.
</p>
<p>
WebpackDevServer，并且运行启动了一个使用express的Http服务器，现在你只需要专心写SRC源代码就可以了。省去了很多精力，最适合快速上手一个演示了。
</p>
<h5>React-scripts有以下支持，都帮你配置好了：</h5>
<p>React，JSX，ES6和Flow语法支持。</p>
<p>ES6之外的语言扩展像对象扩展运算符。</p>
<p>直接从JavaScript导入CSS和图像文件。</p>
<p>自动翻译CSS，所以你不需要-webkit或其他前缀。</p>
<p>一个构建脚本来捆绑JS，CSS，和图像进行生产，具有源代码图。</p>

<h3>示例:</h3>
<div>index:</div>
    // 1.引入两位带头大哥 react和react-dom
    import React from 'react'
    import ReactDom from 'react-dom'
    // 引入App组件 
    import App from './App'
    import logo from './logo.svg'
    // ReactDom负责控制页面的内容 但是使用ReactDom 必须依赖React
    // 第一个参数 是渲染的元素(必须是闭合标签)  第二个参数是渲染的位置
    ReactDom.render(
      //<div>
        //<h1>今天学习了react</h1>
        //<h2>这是一个h2标签</h2>
        //<img src={logo} alt=""/>
        //<App />
      //</div>,
      document.getElementById('root')
    )
    // jsx ==== javascript +xml  神秘的卧底
    // 可以在js语言中 插入 xml(html)语言  语法糖  每一个XML标签都会被JSX转换工具转换成纯Javascript代码
<div>app:</div>
    import React,{Component} from 'react'
    import './App.css'
    class App extends Component{
      constructor(){
        super()
        console.log(this)
        this.state = {
          name:'焦洋',
          time:(new Date()).toLocaleTimeString()
        }
        setInterval(()=>{
          // 在react中 修改state  不能直接修改 必须通过调用this.setState()
          // 修改我们的时间
          // console.log(this);
          this.setState({
            time:(new Date()).toLocaleTimeString()
          })
        },1000)
      }
      say(){
        return 'say Hello'
      }
        
      // 引入一个打杂的小弟  生命周期 方法
      render(){
        // var s = 'abc'
        // {} 插值 插槽  <%= %> 插值即可以插变量 也可以插函数
        return (
          <ul>
            <li>1</li>
            <li className='li2'>{3>4 ? '真的' : '假的'}</li>
            <li>{this.say()}</li>
            <li>{111}</li>
            <li>{this.state.name}</li>
            <li>{this.state.time}</li>
          </ul>
          )
      }
    }
    //抛出 App
    export default App;