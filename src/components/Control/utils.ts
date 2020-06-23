export interface Control<T extends ControlStyle> {
  id: string
  type: 'Text'
  controlStyles: T
}

export interface ControlProperty<T> {
  cssKey: string
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

export function getSimpleProperty(this: {value: any}): string {
  return String(this.value)
}

export function getPixelValue(this: {value: any}): string {
  if(this.value instanceof String) {
    return String(this.value)
  }
  return String(this.value + "px")
}

const defaultControlStyle: ControlStyle = {
  positionX: {
    cssKey: 'left',
    value: 70,
    title: 'x',
    inputType: 'text',
    getValue: getSimpleProperty
  },
  positionY: {
    cssKey: 'top',
    value: 30,
    title: 'y',
    inputType: 'text',
    getValue: getSimpleProperty
  },
  width: {
    cssKey: 'width',
    value: 'auto',
    title: 'width',
    inputType: 'text',
    getValue: getPixelValue
  },
  height: {
    cssKey: 'height',
    value: 'auto',
    title: 'height',
    inputType: 'text',
    getValue: getPixelValue
  }
}

export function createControlStyle<T extends ControlStyle>(styles:  Omit<T, 'positionX' | 'positionY' | 'width' | 'height'>): T {
  return {
    ...defaultControlStyle,
    ...styles
  } as T
}