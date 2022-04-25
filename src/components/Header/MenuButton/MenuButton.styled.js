import styled from 'styled-components';

export const MenuButtonStyled = styled.button`
  height: 30px;
  width: 30px;
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: none;

  span {
    border-top: 2px solid rgb(134, 134, 134);
    width: 100%;
  }
`