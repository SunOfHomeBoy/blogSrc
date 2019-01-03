---
title: js之iframe父子页面通信
date: 2019-01-02 15:48:26
tags: IFrame
categories: JS
---
# [js之iframe父子页面通信](https://www.cnblogs.com/sydeveloper/p/3712863.html)

父页面
````
/** 父页面需要在 window对象上 挂载一个 方法，供子页面调用 */
iframeHandle() {
  window.clickSet = () => {
    this.setState({
      showReturn: true
    })
  }
}

componentDidMount() {
    this.iframeHandle()
}
````

子页面
````
function clickSet() {
    parent.window.clickSet(); // 子页面方法内部 调用父级window对象 下挂载的方法
}

$(function(){
    $('.iframeReturn').on('click',clickSet) // 调用方法
})
````
---

# [iframe在更改了src之后对应的网页并未刷新](https://blog.csdn.net/jin80506/article/details/83271401)

在更改src之前加上这一句即可。
> document.getElementById(iframe的id).contentWindow.location.reload(true);

# Iframe监听ulr
> onload标签属性
````
<iframe
  id="AirportBusiness"
  src={ifSrc} frameBorder="0"
  onLoad={this.handleButton}
  style={{ border: 0, width: clientWidth, height: clientHeight, marginTop: -70 }}
>
</iframe>

handleButton() {
  let ifra = document.getElementById('AirportBusiness').contentWindow.location.href;
  let urlTest = /index/;
  this.setState({
    showReturn: !urlTest.test(ifra)
  })
}
````