import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/js/navabar.component";
import Dashboard from "./components/js/dashboard.component"
import NFTExchange from "./components/js/nftExchange"

import Web3 from 'web3'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
	        electionCount: 0
        }
        this.loadWeb3();
    }

    //Returns Web3 instance
    async loadWeb3() {
        let web3 = window.web3;  
      
        //set web3 & truffle contract
        if (typeof web3 !== 'undefined') {
        
            //Setup Web3 Provider
            this.web3Provider = web3.currentProvider;  
            this.web3 = new Web3(web3.currentProvider);

            return this.web3;

        }else{
            return false;
        }
    }

    render() {
        return (
            <Router>
                <Navbar account = {this.state.account}/><br/>
                { <Route path="/swap" exact component={Dashboard} />}
                { <Route path="/nftExchange" exact component={NFTExchange} />}
            </Router>
        );
    }
}

export default App;
