---
title: axios返回值解析
date: 2018-07-30 09:40:08
tags: axios返回值
categories: axios
---
## axios返回值解析

````
axios(
  {
    url: settings.pathAPI + path,
    method: 'post',
    data: {},
    transformRequest: [],
    withCredentials: true, // 跨域设置cookie
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
)
.then((response: any) => {
  let responseData = response.data
  console.log("response::", response);

  if (typeof (response) === 'string') {
    responseData = json(response) // `做字符串解析`
  }
  switch (responseData.code) {
    case 404:
      if (settings.debug) {
              console.log('Not Found')
      }
      break

    case 500:
      if (settings.debug) {
        console.log('Internal Server Error:')
      }
      break

    default:
      callback(responseData)
  }
})
.catch((reason: any) => {
  for (let k in reason) {
    console.log(k, reason[k]);
  } // 查看 属性
  switch (reason['response']['status']) {
    case 403:
      return redirect('/login') // 路由跳转
    case 404:
      if (settings_1.settings.debug) {
              console.log('Not Found');
      }
      break;
    case 500:
      if (settings_1.settings.debug) {
              console.log('Internal Server Error:');
      }
      break;
    default:
      callback(responseData);
  }
  console.log(reason);
  console.log(`%c reason %c ${reason} `, "background:#f00 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff", "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #000");
})
````
catch 中 返回值 `reason` 默认是解析成字符串，但是可以用 `fon in` 方法，遍历Obj对象。