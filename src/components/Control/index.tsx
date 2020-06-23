import React from "react";

import Draggable, { DraggableEventHandler } from 'react-draggable';
import { Control, ControlStyle } from "models";

export interface ComponentProps {
  className: string
  data: Control<ControlStyle>
  onControlClick: (controlId: string) => void
}

interface ControlProps {
  control: Control<ControlStyle>
  component: React.FC<any>
  onControlClick: (controlId: string) => void 
}

const ControlComponent: React.FC<ControlProps> = ({ 
  control, 
  onControlClick,
  component: Component 
}) => {

  const handleMoveFinish: DraggableEventHandler = (event, { x, y }) => {
    // const current = props
    // current.position = { x, y }
    // setText(current)
    console.log({x, y})
  }

  return (
    <Draggable
      handle=".handle"
      position={{
        x: control.props.positionX.value,
        y: control.props.positionY.value
      }}
      scale={1}
      onStop={handleMoveFinish}
    >
      <Component
        className="handle"
        onControlClick={onControlClick} 
        data={control} />
    </Draggable>
  );
};

export default ControlComponent;
