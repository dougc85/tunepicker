import styled from "styled-components";

export const AddSongStyled = styled.form`
  flex: 1;
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
      font-size: 1.6rem;
    }

  div {
    flex-shrink: 1;
  }
`;

export const InputGrouping = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  width: ${(props) => props.width};
`

export const TitleInput = styled.input`
  width: 17rem;
`;

export const ErrorMessage = styled.p`
  position: absolute;
  top: 2.8rem;
  left: 8.2rem;
  font-size: 1.1rem;
  color: red;
`;

export const KnowledgeField = styled.fieldset`
  border: none;

  legend {
    font-weight: bold;
    font-size: 1.6rem;
    transform: translateY(.5rem);
    margin-bottom: .5rem;
  }

  & > div {
    display: flex;
    align-items: center;
    margin-top: .8rem;
  }

  input {
    flex-shrink: 0;
    flex-grow: 0;
    margin-right: 1.5rem;
    display: block;
    width: 15px;
  }

  label {
    font-size: 1.6rem;
    display: block;
    text-align: left;

    span {
      font-size: 1.3rem;
      display: block;
      font-weight: 400;
    }
  }
`;

export const NotesField = styled.div`

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  textarea {
    margin-top: 1rem;
    width: 80%;
    height: 8rem;
  }
`

