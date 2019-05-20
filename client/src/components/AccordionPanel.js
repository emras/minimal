import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class AccordionPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            href: "#" + this.props.id
        };
    };


    render() {
        return (

            <div className="card rounded peach-gradient">
                <div className="rgba-stylish-strong z-depth-1 mb-1 rounded" role="tab" id="heading1">
                    <a data-toggle="collapse" data-parent="#accordionEx7" href={this.state.href} aria-expanded="true"
                    aria-controls={this.props.id}>
                        <h5 className="mb-0 text-white text-uppercase font-thin text-center">
                            { this.state.name } <FontAwesomeIcon icon={this.props.icon} />
                        </h5>
                    </a>
                </div>

                <div id={this.props.id} className={this.props.initial} role="tabpanel" aria-labelledby="heading1"
                  data-parent="#accordionEx7">
                    <div className="row justify-content-center align-items-center card-body mb-1 rgba-grey-light white-text">
                        { this.props.content }
                    </div>
                </div>
            </div>
        );
    };
}