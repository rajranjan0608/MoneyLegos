import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';

import App from '../../App';
import '../css/dashboard.component.css';

import {
    Card,
    CardBody,
    Col
} from 'reactstrap';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { MetaMaskButton , EthAddress, QR} from 'rimble-ui';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            electionCount : 0,
        }
    }

    // async loadInstance() {
    //     var app = new App();
    //     Dashboard.mainInstance = await app.loadInstance(); 
    //     const electionCount = await Dashboard.mainInstance.electionID();
    //     var result = Object.values(electionCount)
    //     this.setState({electionCount: result})       
    // }

    render() {
        // this.loadInstance();
        
        var dashTemp =  
        
            <div className = "">

                <center><h4 className = "container">Hello Raj, Welcome to <font color = "green">Hacker</font> Dashboard</h4></center><br/>

                <div className="grid-container2">

                    
                </div>
                
                <br/>

                <EthAddress style = {{width:550, bottom: 30, left: 10, position: "absolute"}} address="0x9505C8Fc1aD98b0aC651b91245d02D055fEc8E49" size = {40}/>
                
                <div style = {{bottom: 30, right: 40, position: "absolute"}}>
                    <MetaMaskButton>MetaMask</MetaMaskButton>
                </div>
                
            </div>

        return(dashTemp);
    }
}

export default Dashboard;
