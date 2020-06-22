import { createContext } from "react";
import { Text } from "models";

export interface ContextState {
  imageBackground: string
  texts: Text[]
  setImageBackground: (src: string) => void
  addText: (text: Omit<Text, 'id'>) => void
  setText: (text: Text) => void
}

export const INITIAL_STATE: ContextState = {
  imageBackground: "https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg",
  texts: [],
  setImageBackground: () => {},
  addText: () => {},
  setText: () => {}
};

export default createContext<ContextState>(INITIAL_STATE);
