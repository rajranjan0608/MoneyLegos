import React, {useState} from "react";
import InputSelect from "./inputSelect";
import RequestRopsten from "./requestRopsten";

import '../css/dashboard.component.css';

import repeat from '../assets/icons/repeat.svg'
import ether from '../assets/icons/ether.svg'

import Tab from './tabs';

import NetworkIndicator from '@rimble/network-indicator'
import { ShowChart } from "rimble-ui";

import AccountCard from "./accountCard";

export default function ExchangeForm(props) {

    return (

        <div className = "grid-container">
            
            <Tab account = {props.account}/>

            <AccountCard account = {props.account} balance = {props.balance}/>
        
        </div>
    )
} 