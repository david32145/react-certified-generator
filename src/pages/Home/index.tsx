import React, { useState } from "react";

import ImageDrop from "components/ImageDrop";
import EditElement from "components/EditElement";
import Hotkeys from "components/Hotkeys";
import { Text } from "components/elements";

import { Container } from "./styles";
import { useElements } from "elements";
import { Text as TextProps } from "models";

const HomePage: React.FC = () => {
  const { textList, addText, setText } = useElements();
  const [ currentTextId, setCurrentTextId ] = useState<string | null>(null);

  function handleNewText() {
    addText({
      position: {
        x: 70,
        y: 30
      },
      value: "New text",
      fontSize: 14,
      color: "#000"
    })
  }

  function handleUpdateText(text: TextProps) {
    setText(text)
  }

  function handleOpenEditElement(textId: string) {
    setCurrentTextId(textId)
  }

  return (
    <Container>
      { currentTextId && <EditElement onChangeText={handleUpdateText} textId={currentTextId}/> }
      <Hotkeys onNewText={handleNewText} />
      <ImageDrop />
      {textList.map((text) => (
        <Text 
          onClick={handleOpenEditElement} 
          key={text.id} {...text}
        >
          {text.value}
        </Text>
      ))}
    </Container>
  );
};

export default HomePage;
