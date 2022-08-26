import styled from 'styled-components';

export const AddMultipleStyled = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  ${({ allSongs }) => {
    if (allSongs) {
      return `
        display: block;
        padding-bottom: 2rem;

        >legend {
          text-align: end;
        }

        >textarea, >fieldset {
          margin-top: 2rem;
        }

        >fieldset {
          margin-bottom: 1.5rem;
        }
      `
    }
  }}

  legend {
    font-weight: bold;
    font-size: 1.3rem;
    align-self: flex-end;
    transform: translateY(-.5rem);
  }

  p {
    font-size: 1.4rem;
    text-align: start;
    margin: 1.5rem 0;
  }

  ul {
    font-size: 1.3rem;
    margin: 0 2rem .5rem 2rem;

    li {
      margin-bottom: .5rem;
    }

    span {
      display: block;
      letter-spacing: 7px;
      font-weight: bold;
    }
  }

  textarea {
    padding: .5rem;
  }
`

export const AddMultipleButtonsStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin: 0 auto;
  ${({ allSongs }) => {
    if (allSongs) {
      return `
        padding-bottom: 2rem;
      `
    }
  }}
`

export const TitleErrorsStyled = styled.div`

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h2 {
    font-weight: bold;
    font-size: 1.3rem;
    align-self: flex-end;
    transform: translateY(-.5rem);
    margin-bottom: 3rem;
  }

  p{
    font-size: 1.5rem;
    padding: .5rem;

    span {
      display: block;
      margin-bottom: 1rem;
    }
  }

  ul {
    font-size: 1.5rem;
    margin-bottom: 2rem;
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


