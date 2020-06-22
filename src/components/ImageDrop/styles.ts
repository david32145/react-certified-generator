import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;

  align-items: center;
  justify-content: center;

  input {
    position: absolute;
  }

  img {
    width: 300px;
  }
`;
