import React, { useState } from "react";

import ImageDrop from "components/ImageDrop";
import EditControl from "components/EditControl";
import Hotkeys from "components/Hotkeys";
// import { Text } from "components/elements";
import {createImageControl} from "components/Control/Image"

import { Container } from "./styles";
import { useElements } from "context";
// import { Text as TextProps } from "models";

import Control from "components/Control"
import {createTextControl} from "components/Control/Text"

const HomePage: React.FC = () => {
  const { controls, addControl } = useElements();
  const [ currentControlId, setCurrentControlId ] = useState<string | null>(null);

  function handleNewText() {
    addControl(createTextControl())
  }

  function handleNewImage() {
    addControl(createImageControl())
  }

  function handleOpenEditElement(controlId: string) {
    setCurrentControlId(controlId)
  }

  return (
    <Container>
      { currentControlId && <EditControl id={currentControlId}/> }
      <Hotkeys 
        onNewText={handleNewText} 
        onNewImage={handleNewImage}
      />
      <ImageDrop />
      {controls.map(control => (
        <Control 
          key={control.id}
          onControlClick={handleOpenEditElement}
          control={control}
          />
      ))}
    </Container>
  );
};

export default HomePage;
