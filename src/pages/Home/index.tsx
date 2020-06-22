import React from "react";

import ImageDrop from "components/ImageDrop"
import Hotkeys from "components/Hotkeys";

import { Container } from "./styles";

const HomePage: React.FC = () => {

  function handleNewText() {
    console.log("New text")
  }

  return (
    <Container>
      <Hotkeys onNewText={handleNewText} />
      <ImageDrop />
    </Container>
  );
};

export default HomePage;
