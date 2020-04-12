import React from "react";
import Input from "./InputComponent/index";

import '../css/dashboard.component.css';

import plus from '../assets/icons/plus.png'


export default function Pool() {
    return (

        <div className = "" style = {{ top: 20, left: 10, position: "relative"}}>
            
            <div>
                <div>
                    <div>
                        <Input typeOfInput = "Deposit"/> 
                    </div>

                    {/* <div className = "grid-item" style = {{marginTop: 10}}>
                        <img src = {plus} style = {{width: 20}}/>
                    </div> */}
                    <br />

                    <div>
                        <Input typeOfInput = "Deposit"/> 
                    </div>
                </div>

                <br />
                {/* <input className = "form-control" placeholder = "Recepient's address 0x0"/>
                <br /> */}
                <center>
                    <button className = "btn btn-primary">In Beta!</button>
                </center>
                <br />
            </div>

        </div>

    )
} 