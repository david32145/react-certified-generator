import React, { useState, useContext, useCallback } from "react";
import producer from "immer"

import Context, { ContextState, INITIAL_STATE } from "./context";
import { Text } from "models";

const ElementsProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<ContextState>(INITIAL_STATE);

  const setImageBackground = useCallback((src: string) => {
    const newState = producer(state, draft => {
      draft.imageBackground = src
    })
    setState(newState)
  }, [state]);

  const addText = useCallback((text: Text) => {
    const newState = producer(state, draft => {
      draft.texts.push(text)
    })
    setState(newState)
  }, [state])

  return (
    <Context.Provider value={{...state, setImageBackground, addText }}>
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
  const textList = useContext(Context).texts;
  const addText = useContext(Context).addText;
  return { textList, addText };
}

export default ElementsProvider;
