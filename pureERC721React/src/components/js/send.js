import React from "react";
import Input from "./InputComponent/index";

import '../css/dashboard.component.css';

import repeat from '../assets/icons/repeat.svg'


export default function Send() {
    return (

        <div className = "" style = {{ top: 20, left: 10, position: "relative"}}>
            
            <div>
                <div>
                    <div>
                        <Input typeOfInput = "You Send"/> 
                    </div>

                    {/* <div className = "grid-item" style = {{marginTop: 10}}>
                        <img src = {repeat} style = {{width: 20}}/>
                    </div> */}
                    <br />

                    <div>
                        <Input typeOfInput = "Address will receive"/> 
                    </div>
                </div>

                <br />
                <input className = "form-control shadow rounded" style = {{width: 400}} placeholder = "Recepient's address 0x0"/>
                <br />
                <center>
                    <button className = "btn btn-primary shadow rounded">Send</button>
                </center>
                <br />
            </div>

        </div>

    )
} 