import React from "react";
import InputSelect from "./inputSelect";

import '../css/dashboard.component.css';

import plus from '../assets/icons/plus.png'


export default function Pool() {
    return (

        <div className = "" style = {{width: 560, top: 20, left: 10, position: "relative"}}>
            
            <div style = {{margin: 10}}>
                <div className = "grid-container3">
                    <div className = "grid-item">
                        <InputSelect/> 
                    </div>

                    <div className = "grid-item" style = {{marginTop: 10}}>
                        <img src = {plus} style = {{width: 20}}/>
                    </div>

                    <div className = "grid-item">
                        <InputSelect/> 
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