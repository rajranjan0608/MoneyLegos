import React, {Component} from "react";
import { render } from "react-dom";
import { Tabs } from "@yazanaabed/react-tabs";

import Swap from './swap';
import Send from './send';
import Pool from './pool';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class Tab extends Component {

    constructor(props) {
        super(props);
    }

  render() {
    return (
        <div className = "card shadow-lg p-3 mb-5 bg-white rounded" style = {{margin: 10, width: 580}}>
            <Tabs
            style = {styles}
            activeTab={{
                id: "tab1"
            }}
            >
                <Tabs.Tab id="tab1" title="Swap">
                    <div style={{ padding: 0 }}><Swap account = {this.props.account}/></div>
                </Tabs.Tab>
                <Tabs.Tab id="tab2" title="Send">
                    <div style={{ padding: 0 }}><Send /></div>
                </Tabs.Tab>
                <Tabs.Tab id="tab3" title="Pool">
                    <div style={{ padding: 0 }}><Pool /></div>
                </Tabs.Tab>
            </Tabs>
        </div>
    )
  }
}
