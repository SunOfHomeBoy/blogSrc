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
