import React, {useState} from "react";
import InputSelect from "./inputSelect";
import RequestRopsten from "./requestRopsten";

import '../css/dashboard.component.css';

import repeat from '../assets/icons/repeat.svg'
import ether from '../assets/icons/ether.svg'

import Tab from './tabs';

import NetworkIndicator from '@rimble/network-indicator'
import { ShowChart } from "rimble-ui";

export default function ExchangeForm(props) {

    const [showComponent, changeComponent] = useState(1);



    return (

        <div className = "grid-container">
            
            <Tab account = {props.account}/>

            <div className = "card shadow-lg p-3 mb-5 bg-white rounded" style = {{width: 350, top: 90, right: 10, position: "absolute"}}>
                
                <span style = {{margin: 10, marginBottom: -10}}>
                    <NetworkIndicator currentNetwork={window.localStorage.networkID} requiredNetwork={3} />
                    <hr />
                </span>
                
                <div className="" style = {{marginLeft: 10}}>
                    <img className="card" src={ether} style={{marginTop: -40, marginRight: 10, display: "inline-block", height: 50, width: 50, borderRadius: 25}}/>
                    <div className="" style = {{display: "inline-block"}}>
                        <h3>{props.balance} ETH</h3>
                        <font title = "Copy to clipboard" size = "2" className = "text-muted card" style={{cursor: "pointer", textAlign: "center", marginTop: 0, width:100, borderRadius: 15}}>{props.account.substring(0, 6)}...{props.account.substring(38, 42)}</font>
                    </div>
                    <hr />
                </div>

                <div style = {{marginLeft: 10}} className = "text-muted">
                    <RequestRopsten />
                </div>
                
            </div>
        
        </div>
    )
} 