---
title: Express-session
date: 2018-07-13 16:41:14
tags: session
categories: Node Express-session
---
## [Express-session](https://blog.csdn.net/hsany330/article/details/51968594)
````
app.use(cookieParser());
app.use(session({
  secret: '12345',
  name: 'name',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: true,
}));
````

各参数意义：

`secret`：用来对session数据进行加密的字符串.这个属性值为必须指定的属性。

`name`：表示cookie的name，默认cookie的name是：connect.sid。

`maxAge`：cookie过期时间，毫秒。
`resave`：是指每次请求都重新设置session cookie，假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒。

`saveUninitialized`：是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid。

之后在处理请求时直接通过以下方式对session进行读写：

---

## [Cookie的特性](http://zhou.jie.ge.blog.163.com/blog/static/118519146201043131050363/)
  每个Cookie包含有6个元素,常用的有:name、value、expires、d
omain和secure。这些元素存放了这个Cookie的作用范围及实际的数
据。

---

## [理解cookie的path和domain属性](http://www.cnblogs.com/fsjohnhuang/archive/2011/11/22/2258999.html)

---

## [Cookie作用域](https://blog.csdn.net/kky2010_110/article/details/4743796)

---

## [NPM express-session](https://www.npmjs.com/package/express-session)

### 选项
express-session 在options对象中接受这些属性。

#### `cookie` 为 session ID cookie的设置对象。默认值为 
  > { path: '/', httpOnly: true, secure: false, maxAge: null }。
  
  - cookie.domain  
    指定Domain Set-Cookie属性的值。默认情况下，未设置任何域，并且大多数客户端会将cookie视为仅应用于当前域。
  
  - cookie.expires  
    指定Date要作为Expires Set-Cookie属性值的对象。默认情况下，没有设置过期，并且大多数客户端会将此视为“非持久性cookie”，并在退出Web浏览器应用程序的条件下将其删除。

    **注意** 如果在选项中设置了`expires`和`maxAge`，则在对象中定义的最后一个是生效的。  

    **注意** `expires`不应直接设置该选项; 而只是使用该 `maxAge` 选项。
  
  - cookie.httpOnly  
    指定属性的`boolean值``HttpOnly Set-Cookie`。为true时，设置HttpOnly属性，否则不设置。默认情况下，该HttpOnly 属性已设置。  

    **注意** 在将其设置为true时要小心，因为兼容客户端 不允许 客户端JavaScript在`document.cookie`中看到`cookie`。
  
  - cookie.maxAge  
    指定计算`Expires Set-Cookie`属性时 要使用 数字(以毫秒为单位)。这是通过 获取当前服务器时间 并向`值`添加`maxAge`毫秒来计算过期日期时间来完成的。默认情况下，没有设置`maxAge`。

    **注意** 如果在选项中同时设置了`expires`和`maxAge`，那么对象中定义的`最后一个`就是所使用的。
  
  - cookie.path  
    指定的值`Path` `Set-Cookie`。默认情况下，将其设置为`'/'`，即域的根路径。
  
  - cookie.sameSite  
    指定`布尔值`或`字符串`作为`SameSite Set-Cookie`属性的值。  
    
    - true会将 SameSite 属性设置为严格执行相同的站点。|| 
        true将 SameSite 属性设置Strict为严格相同的站点实施。
    - false不会设置 SameSite 属性。
    - 'lax'将 SameSite 属性设置Lax为`松散`相同的网站实施。
    - 'strict'将 SameSite 属性设置为`严格`Strict以便严格执行相同的站点。

    [更多关于不同执行级别的信息可以在规范中找到](https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-4.1.1)
    
    **注意** 这是一个尚未完全标准化的属性，将来可能会改变。这也意味着许多客户可能会忽略这个属性，直到他们理解认可它。

  - cookie.secure  
    指定`安全` `设置cookie`属性的布尔值。当truthy时，设置了Secure属性，否则不设置。默认情况下，未设置Secure属性。
    指定属性的boolean值Secure Set-Cookie。当真实时，设置Secure属性，否则不设置。默认情况下，Secure 未设置该属性。

    **注意** 在设置为true时要小心，因为如果浏览器没有`HTTPS`连接，符合规范(兼容的) 客户端 将来不会将cookie发送回服务器。  

    **请注意!** `secure: true`是 **推荐的** 选项。但是，它需要启用(支持)https的网站，即`secure cookies`需要HTTPS(HTTPS对于安全cookie是必要的)。如果`secure` 已设置，并且您通过HTTP访问您的站点，则不会设置cookie(不生效)。如果你的node.js在代理后面并且正在使用secure: true，你需要在express中设置“trust proxy”：
    ````
    var app = express()

    app.set('trust proxy', 1) // trust first proxy

    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }))
    ````
    对于在生产中使用 `secure cookies`，但允许在开发中进行测试，下面是一个例子，说明如何在express中基于`NODE_ENV`启用此设置:
    ````
    var app = express()
    var sess = {
      secret: 'keyboard cat',
      cookie: {}
    }
    
    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      sess.cookie.secure = true // serve secure cookies
    }
    
    app.use(session(sess))
    ````
    The `cookie`。安全选项也可以设置为特殊值'auto'，使该设置自动匹配连接的确定安全性。如果站点同时作为HTTP和HTTPS可用，那么在使用此设置时要小心，因为一旦在HTTPS上设置了cookie，它将不再在HTTP上可见。当正确设置Express"trust proxy"(“信任代理”)设置以简化开发与生产配置时，这是很有用的。
  
  - genid 配置  
    函数调用以生成一个新的会话ID。提供一个函数，该函数返回一个将用作会话ID的字符串。  
    默认值是使用`uid-safe`库来生成id的函数。

    **注意请** 注意生成惟一的id，这样会话就不会发生冲突。

    ````
    app.use(session({
      genid: function(req) {
        return genuuid() // use UUIDs for session IDs
      },
      secret: 'keyboard cat'
    }))
    ````
  
  - name  
    在响应中设置的会话ID cookie的名称(并从请求中读取)。
    The default value is 'connect.sid'.

    **注意** 如果在相同的主机名上运行多个应用程序(这只是名称，即localhost或127.0.0.1;不同的方案和端口不会命名不同的主机名)，然后需要将session cookie彼此分开。最简单的方法是为每个应用设置不同的名称。

  - proxy  
    Trust the reverse proxy when setting secure cookies (via the "X-Forwarded-Proto" header).  

    在设置安全cookie时（通过 `X-Forwarded-Proto` 标头）信任反向代理。  
    默认值为undefined。

## 
---

## [node.js 中间件express-session使用详解](https://www.jb51.net/article/114232.htm)

## [同源策略以及cookie安全策略](https://blog.csdn.net/turkeyzhou/article/details/8818173)

