import styled from "styled-components";

export const AddSongStyled = styled.form`
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

  label {
      font-weight: bold;
    }

  textarea {
    width: 80%;
    height: 8rem;
  }
`;

export const InputGrouping = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  width: ${({ width }) => width};
`

export const TitleInput = styled.input`
  width: 17rem;
`;

export const ErrorMessage = styled.p`
  position: absolute;
  top: 2.4rem;
  left: 8.5rem;
  font-size: 1.1rem;
  color: red;
`;

export const KnowledgeField = styled.fieldset`
  border: none;

  legend {
        font-weight: bold;
        font-size: 1.7rem;
        transform: translateY(.5rem);
  }

  & > div {
    display: flex;
    align-items: center;
    margin-top: 1.2rem;
  }

  input {
    margin-right: 1.5rem;
  }

  label {
    font-size: 1.8rem;
    display: block;
    text-align: left;

    span {
      font-size: 1.4rem;
      display: block;
      font-weight: 400;
    }
  }
`;

