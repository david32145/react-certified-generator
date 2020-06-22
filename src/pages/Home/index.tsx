import React, { useState } from "react";
import { useDrop, DragObjectWithType } from "react-dnd";

import ImageDrop from "components/ImageDrop";
import EditElement from "components/EditElement";
import Hotkeys from "components/Hotkeys";
import { Text } from "components/elements";

import { Container } from "./styles";
import { useElements } from "elements";
import { Text as TextProps } from "models";

interface DropOptions extends DragObjectWithType {
  data: TextProps
}

const HomePage: React.FC = () => {

  const { textList, addText, setText } = useElements();
  const [ currentTextId, setCurrentTextId ] = useState<string | null>(null);

  const [, dropRef] = useDrop<DropOptions, any, any>({
    accept: ["ELEMENT_TEXT"],
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset()
      // const offset = monitor.getClientOffset()
      const data = item.data;

      data.position = {
        x: offset?.x || data.position.x,
        y: offset?.y || data.position.y
      }


      setText(data)
    }
  })

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
    <Container ref={dropRef}>
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
