//1558151982318
import React, { Component } from 'react';
import DisplayMessage from "./DisplayMessage.js";
import Countdown from "./Countdown.js";
import axios from "axios";

export default class GetMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageid: '',
            submitted: false,
            expired: '',
            message: ''
        };
        this.submitMessageId = this.submitMessageId.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    getMessage() {
        axios.post("http://localhost:3001/api/getById", {
            id: this.state.messageid
        }).then(data => {
            this.setState({ submitted: true });
            let result = data.data;
            if (!result.success) {
                this.setState({ success: false });
                this.setState({ error: result.error.message });
            } else {
                if (result.data[0]) {
                    this.setState({ message: result.data[0].message });
                    this.setState({ expired: false });
                } else this.messageExpired();
            }
        });
    };

    submitMessageId(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        this.getMessage();
    };

    handleInputChange(e) {
        e.preventDefault();

        this.setState({ submitted: false });
        this.setState({ messageid: e.target.value.trim() });
    };


    messageExpired = () => {
        this.setState({ expired: true });
        setTimeout(() => {
            this.setState({ submitted: false });
            this.setState({ messageid: '' });
        }, 3000);
    }

    render() {
        return (
            <div className="col-md-8 col-md-offset-8 text-center text-white">
            	{
            		!this.state.submitted &&
            		<div className="input-group mb-3">
		                <input type="text" className="form-control left rounded" placeholder="Enter message id to view" value={this.state.messageid} onChange={ this.handleInputChange }/>
		                <div className="input-group-append">
		                	<button className="btn btn-peach btn-block right rounded" disabled={ !this.state.messageid } onClick={ this.submitMessageId }>
		                		SUBMIT
		                	</button>
		                </div>
	                </div>
   		        }
                {
                	this.state.submitted &&
	                <div>
	                	<DisplayMessage messageid={ this.state.messageid } expired={ this.state.expired } message={ this.state.message }/>
	                    { 
	                    	!this.state.expired &&
	                    	<Countdown seconds="10" callbackFunc={this.messageExpired}/>
	                    }
                    </div>
                }
            </div>
        );
    };
}