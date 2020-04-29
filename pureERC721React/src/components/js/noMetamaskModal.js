import React, {useState} from "react";
import { Link } from 'react-router-dom';

import { Heading, Text, Field, Flex, Button, Loader, Modal, MetaMaskButton, Box, Card } from "rimble-ui";
import ConfirmConnection from './confirmConnection'

export default function NoMetamask(props) {

    const [isOpen, setIsOpen] = useState(false);
  
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

    const goToMetamask = () => {
        window.open("https://metamask.io/", "_blank");
    }

    return <Box className="App" p={0}>
    <Box>
        {props.isUnlocked?
            <MetaMaskButton disabled>
                {props.text}
            </MetaMaskButton>
        :  
            <MetaMaskButton onClick = {decide}>
                {props.text}
            </MetaMaskButton>
        }

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
          
            <center><h3><img style = {{top: 35, left: 20, position: "absolute"}} width="30" src="https://rimble.consensys.design/images/MetaMaskIcon.svg"/>Install MetaMask to use this DApp</h3></center>
            <hr />
                <Text mb={4}>
                    MetaMask is a browser extension that will let you use our blockchain
                    features in this browser. It may take you a few minutes to set up your
                    MetaMask account.
                </Text>
            </Box>

          <Flex
            px={4}
            py={3}
            borderTop={1}
            borderColor={"#E8E8E8"}
            justifyContent={"flex-end"}
          >
            {<Button.Outline onClick = {goToMetamask}>Install</Button.Outline>}
          </Flex>
        </Card>
      </Modal>
    </Box>
  </Box>
}