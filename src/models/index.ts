export interface Control<T extends ControlStyle> {
  id: string
  type: 'Text' | 'File'
  props: T
}

export interface ControlProperty<T> {
  cssKey?: string
  value: T
  title: string
  inputType: 'file' | 'text' | 'color'
  getValue: () => string
}

export interface ControlStyle {
  width: ControlProperty<number | string>
  positionX: ControlProperty<number>
  positionY: ControlProperty<number>
  height: ControlProperty<number | string>
}