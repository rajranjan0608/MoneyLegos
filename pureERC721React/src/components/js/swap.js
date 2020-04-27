import React from "react";
// import InputSelect from "./inputSelect";

import '../css/dashboard.component.css';
import Input from './InputComponent/index.js';
import {swap, getPermit} from './contracts/index';
import ABI from './contracts/config';

import repeat from '../assets/icons/repeat.svg'


export default class Swap extends React.Component {

    constructor(props) {
        super(props);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleInputToken = this.handleInputToken.bind(this);
        this.handleOutputToken = this.handleOutputToken.bind(this);
        this.state = {
            amount: '',
            inputToken: '',
            outputToken: ''
        }
    }

    handleAmount(e) {
        this.setState({amount:e.target.value})
    }

    handleInputToken(selectedCategory) {
        this.setState({inputToken:selectedCategory})
    }

    handleOutputToken(selectedCategory) {
        this.setState({outputToken:selectedCategory})
    }

    print() {
        console.log(this.state);
    }

    swp = async (inputToken, outputToken, amount) => {
        await getPermit(inputToken, amount); 
        await swap(this.props.account, amount, ABI.config.address[inputToken], ABI.config.address[outputToken], ABI.config.address.routerAddress)
    }

    render () {

        return(
        <div className = "" style = {{ top: 20, left: 10, position: "relative"}}>
            
            <centers style = {{margin: 10}}>
                <div className = "">
                    <div>
                        <Input amount = {this.handleAmount} token = {this.handleInputToken} typeOfInput = "You Send"/> 
                    </div>

                    {/* <div className = "grid-item" style = {{marginTop: 10}}>
                        <img src = {repeat} style = {{width: 20}}/>
                    </div> */}<br />

                    <div>
                        <Input token = {this.handleOutputToken} typeOfInput = "You Get"/> 
                    </div>
                </div>

                <br />
                <input className = "form-control shadow rounded" style = {{width: 400}} disabled placeholder = {"Your address " + this.props.account}/>
                <br />
                
                <center>
                    <button className = "btn btn-primary shadow rounded" onClick = {() => {this.swp(this.state.inputToken, this.state.outputToken, this.state.amount)}}>Swap</button>
                </center>
                <br />
            </centers>

        </div>
        )
    
    }
} 