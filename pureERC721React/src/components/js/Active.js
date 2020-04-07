import React, { Component, useState, useEffect } from 'react';

import App from '../../App';
import ABI from '../../ABI';
import { DiscFull, Loader } from 'rimble-ui';
import VoteModal from './VoteModal';

var Election = props => (
    <tr>
        <td>{props.election.electionID}</td>
        <td>{props.election.electionName}</td>
        {/* <td>{props.election.sdate}</td>
        <td>{props.election.edate}</td> */}
        <td style = {{color:"green"}}>Active</td>
        <td>{props.election.algorithm}</td>
        <td><VoteModal election = {props.election} candidates = {props.candidates}/></td>
    </tr>
)

class Active extends Component {

    constructor(props) {
        super(props);
        this.state = {
            electionID: 0,
            electionName: "",
            sdate: 0,
            edate: 0,
            data: [
                <Election election = {
                    {electionID:0,
                    electionName: "Default Candidate",
                    sdate: 0,
                    edate: 0,
                    algorithm: "Default"   
                    }
                } candidates = {
                    {
                        electionID: 0,
                        name: "Default Candidate",
                        voteCount: 0}
                }/>
            ],
            loading: false
        }
        this.loadInstance();
    }
    
    async loadInstance() {
        var app = new App();
        Active.mainInstance = await app.loadInstance();
        Active.web3 = await app.loadWeb3();
    }

    loader = false;

    loadData = async () => {
        this.setState({loading:true})
        var eCount = await Active.mainInstance.electionID();
        var elections = [];
        var res = [];
        var elec = []
        for(var i = 1; i <= eCount; i++) {
            elections[i] = await Active.mainInstance.Elections(i);
            var election = await new Active.web3.eth.Contract(ABI, elections[i]);
            res[i] = [];
            res[i].electionName = await election.methods.name().call();
            res[i].sdate = await election.methods.sdate().call();
            res[i].edate = await election.methods.edate().call();
            res[i].algorithm = await election.methods.algorithm().call();
            res[i].electionID = i;
            var candidatesCount = await election.methods.candidatesCount().call();
            var x = [];
            x[i] = [];
            for(var j = 0; j <= candidatesCount; j++) {
                x[i].push(await election.methods.candidates(j).call());
            }
            elec[i] = <Election election = {res[i]} candidates = {x[i]} />
        }

        this.setState({
            data: elec,
            loading: false
        });
    }

    render() {
        
    this.loadInstance();

        return(
            <div className = "card container" style = {{}}>

                <table className = "table table-hover">
                    <thead>
                        <tr>                            
                            <th>Election ID</th>
                            <th>Election Name</th>
                            {/* <th>Start Date</th>
                            <th>End Date</th> */}
                            <td>Status</td>
                            <th>Voting Algorithm</th>
                            <th>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data}
                    </tbody>
                </table>
                <center>
                    {this.state.loading ? <Loader size = "40px"/> : <button style = {{width:100}} className = "btn btn-primary" onClick = {this.loadData}>Refresh</button>}
                </center>
                <br />
            </div>
        )
    }
}

export default Active;