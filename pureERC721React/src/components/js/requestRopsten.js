import React, {useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Heading, Text, Field, Flex, Button, Loader, Modal, MetaMaskButton, Box, Card } from "rimble-ui";
import ConfirmConnection from './confirmConnection'

import ether from '../assets/icons/ether.svg'

export default function RequestRopsten(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [inputAddress, changeAddress] = useState('0x0');
    const [faucetErr, changeError] = useState('');
    const [isLoading, changeLoading] = useState(false);
  
    const closeModal = e => {
      e.preventDefault();
      setIsOpen(false);
    };
  
    const openModal = e => {
      setIsOpen(true);
    };

    const decide = () => {
        if(props.hasMetamask == false) {
            openModal()
        }else{
            window.ethereum.enable()
        }
    }

    const onChangeInput = (e) => {
        changeAddress(e.target.value);
    }

    const getRopstenEther = async () => {
        var e = inputAddress;
        changeLoading(true);
        var res;
        try{
            res = await axios.get("https://faucet.ropsten.be/donate/"+e);
            changeError('* Success!');
        }catch(err) {
            var errCode = err.response.status;
            
            if(errCode == 400) {
                changeError("* Invalid Address");
            } else if(errCode == 403) {
                changeError("* The queue is full / you are greylisted / blacklisted");
            } else if(errCode == 500) {
                changeError("* Internal Faucet Error")
            }
        }
        changeLoading(false);
    }

    return <Box className="App" p={0}>
    <Box>
    <font size = "2">You will need <b>Ropsten ETH</b>. If you do not have any, you can request few ethers from <b style = {{cursor: "pointer"}}> <u style = {{color:"blue"}}><span onClick = {openModal}>here</span></u></b></font>

      <Modal isOpen={isOpen}>
        <Card width={"600px"} p={0}>
          <Button.Text
            icononly
            icon={"Close"}
            color={"moon-gray"}
            position={"absolute"}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={closeModal}
          />

          <Box p={4} mb={3}>
          
            <center><h3><img style = {{top: 25, left: 20, position: "absolute"}} width="50" src={ether}/>Ropsten Free Ethers Faucet</h3></center>
            <hr />
                <Text mb={4}>
                    Enter your Ropsten Testnet account address to get some Ether
                    <input onChange = {onChangeInput} name = "address" style = {{marginTop: 20}} className = "form-control" placeholder = "Account address 0x0"/>
                    <font size = "1" className = "text-muted" style = {{marginTop: 10}}>{faucetErr}</font>
                </Text>
            </Box>

          <Flex
            px={4}
            py={3}
            borderTop={1}
            borderColor={"#E8E8E8"}
            justifyContent={"flex-end"}
          >
            {isLoading?<Loader />:<Button.Outline onClick = {getRopstenEther}>Send Me Ether</Button.Outline>}
          </Flex>
        </Card>
      </Modal>
    </Box>
  </Box>
}