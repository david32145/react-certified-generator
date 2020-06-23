import React, { useEffect } from "react";

import { useSelectControl } from "context"

import { Container } from "./styles";
import { Control, ControlStyle, ControlProperty } from "models";

interface EditControlProps {
  id: string,
  onChangeControl: (control: Control<ControlStyle>) => void
}

const EditControl: React.FC<EditControlProps> = ({ id, onChangeControl }) => {

  const control = useSelectControl(id);

  useEffect(() => {

  }, [control])

  function handleSaveNewData() {
    console.log(control)
  }

  const props = Object.values(control!.props) as ControlProperty<string>[]

  return (
    <Container>
      <h2>Properties</h2>

      <div className="property-val">

        {props.map(value => {
          return (
            <>
              <span>{value.title}:</span>
              <input
                defaultValue={value.value}
                type={value.inputType}
              />
            </>
          )
        })}
      </div>

      <button type="button" onClick={handleSaveNewData}>Salvar</button>
    </Container>
  );
};

export default EditControl;
