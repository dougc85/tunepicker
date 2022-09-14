import styled from 'styled-components';

export const PasswordStyled = styled.div`
  width: 100%;
  position: relative;

  input {
    display: block;
    width: 100%;
    font-size: 2rem;
    padding: .5rem;
    padding-left: 1rem;
    padding-right: 3.5rem;
    box-sizing: border-box;
  }

  >div {
    position: absolute;
    right: -.5rem;
    top: 50%;
    transform: translateY(-50%);
    height: 6rem;
    width: 5rem;
    display: flex;
    justify-content: center;

    svg {
      display: block;
      width: 2rem;
      color: rgb(82, 82, 82);
      cursor: pointer;
    }
  }
`