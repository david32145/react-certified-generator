import React from "react";
import styled, { css } from "styled-components";

import {
  Control,
  ControlProperty,
  ControlStyle
} from "models";

import {
  createControlStyle,
  getPixelValue,
  getSimpleProperty
} from "../utils"

import { ComponentProps } from "../index"

export interface TextStyle extends ControlStyle {
  fontSize: ControlProperty<number>
  fontWeight: ControlProperty<number | string>
  lineHeight: ControlProperty<number | string>
  textAlign: ControlProperty<string>
  color: ControlProperty<string>
  value: ControlProperty<string>
}

export interface TextControl extends Control<TextStyle> {}

export function createTextControl(): Omit<TextControl, 'id'> {
  const controlStyles = createControlStyle<TextStyle>({
    value: {
      getValue: getSimpleProperty,
      inputType: 'text',
      title: 'value',
      value: 'New text'
    },
    color: {
      cssKey: 'color',
      getValue: getSimpleProperty,
      inputType: 'text',
      title: 'color',
      value: '#000'
    },
    fontSize: {
      cssKey: 'font-size',
      getValue: getPixelValue,
      inputType: 'text',
      title: 'font size',
      value: 16
    },
    lineHeight: {
      cssKey: 'line-height',
      getValue: getPixelValue,
      inputType: 'text',
      title: 'line height',
      value: 'initial'
    },
    fontWeight: {
      cssKey: 'font-weight',
      getValue: getSimpleProperty,
      inputType: 'text',
      title: 'font weight',
      value: 'initial'
    },
    textAlign: {
      cssKey: 'text-align',
      getValue: getSimpleProperty,
      inputType: 'text',
      title: 'text align',
      value: 'initial'
    }
  })

  return {
    type: 'Text',
    props: controlStyles,
  }
}

const Container = styled.h1<Omit<TextControl, 'value' | 'id' | 'type'>>`
  display: inline-block;
  position: fixed;
  background: transparent;

  ${props => {
    const {
      width,
      height,
      color,
      fontSize,
      fontWeight,
      lineHeight,
      textAlign
    } = props.props
    return css`
      width: ${width.getValue()};
      height: ${height.getValue()};
      color: ${color.getValue()};
      font-size: ${fontSize.getValue()};
      font-weight: ${fontWeight.getValue()};
      line-height: ${lineHeight.getValue()};
      text-align: ${textAlign.getValue()};
    `
  }}

  cursor: grab;

  transition: border 0.1s;
`;

interface TextProps extends ComponentProps {
  className: string
  data: TextControl
  onControlClick: (controlId: string) => void
}


export const Text: React.FC<TextProps> = ({
  onControlClick,
  data,
  ...props
}) => {

  return (
    <Container
      {...props}
      onClick={() => onControlClick(data.id)}
      props={data.props}
    >
      {data.props.value.value}
    </Container>
  );
};

export default Text;

