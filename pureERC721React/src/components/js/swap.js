import React from "react";
// import InputSelect from "./inputSelect";

import '../css/dashboard.component.css';
import Input from './InputComponent/index.js';

import repeat from '../assets/icons/repeat.svg'


export default function Swap(props) {
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
                <input className = "form-control" style = {{width: 400}} disabled placeholder = {"Your address "+props.account}/>
                <br />
                
                <center>
                    <button className = "btn btn-primary">Swap</button>
                </center>
                <br />
            </centers>

        </div>
    
    )
} 