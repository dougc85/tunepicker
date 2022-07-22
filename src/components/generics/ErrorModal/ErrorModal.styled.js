import styled from "styled-components";

export const Screen = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .6);
  z-index: 201;
`;

export const Content = styled.div`
  position: fixed;
  width: 80%;
  height: fit-content;
  top: 50%;
  transform: translateY(-50%);
  left: 10%;
  background-color: white;
  font-size: 2rem;
  padding: 1.5rem;
  box-sizing: border-box;
  z-index: 202;
  overflow: scroll;

  >div {
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1.3rem;
    text-align: start;
    padding: 0 1rem;

    h3 {
      font-weight: bold;
      text-align: end;
      font-size: 1.3rem;
      transform: translateY(-.5rem);
      margin-bottom: 1rem;
    }

    >p {
      margin-bottom: 1rem;
    }

    h4 {
      svg {
        height: 8px;
        width: 8px;
        transform: rotate(${props => props.showError ? '180deg' : '90deg'});
        margin-right: 5px;
        transition: transform .2s;
      }
      margin-bottom: 1rem;
    }

    >div {
      align-self: center;
    }
  }
`;

export const Error = styled.div`
  max-height: ${props => props.showError ? '50px' : '0'};    
  transform-origin: top;
  transition: max-height 1s ease, padding 1.5s ease;
  margin-bottom: 1rem;
  overflow: hidden;
  width: 100%;
  p {
    height: 35px;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    padding: 5px;
    margin: 0 auto;
    margin-bottom: 1rem;
    overflow: scroll;
    width: 95%;
  }
`