import styled from 'styled-components';

export const EditSetNameStyled = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  legend {
    font-weight: bold;
    font-size: 1.3rem;
    align-self: flex-end;
    transform: translateY(-.5rem);
  }
`

export const InputGrouping = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  width: ${({ width }) => width};
`

export const TitleInput = styled.input`
  width: 20rem;
`;

export const ErrorMessage = styled.p`
  position: absolute;
  top: 2.4rem;
  left: 40px;
  font-size: 1.1rem;
  color: red;
`;