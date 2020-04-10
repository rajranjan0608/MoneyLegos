import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';

import App from '../../App';
import '../css/dashboard.component.css';
import NoMetamask from './noMetamaskModal';
import ExchangeForm from './exchangeForm';

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
        this.loadWeb3 = this.loadWeb3.bind(this);
        this.initCheck = this.initCheck.bind(this);
        this.state = {
            account: '0x0',
            balance: 0,
            networkID: null,
            hasMetamask: false,
            isUnlocked: false
        }
        setInterval(this.initCheck, 100);
    }

    ls = window.localStorage;

    async initCheck() {
        var app = new App();
        Dashboard.web3 = await app.loadWeb3();
        if(Dashboard.web3 !== false) {
            this.ls.hasMetamask = true;
            this.setState({hasMetamask: true});
            var accounts = await Dashboard.web3.eth.getAccounts()
            if(accounts.length !== 0) {
                this.ls.isUnlocked = true;
                this.ls.account = accounts[0]
                this.ls.balance = await Dashboard.web3.utils.fromWei(await Dashboard.web3.eth.getBalance(accounts[0]), "ether");
                this.ls.networkID = await Dashboard.web3.eth.net.getId();
                this.setState({account: accounts[0], isUnlocked: true, balance: this.ls.balance, networkID: this.ls.networkID})
            } else {
                this.ls.account = "0x0";
                this.ls.balance = 0;
                this.ls.isUnlocked = false;
                this.setState({isUnlocked: false, balance: 0})
            }
        } else {
            this.ls.isUnlocked = false;
            this.ls.hasMetamask = false;                
            this.setState({isUnlocked: false, hasMetamask: false})
            this.ls.account = "0x0";
            this.ls.balance = 0;
        }
    }

    mm() {
        if(this.ls.hasMetamask == "true"){
            if(this.ls.isUnlocked == "true") {
                return "Connected to Metamask";
            }
            return "Log in to Metamask";
        } else {
            return "Install Metamask";
        }
    }

    async loadWeb3() {
        var app = new App();
        Dashboard.web3 = await app.loadWeb3();
        if(Dashboard.web3 !== false) {
            this.ls.hasMetamask = true;
            this.setState({hasMetamask: true});
            var accounts = await Dashboard.web3.eth.getAccounts()
            alert(accounts)
            if(accounts.length !== 0) {
                this.ls.isUnlocked = true;
                this.setState({
                    account: accounts[0],
                    isUnlocked: true
                })
                this.ls.account = accounts[0];
            } else {
                this.ls.account = "0x0";
                this.ls.isUnlocked = false;
                window.ethereum.enable()
                this.setState({isUnlocked: false, account: "0x0"})
            }
        } else {
            this.ls.isUnlocked = false;
            this.ls.hasMetamask = false;
            this.ls.account = "0x0";
            this.setState({isUnlocked: false, hasMetamask: false})
            alert("metamask is uninstalled");
        }
    }

    render() {

        var dashTemp =  
        
            <div className = "">

                {/* <center><h4 className = "container">Hello Raj, Welcome to <font color = "green">Hacker</font> Dashboard</h4></center><br/> */}

                <div className="grid-container2">

                    <ExchangeForm account = {this.state.account} balance = {this.state.balance} networkID = {this.state.networkID}/>
                    
                </div>
                
                <br/>

                <EthAddress style = {{width:550, bottom: 30, left: 10, position: "absolute"}} address={this.state.account} size = {40}/>
                
                <div style = {{bottom: 30, right: 40, position: "absolute"}}>
                    <NoMetamask text={this.mm()} hasMetamask={this.state.hasMetamask} isUnlocked={this.state.isUnlocked}/>
                </div>
                
            </div>

        return(dashTemp);
    }
}

export default Dashboard;
