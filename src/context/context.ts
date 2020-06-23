import { createContext } from "react";
import {
  Control,
  ControlStyle
} from "models";

type ControlInput = Control<ControlStyle>

export interface ContextState {
  imageBackground: string
  controls: Control<ControlStyle> []
  setImageBackground: (src: string) => void
  addControl: (control: Omit<ControlInput, 'id'>) => void
  setControl: (control: ControlInput) => void
}

export const INITIAL_STATE: ContextState = {
  imageBackground: "https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg",
  controls: [],
  setImageBackground: () => {},
  addControl: () => {},
  setControl: () => {}
};

export default createContext<ContextState>(INITIAL_STATE);
