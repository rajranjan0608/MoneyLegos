import React, { useState } from 'react';
import { Box, Flex, Modal, Button, Text, Card, Radio, Field, Loader } from "rimble-ui";
import App from '../../App';
import ABI from '../../ABI';

function AlgoModal(props) {

    const [isOpen, setIsOpen] = useState(false);
  
    const closeModal = e => {
      e.preventDefault();
      setIsOpen(false);
    };
  
    const openModal = e => {
      e.preventDefault();
      setIsOpen(true);
    };

    // const onRadioChange = (e) => {
    //     changeCid(e.target.value);
    // }

    return (
      <Box className="App" p={0}>
        <Box>
          <Button onClick={openModal}>{props.algorithm}</Button>
  
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
                <h3>Algorithm</h3>
                <Field label="Choose voting algorithm from below">
                    <Radio 
                        name = "algo" 
                        label={"Oklahoma"} 
                        my={2} 
                        value={"Oklahoma"}
                        onChange = {props.this.onChangeAlgo}
                    />

                    <Radio 
                        name = "algo" 
                        label={"SmithSet"} 
                        my={2} 
                        value={"SmithSet"}
                        onChange = {props.this.onChangeAlgo}
                    />

                    <Radio 
                        name = "algo" 
                        label={"RankedPairs"} 
                        my={2} 
                        value={"RankedPairs"}
                        onChange = {props.this.onChangeAlgo}
                    />

                    <Radio 
                        name = "algo" 
                        label={"Approval"} 
                        my={2} 
                        value={"Approval"}
                        onChange = {props.this.onChangeAlgo}
                    />
                </Field>
              </Box>
  
              <Flex
                px={4}
                py={3}
                borderTop={1}
                borderColor={"#E8E8E8"}
                justifyContent={"flex-end"}
              >
                <Button.Outline onClick = {closeModal}>Select</Button.Outline>
              </Flex>
            </Card>
          </Modal>
        </Box>
      </Box>
    );
  }

  export default AlgoModal;