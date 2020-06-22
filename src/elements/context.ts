import { createContext } from "react";
import { Text } from "models";

export interface ContextState {
  imageBackground: string
  texts: Text[]
  setImageBackground: (src: string) => void
  addText: (text: Text) => void
}

export const INITIAL_STATE: ContextState = {
  imageBackground: "",
  texts: [],
  setImageBackground: () => {},
  addText: () => {}
};

export default createContext<ContextState>(INITIAL_STATE);
