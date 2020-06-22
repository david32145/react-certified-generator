import React from "react";
import { useDrop, DragObjectWithType } from "react-dnd";

import ImageDrop from "components/ImageDrop"
import Hotkeys from "components/Hotkeys";
import { Text } from "components/elements";

import { Container } from "./styles";
import { useElements } from "elements";
import { Text as TextProps } from "models";

interface DropOptions extends DragObjectWithType {
  data: TextProps
}

const HomePage: React.FC = () => {

  const { textList, addText, setText } = useElements()

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
      value: "New text"
    })
  }

  return (
    <Container ref={dropRef}>
      <Hotkeys onNewText={handleNewText} />
      <ImageDrop />
      {textList.map((text) => <Text key={text.value} {...text}>{text.value}</Text>)}
    </Container>
  );
};

export default HomePage;
