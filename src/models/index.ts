export interface Control<T extends ControlStyle> {
  id: string
  type: 'Text'
  props: T
}

export interface ControlProperty<T> {
  cssKey?: string
  value: T
  title: string
  inputType: 'file' | 'text'
  getValue: () => string
}

export interface ControlStyle {
  positionX: ControlProperty<number>
  positionY: ControlProperty<number>
  width: ControlProperty<number | string>
  height: ControlProperty<number | string>
}