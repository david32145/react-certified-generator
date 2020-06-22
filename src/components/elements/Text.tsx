import React from "react";
import { useDrag } from "react-dnd";

import styled from "styled-components";
import { Text as TextProps } from "models";

const Container = styled.div<TextProps & {isDragging: boolean}>`
  display: inline-block;
  position: absolute;
  border: 2px solid transparent;
  padding: 5px;
  top: ${props => props.position.y}px;
  left: ${props => props.position.x}px;
  background: transparent;

  cursor: grab;

  h1 {
    font-size: 16px;
  }

  opacity: ${props => props.isDragging ? 0 : 1};

  transition: border 0.1s;

  :active {
    border: 2px solid rgba(255, 255, 255, 0.25);
  }
`;

export const Text: React.FC<TextProps> = ({ children, ...props }) => {

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'ELEMENT_TEXT', data: props },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  })

  return (
    <Container ref={dragRef} {...props} isDragging={isDragging}>
      <h1>{children}</h1>
    </Container>
  );
};
