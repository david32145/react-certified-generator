import styled, { css } from "styled-components";

interface ContainerProps {
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;

  align-items: center;
  justify-content: center;

  ${props => props.isDragActive ? css`
    border: 2px dashed #ddd;
  ` : null}

  ${props => props.isDragAccept ? css`
    background-color: rgba(0, 255, 0, 0.25);
  ` : null}

  ${props => props.isDragReject ? css`
    background-color: rgba(255, 0, 0, 0.25);
  ` : null}

  input {
    position: absolute;
  }

  img {
    width: 300px;
  }
`;


interface ImageBackgroundOptions {
  src?: string
}

export const ImageBackground = styled.div<ImageBackgroundOptions>`
  display: flex;
  flex: 1;
  background-image: url('${props => props.src}');
  background-repeat: no-repeat;
  background-size: cover;
`