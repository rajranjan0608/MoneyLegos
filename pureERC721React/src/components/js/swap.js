import React from "react";
import InputSelect from "./inputSelect";

import '../css/dashboard.component.css';

import repeat from '../assets/icons/repeat.svg'


export default function Swap(props) {
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
                <input className = "form-control" style = {{width: 532}} disabled placeholder = {"Your address "+props.account}/>
                <br />
                
                <center>
                    <button className = "btn btn-primary">Swap</button>
                </center>
                <br />
            </div>

        </div>
    
    )
} 