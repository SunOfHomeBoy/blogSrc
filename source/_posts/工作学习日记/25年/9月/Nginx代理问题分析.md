# Nginx 代理问题分析
  + 问题描述: 在服务器 curl localhost:80 和 在 win10 通过 IP访问 ttp://45.84.180.192/ 时，内容不一致的问题
    ```bash
      # powershell 访问
      (base) PS C:\Users\admin> wget http://45.84.180.192/

      StatusCode        : 200
      StatusDescription : OK
      Content           : <!DOCTYPE html>
                          <html>
                          <head>
                          <title>Welcome to nginx!</title>
                          <style>
                              body {
                                  width: 35em;
                                  margin: 0 auto;
                                  font-family: Tahoma, Verdana, Arial, sans-serif;
                              }
                          </style>
                          <...
      RawContent        : HTTP/1.1 200 OK
                          Connection: keep-alive
                          Accept-Ranges: bytes
                          Content-Length: 612
                          Content-Type: text/html
                          Date: Thu, 04 Sep 2025 08:50:06 GMT
                          ETag: "65825a5f-264"
                          Last-Modified: Wed, 20 Dec 2023 ...
      Forms             : {}
      Headers           : {[Connection, keep-alive], [Accept-Ranges, bytes], [Content-Length, 612], [Content-Type, text/html]
                          ...}
      Images            : {}
      InputFields       : {}
      Links             : {@{innerHTML=nginx.org; innerText=nginx.org; outerHTML=<A href="http://nginx.org/">nginx.org</A>; o
                          uterText=nginx.org; tagName=A; href=http://nginx.org/}, @{innerHTML=nginx.com; innerText=nginx.com;
                          outerHTML=<A href="http://nginx.com/">nginx.com</A>; outerText=nginx.com; tagName=A; href=http://n
                          ginx.com/}}
      ParsedHtml        : mshtml.HTMLDocumentClass
      RawContentLength  : 612

      # Ubuntu bash 访问
      t@t-desktop:~$  curl -v http://localhost:80
        *   Trying 127.0.0.1:80...
        * TCP_NODELAY set
        * Connected to localhost (127.0.0.1) port 80 (#0)
        > GET / HTTP/1.1
        > Host: localhost
        > User-Agent: curl/7.68.0
        > Accept: */*
        >
        * Mark bundle as not supporting multiuse
        < HTTP/1.1 200 OK
        < Server: nginx/1.18.0 (Ubuntu)
        < Date: Thu, 04 Sep 2025 08:57:52 GMT
        < Content-Type: text/html
        < Content-Length: 4268
        < Connection: keep-alive
        < Cache-control: no-cache
        < Accept: */*
        < Access-Control-Allow-Origin: *
        < Access-Control-Allow-Credentials: true
        < Access-Control-Allow-Methods: POST,GET,OPTIONS
        < Access-Control-Allow-Headers: Content-Type
        < Access-Control-Max-Age: 3600
        < Allow: *
        < Login: JFC
        < Accept-Ranges: bytes
        < Content-Disposition: filename=""
        <
        ﻿<!doctype html>
        <html lang="en">

        <head>
                <meta charset="UTF-8">
                <meta name="renderer" content="webkit">
                <title>门架车牌识别</title>
                <link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css" rel="external nofollow" />
                <link rel="stylesheet" type="text/css" href="easyui/themes/icon.css" rel="external nofollow" />
                <script type="text/javascript" src="easyui/jquery.min.js"></script>
                <script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
                <style>
                        body {
                                height: 90vh;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-color: #2c3e50;
                        }

                        .div-login-container {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                flex-direction: column;
                                width: 400px;
                                height: 300px;
                                border-radius: 10px;
                                background-color: #3a70a5;
                                box-shadow: 15px 15px 10px rgba(33, 45, 58, 0.3);
                                overflow: hidden;
                                position: relative;
                        }

                        .div-login-container #id-login {
                                width: 200px;
                                height: 40px;
                                outline: none;
                                border: 1px solid #fff;
                                border-radius: 20px;
                                letter-spacing: 5px;
                                color: #fff;
                                background: none;
                                cursor: pointer;
                                font-size: 18px;
                        }

                        .div-login-container h1 {
                                z-index: 1;
                                color: #ecf0f1;
                                letter-spacing: 5px;
                                padding-left: 5px;
                                font-size: 50px;
                                font-weight: 100;
                                text-shadow: 5px 5px 5px rgba(33, 45, 58, 0.3);
                        }

                        #id-span {
                                color: #fff;
                                width: 100%;
                                height: 20px;
                                text-align: center;
                                margin: 0px;
                        }

                        #id-login:hover {
                                background-color: #61b0bd;
                        }
                </style>
                <script type="text/javascript">
                        $(function () {
                                var strIP = window.location.host;
                                $('title').html(strIP);
                                if (localStorage == undefined) {
                                        $('#remember_me').remove();
                                } else {
                                        var user = localStorage.getItem('user_' + strIP);
                                        var pwd = localStorage.getItem('pwd_' + strIP);
                                        if (user != undefined && pwd != undefined) {
                                                $('#idUser').textbox('setValue', user);
                                                $('#idPassword').passwordbox('setValue', pwd);
                                                $('#remember_me').attr('checked', 'checked');
                                        }
                                }
                                $('#id-login').click(function () {
                                        var username = $('#idUser').textbox('getValue');
                                        var password = $('#idPassword').passwordbox('getValue');
                                        if (localStorage != undefined) {
                                                if ($('#remember_me').prop('checked')) {
                                                        localStorage.setItem('user_' + strIP, username);
                                                        localStorage.setItem('pwd_' + strIP, password);
                                                } else {
                                                        localStorage.removeItem('user_' + strIP);
                                                        localStorage.removeItem('pwd_' + strIP);
                                                }
                                        }
                                        var strCmdJson = "{\"type\":\"login\",\"user\":\"" + username + "\",\"pwd\":\"" + password + "\"}";
                                        $.ajax({
                                                type: "POST",
                                                url: "command.json",
                                                data: strCmdJson,
                                                contentType: "application/json",
                                                async: true,
                                                timeout: 3000,
                                                success: function (jsonstr) {
                                                        if (jsonstr.code) {
                                                                $('#id-span').html(jsonstr.txt);
                                                                $('#id-span').show();
                                                        } else {
                                                                window.login = true;
                                                                if ($('#select_type').combobox('getValue') == 0) {
                                                                        window.location.href = "index.html";
                                                                } else if ($('#select_type').val() == 1) {
                                                                        window.location.href = "ocx/index.html";
                                                                }
                                                        }
                                                },
                                                error: function (xhr, state, errorThrown) {
                                                        alert("网页异常错误!");
                                                }
                                        });
                                });
                        });
                </script>
        </head>

        <body>
                <div class="div-login-container">
                        <h1>门架车牌识别</h1>
                        <input class="easyui-textbox" id="idUser" data-options="prompt:'用户名',iconCls:'icon-man',width:200,height:32">
                        <input class="easyui-passwordbox" id="idPassword" data-options="prompt:'密码',showEye:true,width:200,height:32">
                        <input class="easyui-combobox" id="select_type"
                                data-options="data:[{value:0,text:'纯网页模式'},{value:1,text:'插件模式'}],editable:false,panelHeight:'auto',width:200,height:32">
                        <div style="width:200px">
                                <input type="checkbox" id="remember_me"><label for="remember_me">记住我</label>
                        </div>
                        <span id="id-span" style="display:none">用户名或密码错误，请重新输入!</span>
                        <input id="id-login" type="button" value="登入">
                </div>
        </body>

        * Connection #0 to host localhost left intact
        </html>
    ```

  + 补充描述，win 和 Ubuntu 访问 8080端口是正常的

  + 原因 & 解决方案
    ```bash
      # 1. default_server 字段
      listen 80 default_server;  # Make this the default server for port 80
      # 2. server_name 监听范围 `_` 监听全部 host地址 类似于 `0.0.0.0`
  		server_name _;  # Catch-all server name
    ```
