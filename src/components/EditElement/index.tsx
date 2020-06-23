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
  const [width, setWidth] = useState<number | string>(currentText?.width || "");
  const [height, setHeight] = useState<number | string>(currentText?.height || "auto");

  useEffect(() => {
    setValue(currentText!.value)
    setFontSize(currentText!.fontSize)
    setPositionX(currentText!.position.x)
    setPositionY(currentText!.position.y)
    setWidth(currentText!.width)
    setHeight(currentText!.height)
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
        color,
        width,
        height
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

        <span>Width:</span>
          <input
            type="text"
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
          />

        <span>Height:</span>
          <input
            type="text"
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
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
