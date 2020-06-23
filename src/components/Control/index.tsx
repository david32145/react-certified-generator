import React from "react";

import Draggable, { DraggableEventHandler } from 'react-draggable';
import { Control, ControlStyle } from "./utils";

interface ComponentProps {
  className: string
  data: Control<ControlStyle>
  onControlClick: (controlId: string) => void
}

interface ControlProps {
  control: Control<ControlStyle>
  component: React.FC<ComponentProps>
}

const ControlComponent: React.FC<ControlProps> = ({ control, component: Component }) => {

  const handleMoveFinish: DraggableEventHandler = (event, { x, y }) => {
    // const current = props
    // current.position = { x, y }
    // setText(current)
    console.log({x, y})
  }

  const handleControlClick = (controlId: string): void => {
    console.log(controlId)
  }

  return (
    <Draggable
      handle=".handle"
      position={{
        x: control.controlStyles.positionX.value,
        y: control.controlStyles.positionY.value
      }}
      scale={1}
      onStop={handleMoveFinish}
    >
      <div />
      <Component
        className="handle"
        onControlClick={handleControlClick} 
        data={control} />
    </Draggable>
  );
};

export default ControlComponent;
