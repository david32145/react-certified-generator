import React, { useRef } from "react";
import Draggable, { DraggableEventHandler } from 'react-draggable';

import styled from "styled-components";
import { Text as TextProps } from "models";
import { useElements } from "elements";

const Container = styled.div<TextProps>`
  display: inline-block;
  position: absolute;
  background: transparent;

  cursor: grab;

  h1 {
    font-size: ${props => props.fontSize}px;
    color: ${props => props.color};
  }

  transition: border 0.1s;
`;

export const Text: React.FC<TextProps & { onClick: (textId: string) => void }> = ({ children, onClick, ...props }) => {
  const containerRef = useRef(null)

  const { setText } = useElements()

  const handleMoveFinish: DraggableEventHandler = (event, data) => {
    const current = props
    current.position = data
    setText(current)
  }

  return (
    <Draggable
      ref={containerRef}
      handle=".handle"
      position={props.position}
      scale={1}
      onStop={handleMoveFinish}
      >
        <Container 
          className="handle"
          ref={containerRef}
          onClick={() => onClick(props.id)} 
          {...props} 
        >
          <h1>{children}</h1>
        </Container>
    </Draggable>
  );
};
