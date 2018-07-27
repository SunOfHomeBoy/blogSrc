---
title: Vue-$refs用法
date: 2018-07-14 09:44:23
tags: $refs用法
categories: VUE
---
## [Vue `$refs`基本用法](https://www.cnblogs.com/xueweijie/p/6907676.html)

````
<div id="app">
    <input type="text" ref="input1"/>
    <button @click="add">添加</button>
</div>
````

````
<script>
    new Vue({
    el: "#app",
    methods:{
    add:function(){
        this.$refs.input1.value ="22"; //this.$refs.input1  减少获取dom节点的消耗
        }
    }
    })
</script>
````