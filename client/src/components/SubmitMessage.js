import React, { Component } from 'react';
import axios from "axios";
import ClipboardCopy from "./ClipboardCopy.js"

export default class SubmitMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            success: false,
            messageid: ''
        };
        this.submit = this.submit.bind(this);
    };

    submit(e) {
        e.preventDefault();

        this.setState({ success: false });
        axios.post("http://localhost:3001/api/putData", {
            message: this.state.message
        }).then(data => {
        	let result = data.data;
            if (result.success) {
                this.setState({ success: true });
                this.setState({ messageid: result.data });
                this.setState({ message: '' });
            } else console.log(result.error.message);
        });

    };

    render() {
        return (
            <div className="col-md-12 col-md-offset-12 text-center input-group text-white justify-content-center">
                <textarea className="form-control top rounded" placeholder="Enter your message" value={this.state.message} onChange={e => this.setState({ message: e.target.value })}/>
                <button className="btn btn-peach btn-block bottom rounded" disabled={!this.state.message} onClick={ this.submit }>
                	<span className="glyphicon glyphicon-send"></span> SUBMIT
                </button>

                {
                	this.state.success &&
                	<span className="col-md-10 col-md-offset-10">
                		Share your message id: <ClipboardCopy messageid={this.state.messageid}/>
                	</span>
                }
            </div>
        );
    };
}