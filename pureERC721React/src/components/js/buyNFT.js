import React, {useState} from "react";
import { Link } from 'react-router-dom';

import { Heading, Text, Field, Flex, Radio, Button, Loader, Modal, MetaMaskButton, Box, Card } from "rimble-ui";

export default function ModalExample(props) {

    const [isOpen, setIsOpen] = useState(false);
  
    const closeModal = e => {
      e.preventDefault();
      setIsOpen(false);
    };
  
    const openModal = e => {
      e.preventDefault();
      setIsOpen(true);
    };
  
    return (
      <Box className="App" p={4}>
        <Box>
          <div onClick={openModal} className = {props.className} style = {props.style}></div>
          <div style = {{marginTop: 10}}>{props.color}</div>
  
          <Modal isOpen={isOpen}>
            <Card width={"420px"} p={0}>
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
                <Heading.h3>Want One?</Heading.h3>
                <Text style={{marginBottom:10}}><font size = '2'>Choose from the below actions, you want to do with NFT.</font></Text>
                <Radio 
                    name = "candidate" 
                    label= "Buy with MANA"
                />
                <Radio 
                    name = "candidate" 
                    label= "Swap with your NFT"
                />
              </Box>
  
              <Flex
                px={4}
                py={3}
                borderTop={1}
                borderColor={"#E8E8E8"}
                justifyContent={"flex-end"}
              >
                <Button.Outline onClick={closeModal}>Cancel</Button.Outline>
                <Button ml={3}>Confirm</Button>
              </Flex>
            </Card>
          </Modal>
        </Box>
      </Box>
    );
  }