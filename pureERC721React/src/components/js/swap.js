import React from "react";
// import InputSelect from "./inputSelect";

import '../css/dashboard.component.css';
import Input from './InputComponent/index.js';
import {swap, getPermit} from './contracts/index';
import ABI from './contracts/config';

import repeat from '../assets/icons/repeat.svg'


export default function Swap(props) {

    const swp = async () => {
        await getPermit(ABI.config.address.mETH, 1); 
        await swap(props.account, 1, ABI.config.address.mETH, ABI.config.address.mDAI, ABI.config.address.routerAddress)
    }

    return (

        <div className = "" style = {{ top: 20, left: 10, position: "relative"}}>
            
            <centers style = {{margin: 10}}>
                <div className = "">
                    <div>
                        <Input typeOfInput = "You Send"/> 
                    </div>

                    {/* <div className = "grid-item" style = {{marginTop: 10}}>
                        <img src = {repeat} style = {{width: 20}}/>
                    </div> */}<br />

                    <div>
                        <Input typeOfInput = "You Get"/> 
                    </div>
                </div>

                <br />
                <input className = "form-control shadow rounded" style = {{width: 400}} disabled placeholder = {"Your address "+props.account}/>
                <br />
                
                <center>
                    <button className = "btn btn-primary shadow rounded" onClick = {() => {swp()}}>Swap</button>
                </center>
                <br />
            </centers>

        </div>
    
    )
} 