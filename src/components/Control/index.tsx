import React from "react";
import producer from "immer";

import Draggable, { DraggableEventHandler } from 'react-draggable';
import { Control, ControlStyle } from "models";
import { useElements } from "context";

import TextControl from "components/Control/Text"
import ImageControl from "components/Control/Image"

export interface ComponentProps {
  className: string
  data: Control<ControlStyle>
  onControlClick: (controlId: string) => void
}

interface ControlProps {
  control: Control<ControlStyle>
  onControlClick: (controlId: string) => void 
}

const ControlComponent: React.FC<ControlProps> = ({ 
  control, 
  onControlClick,
}) => {

  const { setControl } = useElements();

  const handleMoveFinish: DraggableEventHandler = (event, { x, y }) => {
    const newControl = producer(control, draft => {
      draft.props.positionX.value = x
      draft.props.positionY.value = y
    })
    setControl(newControl!)
  }

  let Component: React.FC<any> = TextControl
  if(control.type === "Text") {
    Component = TextControl
  }
  if(control.type === "File") {
    Component = ImageControl
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
