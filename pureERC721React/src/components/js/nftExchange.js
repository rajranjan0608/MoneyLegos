import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';

import App from '../../App';
import '../css/dashboard.component.css';
import NoMetamask from './noMetamaskModal';
import AccountCard from './accountCard';
import Color from '../abis/Color.json'
import '../css/Color.css'

import {
    Card,
    CardBody,
    Col
} from 'reactstrap';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { MetaMaskButton , EthAddress, QR} from 'rimble-ui';
import BuyNFT from './buyNFT';

class NFTExchange extends Component {
    
    constructor(props) {
        super(props);
        this.loadWeb3 = this.loadWeb3.bind(this);
        this.initCheck = this.initCheck.bind(this);
        this.loadColor = this.loadColor.bind(this);
        this.state = {
            account: '0x0',
            balance: 0,
            networkID: null,
            hasMetamask: false,
            isUnlocked: false,
            contract: null,
            colors: [],
            totalSupply: 0
        }
        setInterval(this.initCheck, 100);
        this.loadColor();
    }

    ls = window.localStorage;

    async initCheck() {
        var app = new App();
        NFTExchange.web3 = await app.loadWeb3();
        if(NFTExchange.web3 !== false) {
            this.ls.hasMetamask = true;
            this.setState({hasMetamask: true});
            var accounts = await NFTExchange.web3.eth.getAccounts()
            if(accounts.length !== 0) {
                this.ls.isUnlocked = true;
                this.ls.account = accounts[0]
                this.ls.balance = await NFTExchange.web3.utils.fromWei(await NFTExchange.web3.eth.getBalance(accounts[0]), "ether");
                this.ls.networkID = await NFTExchange.web3.eth.net.getId();
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
        NFTExchange.web3 = await app.loadWeb3();
        if(NFTExchange.web3 !== false) {
            this.ls.hasMetamask = true;
            this.setState({hasMetamask: true});
            var accounts = await NFTExchange.web3.eth.getAccounts()
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
        return NFTExchange.web3;
    }

    mint = (color) => {
        var ok = 1;
        if(color.charAt(0) == '#' && color.length == 7) {
            for(var i = 1; i <= 6; i++) {
                if(color.charAt(i) > 'f' ){
                    ok = 0;
                }
            }
            if(ok) {
                this.state.contract.methods.mint(color).send({ from: this.state.account })
                    .once('receipt', (receipt) => {
                    this.setState({
                        colors: [color, ...this.state.colors]
                    })
                })
            } else {
                alert('Invalid Color!')
            }
        } else {
            alert('Invalid Color!')
        }
        
    }

    loadColor = async () => {
        const app = new App()
        const web3 = await app.loadWeb3();
        const networkId = await web3.eth.net.getId()
        const networkData = Color.networks[networkId]
        if(networkData) {
            const abi = Color.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            this.setState({ contract })
            const totalSupply = await contract.methods.totalSupply().call()
            this.setState({ totalSupply })
            // Load Colors
            for (var i = 1; i <= totalSupply; i++) {
                const color = await contract.methods.colors(i - 1).call()
                this.setState({
                colors: [color, ...this.state.colors]
                })
            }
        } else {
            window.alert('Smart contract not deployed to detected network.')
        }
    }

    render() {

        var i = 0;
        var temp = '';

        var dashTemp =  
        
            <div className = "">

                <div className = "card" style = {{width:950, height:550, marginTop:11, overflow:"scroll"}}>
                    <div className="row" style = {{marginTop:20, marginLeft: 20}}>
                        <main role="main" className="">
                            <div className="content mr-auto ml-auto">
                                <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const color = this.color.value
                                        this.mint(color)
                                    }}>
                                    <input
                                        type='text'
                                        className='form-control mb-1'
                                        placeholder='e.g. #99aa11'
                                        ref={(input) => { this.color = input }}
                                    />
                                    <input
                                        type='submit'
                                        className='btn btn-block btn-primary'
                                        value='MINT TOKEN'
                                    />
                                </form>
                            </div>
                        </main>
                    </div>
                    <hr/>
                    <div className="row text-center">
                        { this.state.colors.map((color, key) => {
                            if(key == 2000) {
                                
                            } else {
                                return(
                                    <div key={key} className="col-md-3 mb-3">
                                        <BuyNFT 
                                            className="card token shadow-lg" 
                                            style={{ 
                                                backgroundColor: color, 
                                                border: "solid", 
                                                borderColor: "white", 
                                                cursor:"pointer" 
                                            }}
                                            color={color}
                                        />
                                    </div>
                                )
                            }
                        })}
                        </div>
                </div>
    

                {/* <center><h4 className = "container">Hello Raj, Welcome to <font color = "green">Hacker</font> NFTExchange</h4></center><br/> */}

                <div className="grid-container2">

                    <AccountCard account = {this.state.account} balance = {this.state.balance}/>

                </div>
                
                <br/>

                <div style = {{bottom: 30, right: 40, position: "absolute"}}>
                    <NoMetamask text={this.mm()} hasMetamask={this.state.hasMetamask} isUnlocked={this.state.isUnlocked}/>
                </div>
                
            </div>

        return(dashTemp);
    }
}

export default NFTExchange;
