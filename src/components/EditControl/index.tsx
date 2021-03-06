import React, { useEffect, useRef, useState } from "react";
import producer from "immer";

import { Form } from "@unform/web";

import { useSelectControl, useElements } from "context"

import { Container } from "./styles";
import { ControlStyle, ControlProperty } from "models";
import { useField, FormHandles, SubmitHandler } from "@unform/core";

interface EditControlProps {
  id: string,
}

interface FieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string
}

type FormData = Record<keyof ControlStyle, string>


const FieldFile: React.FC<FieldProps> = ({ name, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, registerField } = useField(name)

  const [preview, setPreview] = useState<string>("http://api.adorable.io/avatars/256/abott@adorable.png")

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref) => {
        return preview
      },
      setValue: () => { },
      clearValue: () => { }
    })
  }, [fieldName, preview, registerField])

  return (
    <>
      <button onClick={() => {
        inputRef.current?.click()
      }}>File</button>
      <input 
        {...props} 
        style={{ display: 'none' }}
        type="file" 
        ref={inputRef} 
        onChange={e => {
          if(e.target.files?.length) {
            URL.revokeObjectURL(preview)
            setPreview(URL.createObjectURL(e.target.files[0]))
          }
        }}
        /> 
    </>
  )
}

const Field: React.FC<FieldProps> = ({ name, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, props.type, registerField])

  return <input {...props} ref={inputRef} />
}

const EditControl: React.FC<EditControlProps> = ({ id }) => {

  const control = useSelectControl(id);
  const { setControl } = useElements();
  const formRef = useRef<FormHandles>(null);

  const props = Object.entries(control!.props) as [keyof ControlStyle, ControlProperty<string>][]

  useEffect(() => {
    const newFormData = props.reduce<Record<string, string>>((acc, value) => {
      const keyVal = value[0] as unknown as string
      acc[keyVal] = value[1].value
      return acc;
    }, {})
    formRef.current?.setData(newFormData);
  }, [control, props])

  const handleSaveNewData: SubmitHandler<FormData> = (data) => {
    const keys = Object.keys(data) as unknown as (keyof ControlStyle)[]
    const newControl = producer(control, draft => {
      keys.forEach(key => {
        if (draft?.props[key]) {
          const property = draft.props[key]
          if (!isNaN(Number(data[key]))) {
            property.value = Number(data[key])
          } else {
            property.value = data[key]
          }
        }
      })
    })
    setControl(newControl!)
  }

  return (
    <Container>
      <h2>Properties</h2>

      <Form ref={formRef} onSubmit={handleSaveNewData} className="property-val">

        {props.map(([key, value]) => {
          return (
            <React.Fragment key={value.title}>
              <span>{value.title}:</span>
              {value.inputType === "file" ? (
                <FieldFile
                  name={key}
                />
              ) : (
                  <Field
                    name={key}
                    defaultValue={value.value}
                    type={value.inputType}
                  />)
              }
            </React.Fragment>
          )
        })}
        <button type="submit">Salvar</button>
      </Form>

    </Container>
  );
};

export default EditControl;
