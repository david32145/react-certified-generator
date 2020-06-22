import React from "react";

import ImageDrop from "components/ImageDrop"
import Hotkeys from "components/Hotkeys";

import { Container } from "./styles";
import { useElements } from "elements";

const HomePage: React.FC = () => {

  const { textList, addText } = useElements()

  function handleNewText() {
    console.log(addText)
    addText({
      position: {
        x: 0,
        y: 0
      },
      value: "New text"
    })
  }

  return (
    <Container>
      <Hotkeys onNewText={handleNewText} />
      <ImageDrop />
      {textList.map((text) => <h1>{text.value}</h1>)}
    </Container>
  );
};

export default HomePage;
