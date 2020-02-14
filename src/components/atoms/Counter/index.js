import React from 'react'

export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: this.props.from };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
        if (this.timer == 0 && this.state.counter > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        this.setState({ counter: this.state.counter - 1 });

        if (this.state.counter === 0) { 
            clearInterval(this.timer);
        }
    }

    render() {
        return(<span style={{ display: 'contents' }}>{this.state.counter}</span>)
    }
}