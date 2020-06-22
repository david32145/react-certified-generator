import React, { useState, useContext, useCallback } from "react";
import { randomBytes } from "crypto";
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

  const addText = useCallback((text: Omit<Text, 'id'>) => {
    const newState = producer(state, draft => {
      draft.texts.push({
        ...text,
        id: randomBytes(8).toString()
      })
    })
    setState(newState)
  }, [state])

  const setText = useCallback((text: Text) => {
    const newState = producer(state, draft => {
      draft.texts = draft.texts.map(txt => {
        if(txt.id === text.id) {
          return text
        }
        return txt
      })
    })
    setState(newState)
  }, [state])

  return (
    <Context.Provider value={{...state, setImageBackground, addText, setText }}>
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
  const setText = useContext(Context).setText
  return { textList, addText, setText };
}

export function useTextById(id: string): Text | undefined {
  return useContext(Context).texts.find(txt => txt.id === id)
}

export default ElementsProvider;
