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
