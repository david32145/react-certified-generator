import React, { useState } from "react";

import ImageDrop from "components/ImageDrop";
import EditControl from "components/EditControl";
import Hotkeys from "components/Hotkeys";
// import { Text } from "components/elements";

import { Container } from "./styles";
import { useElements } from "context";
// import { Text as TextProps } from "models";

import Control from "components/Control"
import TextControl, {createTextControl} from "components/Control/Text"

const HomePage: React.FC = () => {
  const { controls, addControl, setControl } = useElements();
  const [ currentControlId, setCurrentControlId ] = useState<string | null>(null);

  function handleNewText() {
    addControl(createTextControl())
  }

  function handleUpdateText() {
    // setText(text)
  }

  function handleOpenEditElement(controlId: string) {
    setCurrentControlId(controlId)
  }

  return (
    <Container>
      { currentControlId && <EditControl onChangeControl={handleUpdateText} id={currentControlId}/> }
      <Hotkeys onNewText={handleNewText} />
      <ImageDrop />
      {controls.map(control => (
        <Control 
          key={control.id}
          component={TextControl} 
          onControlClick={handleOpenEditElement}
          control={control}
          />
      ))}
    </Container>
  );
};

export default HomePage;
