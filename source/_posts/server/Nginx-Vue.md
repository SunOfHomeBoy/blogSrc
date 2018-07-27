---
title: Nginx+Vue实现前后端分离
date: 2018-06-09 18:18:33
tags: Nginx / Vue
categories: Nginx
---
## Nginx+Vue.js实现前后端分离
### 1.nginx 是一个高性能的HTTP和反向代理服务器，常用于分布式服务器管理.

### 2.[Es6学习地址](http://es6.ruanyifeng.com/)

### 3.vue.js是一款前端`模板渲染引擎`,类似于后端的`jsp`,`beetl`等`模板引擎`.当然结合node环境也可作为后端渲染用.(官网已支持)

## 说了上述几点,让我们来回答几个为什么? 

1.实现前后端分离的好处是什么?主要应用场景在哪?

2.为什么有了后端模板引擎,为什么还要用前端的模板引擎?他们的优势和劣势? 

3.实现前后端分离需要怎么改？

  答：
  
  1.首先是发展的眼光看问题，以前的项目大多呈现的是PC端项目,且场景简单,固定.请求大多是有状态的.而现在我们常常是移动端项目较多,同一款app大多是原生和内嵌页面相结合的方式.并且现在的项目场景更多元化,这导致一个功能模块很可能是好几个项目的请求共同作用的结果.

  2.如果还按照以前的做法,第一个问题是我只能用jsonp去解决调多个跨域请求的问题,实现起来代码太过冗余。对于同一功能,很有可能app端和PC端就有两套不同的写法。并且带宽是个很贵的东西,客户端总是去服务器端一起静态资源的请求,会导致速度慢。动静分离可以实现静态资源和动态资源分开获取,并且服务器也能动静分离,有效解决带宽问题。

  3.后端开发人员对于css,js的掌握可能不如前端熟练,比如利用jsp填充数据时,往往需要后端开发人员去调样式和写js,这样会造成开发效率低下。

  4.采用前端模板渲染可以释放服务器端的一部分压力,并且前端模板引擎支持的功能比后端丰富.比如用vue可以自定义组件,校验方式,深入式渐变等,这比后端模板引擎功能要更加丰富.


-----

## nginx 配置静态资源
````
 server {
        listen       4000;
        server_name  www.test.com;
        charset utf-8;
        index /static/index.html;//配置首页

        //这边可使用正则表达式,拦截动态数据的请求,从而解决跨域问题
        location = /sellingJson.html {
           proxy_pass http://192.168.100.17:8090/vueHelpSellingcar.html;
       }

        #配置Nginx动静分离，定义的静态页面直接从static读取。
       location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css)$ 
       { 
        root /static/;
        #expires定义用户浏览器缓存的时间为7天，如果静态页面不常更新，可以设置更长，这样可以节省带宽和缓解服务器的压力
        expires      7d; 
       }    
    }
````

[推荐阅读](https://blog.csdn.net/qq_26026975/article/details/75331779)

-----

## 部署操作
### **Linux Scp命令**
 secure copy的缩写, scp是linux系统下基于ssh登陆进行安全的远程文件拷贝命令。

### `sudo su` 使用管理员权限

### **创建登录脚本**
 cd /usr/local/bin/
 mkdir login
 ````
 #!/bin/bash
 ssh root@47.104.231.254
 ````
 
### **创建文件上脚本**
 ````
 #!/bin/bash
 scp -r /mnt/d/Project/shrs/dist/* root@47.104.231.254:/mnt/www/shrs2006.com
 ````

### [sudo su 管理员权限运行](https://blog.csdn.net/guoweimelon/article/details/50471561)

 chmod a+x file-name [提升权限](http://man.linuxde.net/chmod)

### **第一步 使用pkg包管理工具`搜索/安装`Nginx**
 FreeBSD 安装 NGINX  // done
 FreeBSD 下 `pkg` 包管理工具
 ````
 pkg search pkgName // 搜索
 pkg install pkgName[必须是完整名称，可以先search关键字，后复制全称安装] 
 ````

 Nginx 安装完成后 
 ````
 systemctl enable nginx // 设置开机启动 注意版本，在主流Linux版本下有效 as Ubuntu、CentOS
 ````

### **第二步 启动后台服务**
 作为后台服务 启动服务
 ````
 service nginx onestart
 service nginx onerestart
 service nginx onestop
 ````
#### Nginx总配置文件目录
````
/usr/local/etc/nginx

gzip  on;
    include /mnt/www/etc/nginx/*.conf;    # !* import
````

#### 分配置文件
````
server {
        listen 80;
        server_name localhost;

        default_type 'text/html';
        charset utf-8;

        location / {
                root /mnt/www/shrs2006.com;
                index index.html;
        }
}
````

**配置Nginx**

1.总配置文件，加分配至文件目录。虚拟主机 /usr/local/etc/nginx

2.分配置文件 以`域名`命名  `/mnt/www/etc/nginx/shrs2006.com.conf` // 一个网站 对应一个配置文件


### 调试，修改host文件
1. C:\Windows\System32\drivers\etc
2. 修改host ([host修改权限](https://jingyan.baidu.com/article/624e7459b194f134e8ba5a8e.html))
3. [修改host](https://jingyan.baidu.com/article/5bbb5a1b15c97c13eba1798a.html)

绑定假域名

www.shrs2006.test => IP windows hosts

host文件:
````
47.104.231.254          www.shrs2006.test // 末尾加入字段
````

// done

### 第三步 上传 项目文件
scp 脚本 项目生成后dist文件夹 上传指定目录下

````
/mnt/www/shrs2006.com

scp /mnt/d/Project/shrs/dist root@47.104.231.254:/mnt/www/shrs2006.com
````



### 第四步
访问 网址 检测是否部署成功

重启服务器，打开假域名、可以看到网站 算成功。

### 第五步
重启 Nginx 服务 
[命令](https://www.cnblogs.com/zhj5551/p/7589078.html)

并且要求 开机启动 [Linux的关机与重启命令](https://www.ezloo.com/2009/05/linux_poweroff_and_reboot.html)

