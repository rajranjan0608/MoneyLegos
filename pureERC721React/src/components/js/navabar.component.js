import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from "rimble-ui";

import Dashboard from './dashboard.component';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.initCheck = this.initCheck.bind(this)
        this.state = {
            account: '0x0'
        }
        setInterval(this.initCheck, 100);
    }

    async initCheck() {
        var ls = window.localStorage;
        this.setState({
            account: ls.account
        })
    }

    render() {
        return (
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">MoneyLegos</Link>
                <div className="collapsed navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/swap" className="nav-link">Swap</Link>
                        </li>
                        {/* <li className="navbar-item">
                            <Link to="/send" className="nav-link">Send</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/pool" className="nav-link">Pool</Link>
                        </li> */}
                        <li className="navbar-item">
                            <Link to="/nftExchange" className="nav-link">NFT Marketplace</Link>
                        </li>
                    </ul>

                    <ul className = "nav navbar-nav navbar-right navright">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">{this.state.account}</Link>
                        </li>
                        <li className = "">
                            <Avatar size = "2.5rem" src = "https://www.w3schools.com/howto/img_avatar.png" />
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}

export default Navbar;