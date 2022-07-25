import styled from 'styled-components';

export const PickControllerStyled = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;

  >p {
    font-size: 7rem;
    text-align: center;
    margin-bottom: 4rem;
    letter-spacing: -2px;

    sup {
      font-size: 4rem;
    }
  }

  button {
    touch-action: manipulation;
  }
`

export const PickerInfo = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: start;
`

export const PickingFrom = styled.div`
  text-align: start;

  >p {
    font-size: 1.3rem;
    font-weight: bold;
    padding-left: 1rem;
    margin-bottom: -.7rem;
  }
`

export const PickerMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: -2px;
`

export const TuneWrapper = styled.div`
  height: 19.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  >p {
    width: 100%;
    text-align: center;
    font-size: 4rem;
    padding: 1rem;
    margin-bottom: 1.2rem;
    line-height: 1.2;
    -webkit-hyphens: auto;
    hyphens: auto;
    font-weight: 600;
  }
`

export const SmallButtons = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
  width: 90%;
  margin-bottom: 3rem;

  >button {
    border: 2px solid #573704;
    padding: 1.2rem;
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    border-radius: 5px;
    font-family: inherit;
    color: black;
    background-color: #eee;
    
    &:first-child {
      padding: 1rem 1.7rem 1rem 1.7rem;
      font-weight: 800;
    }

    &:not(:first-child) {
      font-size: 3rem;
    }
  }
`

export const NextButton = styled.button`
  margin: 0 auto;
  font-size: 5rem;
  border: 2px solid black;
  padding: 1.5rem;
  border-radius: 10px;
  display: block;
  margin-bottom: 4.2rem;
  cursor: pointer;
  color: black;
  background-color: #eee;
`

export const NotesButton = styled.button`
  display: inline-block;
  font-size: 1.8rem;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 2rem;
  align-self: center;
  background-color: inherit;
`

