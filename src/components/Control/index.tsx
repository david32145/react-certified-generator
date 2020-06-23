import React from "react";
import producer from "immer";

import Draggable, { DraggableEventHandler } from 'react-draggable';
import { Control, ControlStyle } from "models";
import { useElements } from "context";

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

  const { setControl } = useElements();

  const handleMoveFinish: DraggableEventHandler = (event, { x, y }) => {
    const newControl = producer(control, draft => {
      draft.props.positionX.value = x
      draft.props.positionY.value = y
    })
    setControl(newControl!)
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
