import React, { useState, useContext, useCallback } from "react";
import { randomBytes } from "crypto";
import producer from "immer"

import Context, { ContextState, INITIAL_STATE } from "./context";
import {
  Control,
  ControlStyle
} from "models";

type ControlInput = Control<ControlStyle>

const ElementsProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<ContextState>(INITIAL_STATE);

  const setImageBackground = useCallback((src: string) => {
    const newState = producer(state, draft => {
      draft.imageBackground = src
    })
    setState(newState)
  }, [state]);

  const addControl = useCallback((control: Omit<ControlInput, 'id'>) => {
    const newState = producer(state, draft => {
      draft.controls.push({
        ...control,
        id: randomBytes(8).toString()
      })
    })
    setState(newState)
  }, [state])

  const setControl = useCallback((control: ControlInput) => {
    const newState = producer(state, draft => {
      draft.controls = draft.controls.map(ctl => {
        if(ctl.id === control.id) {
          return control
        }
        return ctl
      })
    })
    setState(newState)
  }, [state])

  return (
    <Context.Provider value={{
      ...state, 
      setImageBackground, 
      addControl, 
      setControl
    }}>
      {children}
    </Context.Provider>
  );
};

export function useImageBackground(): [string, (src: string) => void] {
  const src = useContext(Context).imageBackground;
  const setSrc = useContext(Context).setImageBackground;
  return [ src, setSrc ];
}

export function useElements() {
  const controls = useContext(Context).controls;
  const addControl = useContext(Context).addControl;
  const setControl = useContext(Context).setControl;
  return { controls, addControl, setControl };
}

export function useSelectControl(id: string): ControlInput | undefined {
  return useContext(Context)
    .controls
    .find(ctl => ctl.id === id)
}

export default ElementsProvider;
