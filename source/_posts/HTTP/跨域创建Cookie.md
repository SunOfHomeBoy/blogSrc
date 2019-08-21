---
title: 跨域创建Cookie
date: 2018-07-27 11:21:49
tags: 跨域创建Cookie
categories: Cookie HTTP
---
## 跨域创建Cookie

要想浏览器处理 CORS 跨域中的 Cookie 只需要分别在网页以及服务端作出一点点改变：

1.前端，对于跨域的 XMLHttpRequest 请求，需要设置 `withCredentials` 属性为 `true`。

前端xhr设置
````
url: settings_1.settings.pathAPI + path,
method: 'post',
data: { },
transformRequest: [
    function (data) { }
],
withCredentials: true, // [开启 跨站点 证书 访问控制]
headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
````
[开启 跨站点 证书 访问控制](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)

---
2.服务端,响应中必须携带 `Access-Control-Allow-Credentials: true` 首部。  
如果服务端的响应中未携带`Access-Control-Allow-Credentials: true` 首部，浏览器将不会把响应的内容返回给发送者。

服务器跨域设置
````
let url = requestData.getHeader("Origin");
// console.log("OriginUrl::", url);

responseData.setHeader('Access-Control-Allow-Origin', url)
responseData.setHeader('Access-Control-Allow-Methods', 'POST')
responseData.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')
responseData.setHeader("Access-Control-ALLOW-Credentials", "true") // 跨域设置cookie
responseData.renderJSON(callback)
````
---

**总结**要想`设置和获取跨域 Cookie`，上面提到的两点缺一不可。  
另外有一点需要注意的是：规范中提到，如果 `XMLHttpRequest` 请求设置了 `withCredentials` 属性，那么服务器不得设置 `Access-Control-Allow-Origin的值为*` ，否则浏览器将会抛出`The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*'` 错误。

---

[参考文献](https://www.cnblogs.com/zhangcybb/p/6594991.html)

[作者：ken_ljq; 來源：简书](https://www.jianshu.com/p/13d53acc124f)
