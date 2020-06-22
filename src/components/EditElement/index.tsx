import React, { useState, useEffect } from "react";

import { Text } from "models";

import { useTextById } from "elements"

import { Container } from "./styles";

interface EditElementProps {
  textId: string,
  onChangeText: (text: Text) => void
}

const EditElement: React.FC<EditElementProps> = ({ textId, onChangeText }) => {

  const currentText = useTextById(textId);

  console.log(textId)

  const [value, setValue] = useState<string>(currentText?.value || "");
  const [fontSize, setFontSize] = useState<number>(currentText?.fontSize || 16);
  const [positionX, setPositionX] = useState<number>(currentText?.position.x || 20);
  const [positionY, setPositionY] = useState<number>(currentText?.position.y || 20);
  const [color, setColor] = useState<string>(currentText?.color || "#000");

  useEffect(() => {
    setValue(currentText!.value)
    setFontSize(currentText!.fontSize)
    setPositionX(currentText!.position.x)
    setPositionY(currentText!.position.y)
    setColor(currentText!.color)
  }, [textId, currentText])

  function handleSaveNewData() {
    console.log(currentText)
    if (currentText) {
      onChangeText({
        ...currentText,
        fontSize,
        value,
        position: {
          x: positionX,
          y: positionY
        },
        color
      })
    }
  }

  return (
    <Container>
      <h2>Properties</h2>

      <div className="property-val">
        <span>Font Size:</span>
        <input
          type="text"
          value={fontSize}
          onChange={e => setFontSize(Number(e.target.value))}
        />

        <span>Value:</span>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <span>X:</span>
          <input
            type="text"
            value={positionX}
            onChange={e => setPositionX(Number(e.target.value))}
          />

        <span>Y:</span>
          <input
            type="text"
            value={positionY}
            onChange={e => setPositionY(Number(e.target.value))}
          />

        <span>Color:</span>
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </div>

      <button type="button" onClick={handleSaveNewData}>Salvar</button>
    </Container>
  );
};

export default EditElement;
