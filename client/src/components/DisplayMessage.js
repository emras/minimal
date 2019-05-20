//1558151982318
import React, { Component } from 'react';
import axios from "axios";

export default class DisplayMessage extends Component {
    constructor(props) {
        super(props);
    };


    expireMessage() {
        axios.post("http://localhost:3001/api/updateData", {
            id: this.props.messageid
        }).then(data => {
            let result = data.data;
            if (!result.success) console.log(result.error.message);
        });
    };

    componentDidMount() {
        this.expireMessage();
    };

    render() {
        return (
            <div className="text-center text-white justify-content-center align-items-center">
                {
                    !this.props.expired &&
                    <div>
                        <textarea className="form-control rounded" readOnly={true} value={this.props.message}/>
                    </div>
                }
                {
                    this.props.expired &&
                    <h4>
                        Message Expired
                    </h4>
                }
            </div>
        );
    };
}