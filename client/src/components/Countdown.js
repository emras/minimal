import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsRemaining: props.seconds
        };
    };

    countDown(timeRemaining) {
        this.setState({ timeRemaining });

        if (timeRemaining === 0) {
            this.props.callbackFunc();
        }

        if (timeRemaining > 0) {
            this.setState({ secondsRemaining: timeRemaining });
            timeRemaining -= 1;
            this.setTimeoutId = setTimeout(this.countDown.bind(this, timeRemaining), 1000);
        }
    }

    componentDidMount() {
        this.countDown(this.state.secondsRemaining);
    }

    componentWillUnmount() {
        clearTimeout(this.setTimeoutId);
    }

    render() {
        return (
            <div className="col-md-12 col-md-offset-12 text-center text-white">
                <FontAwesomeIcon icon={["far","clock"]} /> Expires in { this.state.secondsRemaining }s...
            </div>
        );
    };
}