import React from "react";
import styled, { css } from "styled-components";

import {
  Control,
  ControlProperty,
  ControlStyle
} from "models";

import {
  createControlStyle, 
  getSimpleProperty,
  getPixelValue
} from "../utils"

import { ComponentProps } from "../index"

export interface ImageStyle extends ControlStyle {
  src: ControlProperty<string>
  borderRadius: ControlProperty<number>
}

export interface ImageControl extends Control<ImageStyle> {}

export function createImageControl(): Omit<ImageControl, 'id'> {
  const controlStyles = createControlStyle<ImageStyle>({
    src: {
      inputType: 'file',
      title: 'image',
      getValue: getSimpleProperty,
      value: 'http://api.adorable.io/avatars/256/abott@adorable.png'
    },
    borderRadius: {
      inputType: 'text',
      title: 'border radius',
      getValue: getPixelValue,
      value: 0
    }
  })

  return {
    type: 'File',
    props: controlStyles,
  }
}

const Container = styled.div<Omit<ImageControl,  'id' | 'type'>>`
  display: inline-block;
  position: fixed;
  background: transparent;

  ${props => {
    const {
      width,
      height,
      borderRadius,
      src
    } = props.props
    return css`
      width: ${width.getValue()};
      height: ${height.getValue()};
      border-radius: ${borderRadius.getValue()};
      min-width: 30px;
      min-height: 30px;
      background-image: url('${src.getValue()}');
      background-repeat: no-repeat;
      background-size: cover;
    `
  }}

  cursor: grab;

  transition: border 0.1s;
`;

interface ImageProps extends ComponentProps {
  className: string
  data: ImageControl
  onControlClick: (controlId: string) => void
}

export const ImageControl: React.FC<ImageProps> = ({
  onControlClick,
  data,
  ...props
}) => {
  console.log(data.props)
  return (
    <Container
      {...props}
      onClick={() => onControlClick(data.id)}
      props={data.props}
    />
  );
};

export default ImageControl;

