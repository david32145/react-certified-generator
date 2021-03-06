import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 50;
  
  position: fixed;
  right: 0;
  top: 0;

  width: 350px;
  height: 100vh;
  
  padding: 30px 20px;

  background-color: #FFF;

  h2 {
    margin-bottom: 20px;
  }

  button {
    margin-top: 20px;
  }

  .property-val {
    display: grid;
    max-width: 300px;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px 10px;

    input {
      display: flex;
      flex: 1;
      border-width: 1px;
      border-color: #0f0800;
    }
  }
`