import styled, { css } from 'styled-components';

export const SongStyled = styled.div`
  padding: 1rem 0;

  label, fieldset {
    font-size: 2rem;
    font-weight: bold;
  }

  >div {
    position: relative;
    padding-left: 2rem;
    padding-right: 1rem;
    margin-bottom: 2rem;
    display: grid;
    row-gap: 5px;
    grid-template-columns: 1fr 7rem;
    grid-template-rows: min-content auto;
    text-align: start;
    align-items: center;
  }

  input, select, textarea {
    font-size: 1.7rem;
    box-sizing: content-box;
    height: 100%;
    transform: translateX(-2px);
    margin-left: 15px;
  }

  >button {
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    display: block;
    width: 15rem;
    padding: 1rem;
    font-size: 2rem;
    margin: 0 auto;
  }
`

export const SongEntryStyled = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`

const valueCss = css`
  font-size: 1.7rem;
  margin-left: 15px;
`

const inputCss = css`
  font-family: 'Nunito';
  transform: translateX(-5px);
`

export const TitleEntryStyled = styled(SongEntryStyled)`
  position: relative;

  p {
    ${valueCss}
  }
`

export const TitleError = styled.p`
  position: absolute;
  font-size: 1.2rem;
  left: 1.3rem;
  top: 2.9rem;
  color: red;
`

export const KeyEntryStyled = styled(SongEntryStyled)`
  select {
    ${inputCss}
  }
  p {
    ${valueCss}
  }
`

export const KnowledgeLabel = styled.label`
  span {
    font-size: 1.8rem;
  }
`

export const KnowledgeEntryStyled = styled(SongEntryStyled)`
  label {
    font-size: 1.7rem;
  }

  select {
    ${inputCss}
  }

  >div {
    align-items: center;

    >div {
      margin-left: 1rem;
      border: 1px solid rgb(97, 97, 97);
      height: 14px;
      width: 14px;
    }

    p {
      ${valueCss}
    }
  }
`

export const NotesLabel = styled.label`
  margin-bottom: 5px;
`

export const NotesEntryStyled = styled(SongEntryStyled)`
  height: min-content;
  width: 90%;
  position: static;

  textarea {
    
    height: 7rem;
    width: 25rem;
    box-sizing: border-box;
    transform: translate(-6px, -6px);
    padding: 5px;
  }

  p {
    ${valueCss}
    white-space: pre-line;
    height: 7rem;
    overflow: scroll;

    &::after {
      position: absolute;
      top: 31px;
      left: 30px;
      content: "";
      width: 23rem;
      height: 7rem;
      border: 1px solid rgb(218, 218, 218);
      box-sizing: border-box;
      border-radius: 3px;
    }
  }
`

export const SetsLabel = styled.fieldset`
  border: none;
`

export const SetsEntryStyled = styled(SongEntryStyled)`
  height: min-content;
  display: block;
  position: static;

  li {
    ${valueCss}
  }

  ul {
    padding-left: 15px;
  }
`

export const SetsCheckbox = styled.li`
  list-style: none;
  display: flex;
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