---
title: 原生Ajax请求
date: 2018-04-16 16:01:01
tags: 原生Ajax
archives: 原生Ajax请求
categories: Ajax
---
# 原生Ajax请求
````
    function ajax(options) {
      options = options || {};
      options.type = (options.type || "GET").toUpperCase();
      options.dataType = options.dataType || "json";
      var params = formatParams(options.data);

      //创建 - 非IE6 - 第一步
      if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
      } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }

      //接收 - 第三步
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          var status = xhr.status;
          if (status >= 200 && status < 300) {
            options.success && options.success(xhr.responseText, xhr.responseXML);
          } else {
            options.fail && options.fail(status);
          }
        }
      }

      //连接 和 发送 - 第二步
      if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
      } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
      }
    }
    
    //格式化参数
    function formatParams(data) {
      var arr = [];
      for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
      }
      arr.push(("v=" + Math.random()).replace(".", ""));
      // console.log(arr.join("&"));
      return arr.join("&");
    }
````