// /client/App.js
import React, { Component } from "react";
import SubmitMessage from './components/SubmitMessage';
import AccordionPanel from './components/AccordionPanel';
import GetMessage from './components/GetMessage';
import DataDisplay from './components/DataDisplay';
import axios from "axios";



class App extends Component {

    render() {
        return (
          <div className="container h-100">
            <div className="row accordion-gradient-bcg h-100 justify-content-center align-items-center text-center">
            <div className="col-md-8">
            <h1 className="txt-peach">Minimal</h1>
            <h6 className="txt-gray">Simple messaging that allows for sharing and viewing up to 10 seconds.</h6>
            <div className="accordion col-md-12 md-accordion accordion-2" id="accordionEx7" role="tablist"
      aria-multiselectable="true">
            <AccordionPanel name="CREATE" icon={["far", "envelope"]} initial="collapse show" id="accordion1" content={<SubmitMessage/>}/>
            <AccordionPanel name="READ" icon={["far", "envelope-open"]} initial="collapse" id="accordion2" content={<GetMessage/>}/>
            <AccordionPanel name="DATA" icon={["far", "chart-bar"]} initial="collapse" id="accordion3" content={<DataDisplay/>}/>
            </div>
            </div>
            </div>
          </div> 
        );
    }
}

export default App;