---
title: react-无缝滚动动画
date: 2018-12-18 09:22:18
tags: 
categories: Effects
---
## 无缝滚动

### 第一步 定义 Dom结构

+ 第一层`div`最外侧 负责 1️⃣鼠标 交互，2️⃣超出隐藏
+ 第二层`div`负责整体动画，通过`marginTop`属性实现动画效果
```html
<div
  className="contetn"
  ref="content" // react中 通过 this.refs.content 获取 Dom元素
  onMouseEnter={this.removeAnimationInterval} // 鼠标移入 清除定时器
  onMouseLeave={this.animationInterval} // 鼠标移出 设置定时器
  style={{overflow: "hidden"}} // 超出隐藏 多余内容
  // onWheel={} // 鼠标滚轴 事件
>
  <div style={{ marginTop: scrollData + "px" }}> // 通过`marginTop`属性实现动画效果
    {
      dutyList.map((item, index) => {
        return (
          <div className="card" key={`${item.title}:${item.name}${index}`}>
            内部元素 非 动画效果 关键，可自定义内容
          </div>
        )
      })
    }
  </div>
</div>
```

### 第二步 获取数据 利用周期执行动画
在请求数据的回调函数 中 设置state, 利用回调 执行 动画方法
```ts
  getOnDutyListData() {
    axios({
      method: 'GET',
      url: `/OnDutyList`,
    }).then(res => {
      this.setState({
        dutyList: res.data.result
      }, () => this.animationInterval()) // 在这里，利用 回调 执行 动画方法。可以避免 在其他 周期里面获取不到 异步数据的情况
    })
  }
```

### 第三步 动画实现效果
```ts
animationInterval() {
  /** 获取滚动系数, 数据矩阵 */
  let { scrollData, dutyList } = this.state;
  /** 非空判断 */
  if (!dutyList.length) return;

  /** 设置定时器，挂载到 当前类下的 state */
  this.state.animationInterval = setInterval(() => {
    /** setState触发render，实现实时动画效果 */
    this.setState({
      scrollData: scrollData--
    });

    /** 初始化判断 */
    if (this.state.inital && scrollData === -1) {
      dutyList.push(dutyList[0]); // 第一次多加载 一个 数据第一项，实现首尾无缝滚动 
      this.setState({
        inital: false // 关闭 初始化
      })
    }

    /** 判断 滚动位置 128为当前效果 中 itemCard 高度, 一但card全部高度 超出视图 执行内部语句 */
    if (scrollData % 128 === 0) {
      dutyList.shift(); // 删除第一项
      dutyList.push(dutyList[0]); // 把当前 数据 第一项，加入 矩阵尾部
      scrollData = 0; // 并把 高度 重置
    }
    // if (scrollData > -113) {
    //   let firstItem = dutyList[0];
    //   // dutyList.shift();
    //   // dutyList.push(firstItem);
    //   this.setState({
    //     scrollData: scrollData--
    //   })
    // } else {
    //   scrollData = 0;
    //   let firstItem = dutyList[0];
    //   dutyList.shift();
    //   dutyList.push(firstItem);
    // }
  }, 50)
}

```

**操作重点**
+ 数组操作: 1️⃣`shift()`, 2️⃣`push(dutyList[0])`
+ react: `setState`

### 第四步 `鼠标移入移出/ 组件卸载` 清除定时器
```ts
removeAnimationInterval() {
  this.state.animationInterval && clearInterval(this.state.animationInterval);
}

componenWillUnmount() {
  this.removeAnimationInterval();
}
```

## 附录 完整代码
**CarouselList.js**
```ts
export default class CarouselList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            scrollData: 0
        };
    }

    componentDidMount = () => {
        this.addHandleTimer();
    };

    componentWillUnmount = () => {
        this.removeHandleTimer();
    }
    //timers
    addHandleTimer = () => {
        let { data, scrollData } = this.state;
        if (!data || !data.length) return null;
        this.timer = setInterval(() => {
            if (scrollData > -27) {
                scrollData--;
                this.setState({
                    scrollData: scrollData
                })
            } else {
                scrollData = 0;
                let firstData = data[0];
                data.shift();
                data.push(firstData);
            }
        }, 70);
    }

    removeHandleTimer = () => {
        this.timer && clearInterval(this.timer);
    }

    handleScroll = e => {
        const ev = e || window.event;
        e.preventDefault();
        const conDom = this.refs["content"];
        const speed = 5; // scroll speed
        if (ev.deltaY > 0) {
            conDom.scrollTop += speed;
        } else {
            conDom.scrollTop -= speed;
        }
    };

    render() {
        const { data, scrollData } = this.state;
        return (
            <div
                ref="content"
                onMouseEnter={this.removeHandleTimer}
                onMouseLeave={this.addHandleTimer}
                onWheel={this.handleScroll}
            >
                <ul style={{ marginTop: scrollData + "px" }}>
                    {
                        data.length > 0 && data.map((item, index) => {
                            return (
                                this.props.type === 'simple' ?
                                    <li key={index}><p title={item.value}>{item.value}</p></li>
                                    : <li key={index}><span>{item.id}</span><p title={item.intelligence}>{item.intelligence}</p></li>
                            )
                            // 默认：complex
                            {/*<li key={index}><span>{item.id}</span><p title={item.intelligence}>{item.intelligence}</p></li>*/ }
                        }
                        )
                    }
                </ul>
            </div>
        );
    }
}

```

**CarouselList2.js**
```ts
export default class CarouselList2 extends Component {
    constructor(props) {
        super(props);
        console.log('是大法官',this.props.data)
        this.state = {
            data: this.props.data,
            scrollData: 0
        };
    }

    componentDidMount = () => {
        this.addHandleTimer();
    };

    componentWillUnmount = () => {
        this.removeHandleTimer();
    };
    //timers
    addHandleTimer = () => {

        let {data, scrollData} = this.state;
        if (!data || !data.length) return null;
        if(data.length < 5 ) return false;
        this.timer = setInterval(() => {
            if (scrollData > -52) {
                scrollData--;
                this.setState({
                    scrollData: scrollData
                })
            } else {
                scrollData = 0;
                let firstData = data[0];
                data.shift();
                data.push(firstData);

                let firstData1 = data[0];
                data.shift();
                data.push(firstData1);
            }
        }, 70);
    }

    removeHandleTimer = () => {
        this.timer && clearInterval(this.timer);
    }

    handleScroll = e => {
        const ev = e || window.event;
        e.preventDefault();
        const conDom = this.refs["content"];
        const speed = 6; // scroll speed
        if (ev.deltaY > 0) {
            conDom.scrollTop += speed;
        } else {
            conDom.scrollTop -= speed;
        }
    };

    render() {
        const {data, scrollData} = this.state;
        return (
            <div
                ref="content"
                onMouseEnter={this.removeHandleTimer}
                onMouseLeave={this.addHandleTimer}
                onWheel={this.handleScroll}
            >
                <ul style={{marginTop: scrollData + "px"}}>
                    {
                        data.length > 0 && data.map((item, index) => {
                                return (
                                    this.props.type === 'superior' ?
                                        <li key={item.id}>
                                            <p title={item.name}>{item.name}</p>
                                            <p title={item.card}>{item.card}</p>
                                            <p title={item.show}>{item.show}</p>
                                            <p title={item.feedback}>{item.feedback}</p>
                                            <p title={item.state}>{item.state}</p>
                                        </li>
                                        : <li key={item.id}>
                                            <p title={item.name}>{item.name}</p>
                                            <p title={item.card}>{item.card}</p>
                                            <p title={item.time}>{item.time}</p>
                                            <p title={item.origin}>{item.origin}</p>
                                            <p title={item.destination}>{item.destination}</p>
                                        </li>
                                )
                            }
                        )
                    }
                </ul>
            </div>
        );
    }
}
```

**InformationOnDuty.js**
```ts
import "./InformationOnDuty.scss"
import { hidden } from "ansi-colors";

class InformationOnDuty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dutyList: [],
      scrollData: 0,
      inital: true
    };
    this.getOnDutyListData = this.getOnDutyListData.bind(this);
    this.animationInterval = this.animationInterval.bind(this);
    this.removeAnimationInterval = this.removeAnimationInterval.bind(this);
    this.getOnDutyListData();
  }

  getOnDutyListData() {
    axios({
      method: 'GET',
      url: `/OnDutyList`,
    }).then(res => {
      this.setState({
        dutyList: res.data.result
      }, () => this.animationInterval())
    })
  }

  animationInterval() {
    let { scrollData, dutyList } = this.state;
    if (!dutyList.length) return;
    this.state.animationInterval = setInterval(() => {
      this.setState({
        scrollData: scrollData--
      });
      
      let firstItem = dutyList[1];

      if (scrollData < 0 && scrollData > -2) {
        if (this.state.inital) {
          dutyList.push(dutyList[0]);
          this.setState({
            inital: false
          })
        }
      }

      // dutyList.push(firstItem);
      if (scrollData % 128 === 0) {
        // debugger

        dutyList.shift();

        dutyList.push(firstItem);
        scrollData = 0;
        // debugger
      }
      // if (scrollData > -113) {
      //   let firstItem = dutyList[0];
      //   // dutyList.shift();
      //   // dutyList.push(firstItem);
      //   this.setState({
      //     scrollData: scrollData--
      //   })
      // } else {
      //   scrollData = 0;
      //   let firstItem = dutyList[0];
      //   dutyList.shift();
      //   dutyList.push(firstItem);
      // }
    }, 60)

  }

  removeAnimationInterval() {
    this.state.animationInterval && clearInterval(this.state.animationInterval);
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
    debugger

  }

  componenWillUnmount() {
    this.removeAnimationInterval();
  }

  render() {
    let { dutyList, scrollData } = this.state;
    return (
      <div className="InformationOnDuty">
        <div className="title">
          <div className="tit1"><span>值班信息</span></div>
          <div className="tit2"><span>查看值班表</span></div>
        </div>
        <div
          className="contetn"
          ref="content"
          onMouseEnter={this.removeAnimationInterval}
          onMouseLeave={this.animationInterval}
          style={{overflow: "hidden"}}
        // onWheel={}
        >
          <div style={{ marginTop: scrollData + "px" }}>
            {
              dutyList.map((item, index) => {
                return (
                  <div className="card" key={`${item.title}:${item.name}${index}`}>
                    <div className="row1">
                      <span>{item.title}&nbsp;</span><b>&nbsp;|&nbsp;</b><span>{item.name}</span>
                    </div>
                    <div className="row2">
                      <span className={item.title.length > 3 ? 'nbsp4' : 'nbsp3'}>电话&nbsp;</span><b>&nbsp;|&nbsp;</b><span>{item.phone}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>

        </div>
      </div>
    )
  }
}

export default InformationOnDuty;
```