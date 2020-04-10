import React from "react";
import InputSelect from "./inputSelect";

import '../css/dashboard.component.css';

import repeat from '../assets/icons/repeat.svg'


export default function Send() {
    return (

        <div className = "" style = {{width: 560, top: 20, left: 10, position: "relative"}}>
            
            <div style = {{margin: 10}}>
                <div className = "grid-container3">
                    <div className = "grid-item">
                        <InputSelect/> 
                    </div>

                    <div className = "grid-item" style = {{marginTop: 10}}>
                        <img src = {repeat} style = {{width: 20}}/>
                    </div>

                    <div className = "grid-item">
                        <InputSelect/> 
                    </div>
                </div>

                <br />
                <input className = "form-control" style = {{width: 532}} placeholder = "Recepient's address 0x0"/>
                <br />
                <center>
                    <button className = "btn btn-primary">Send</button>
                </center>
                <br />
            </div>

        </div>

    )
} 