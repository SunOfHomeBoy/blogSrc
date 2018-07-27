---
title: Watch用法详解
date: 2018-05-26 09:23:17
tags: Watch-监听属性
categories: Vue-Watch
---

Vue.js 提供了一个方法 `watch`，它用于观察`Vue实例`上的`数据变动`。对应一个对象，`键是观察表达式`，`值是对应回调`。
值也可以是方法名，或者是对象，包含选项。具体的用法可以直接看下面的示例，简单直接。

````
<span style="color:#006600;"><div id="app">  
    <input type="text" v-model:value="childrens.name" />  
    <input type="text" v-model:value="lastName" />  
</div>  
  
<script type="text/javascript">     
    var vm = new Vue( {  
        el: '#app',  
        data: {  
            childrens: {  
                name: '小强',  
                age: 20,  
                sex: '男'  
            },  
            tdArray:["1","2"],  
            lastName:"张三"  
        },  
        watch:{  
            childrens:{  
                handler:function(val,oldval){  
                    console.log(val.name)  
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
            },  
            'childrens.name':function(val,oldval){  
                console.log(val+"aaa")  
            },//键路径必须加上引号  
            lastName:function(val,oldval){  
                console.log(this.lastName)  
            }  
        },//以V-model绑定数据时使用的数据变化监测  
    } );  
    vm.$watch("lastName",function(val,oldval){  
        console.log(val)  
    })//主动调用$watch方法来进行数据监测</span>  
</script>  
````
---
[阅读原文](https://blog.csdn.net/itkingone/article/details/69568498)

[另附: [Angular中使用$watch监听object属性值的变化](https://blog.csdn.net/u014291497/article/details/52245651)]

---