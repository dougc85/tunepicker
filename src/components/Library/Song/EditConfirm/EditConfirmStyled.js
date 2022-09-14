import styled from 'styled-components';

export const EditConfirmStyled = styled.div`
  grid-area: 2 / 2 / 3 / -1;
  justify-self: center;
`

export const EditButton = styled.button`
  position: relative;
  cursor: pointer;
  background-color: inherit;
  border: none;
  border-bottom: 1px solid black;
  color: ${props => props.disableEdit ? 'rgb(173, 173, 173)' : 'black'};
  border-color: ${props => props.disableEdit ? 'rgb(173, 173, 173)' : 'black'};
`

export const ConfirmButton = styled.button`
  position: relative;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 3px;
  box-shadow: 2px 2px 5px rgba(0,0,0,.2);

  &:hover {
    cursor: pointer;
  }

  &:active {
    box-shadow: 1px 1px 3px rgba(0,0,0,.4);
  }
`