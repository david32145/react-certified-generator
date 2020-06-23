export interface Text {
  id: string
  value: string
  position: {
    x: number
    y: number
  }
  fontSize: number
  color: string
  width: number | string
  height: number | string
}