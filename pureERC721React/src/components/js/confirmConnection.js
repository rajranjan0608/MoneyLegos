import React, {useState} from "react";
import { Link } from 'react-router-dom';

import { Heading, Text, Field, Flex, Button, Loader, Modal, MetaMaskButton, Box, Card } from "rimble-ui";

export default function ConfirmConnection(props) {

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
          
            <center><h3><img style = {{top: 35, left: 20, position: "absolute"}} width="30" src="https://rimble.consensys.design/images/MetaMaskIcon.svg"/>Confirm connection in MetaMask</h3></center>
            <hr />
                <Text mb={4}>
                Confirm the request that's just appeared. If you can't see a request, open your MetaMask extension via your browser.
                </Text>
            </Box>

          <Flex
            px={4}
            py={3}
            borderTop={1}
            borderColor={"#E8E8E8"}
            justifyContent={"flex-end"}
          >
            <Loader />
          </Flex>
        </Card>
      </Modal>
    </Box>
  </Box>
}