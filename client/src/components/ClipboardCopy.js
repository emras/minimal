import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/fontawesome-free-regular';

export default class ClipboardCopy extends Component {
    constructor(props) {
        super(props);
        this.state = { copySuccess: '' };
        this.copyText = this.copyText.bind(this);
    };


    copyText(e) {
        e.preventDefault();

        var textField = document.createElement('textarea');
        textField.innerText = this.props.messageid;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();

        this.setState({copySuccess: 'Copied!'});
    }

    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control left rounded" disabled={true} value={this.props.messageid}/>
                    <div className="input-group-append">
                        <button className="btn btn-peach rounded right" onClick={this.copyText}>
                            <FontAwesomeIcon icon={["far", "copy"]} />
                        </button>
                    </div>
                </div>
                <span>{ this.state.copySuccess }</span>
            </div>
        );
    };
}