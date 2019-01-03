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