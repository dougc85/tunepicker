import styled from "styled-components";

export const AddSongStyled = styled.form`

  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  div {
    flex-shrink: 1;
  } 

  ${({ allSongs }) => {
    if (allSongs) {
      return `

        >div, >fieldset {
          margin-top: 1.5rem;
        }

      `
    }
  }}

  >legend {
    font-weight: bold;
    font-size: 1.3rem;
    align-self: flex-end;
    transform: translateY(-.5rem);
  }

  label {
    font-weight: bold;
    font-size: 1.6rem;
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
  top: 2.6rem;
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
    position: relative;
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

export const SetsField = styled.fieldset`
  width: 85%;
  border: none;
  position: relative;
  height: min-content;
  display: block;
  position: static;

  legend {
    font-weight: bold;
    font-size: 1.6rem;
  }

  li {
    font-size: 1.7rem;
  }

  ul {
    padding-left: 15px;
    margin-top: 1rem;
    margin-bottom: 1rem;

    li:not(:last-child) {
      margin-bottom: .5rem;
    }
  }
`

export const SetsCheckbox = styled.li`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  label {
    font-size: 1.5rem;
    font-weight: normal;
  }

  input {
    height: 1.5rem;
    margin-right: 8px;
  }
`

