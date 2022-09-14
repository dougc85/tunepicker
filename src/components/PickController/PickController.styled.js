import styled from 'styled-components';

export const Background = styled.div`
  background-color: ${props => props.background};
  min-height: 100vh;

  @media only screen and (orientation : landscape) {
      min-height: calc(100vh + 65px);
    }
`

export const PickControllerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(${window.innerHeight}px - 95px);
  @media only screen and (orientation : landscape) {
    min-height: 450px;
    }
  padding-top: 1rem;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 2rem;

  button {
    touch-action: manipulation;
  }
`

export const EmptyControllerStyled = styled.div`
  padding-top: 1rem;

  >p {
    font-size: 1.6rem;
    padding: 3rem;
  }
`

export const PickerInfo = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 100%;

  >button {
    align-self: center;
    margin-right: 1rem;
  }
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
  justify-content: center;
  margin-right: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: -2px;
  user-select: none;
`

export const TuneWrapper = styled.div`
  height: 7rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  >p {
    width: 100%;
    text-align: center;
    line-height: 1.2;
    -webkit-hyphens: auto;
    hyphens: auto;
    font-weight: 600;
    font-size: ${props => {
    const tuneLength = props.length;
    return (tuneLength > 20) ? "3rem" :
      (tuneLength > 9) ? "3.6rem" :
        (tuneLength > 7) ? "4.3rem" :
          (tuneLength > 5) ? "5rem" :
            "6rem";
  }}
  }
`

export const KeyWrapper = styled.div`
  position: relative;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;

  >p {
    font-size: 5rem;
    text-align: center;
    letter-spacing: -2px;

    sup {
    font-size: 4rem;
  }
  }
  
`

export const NextButton = styled.div`

  min-height: 12rem;
  display: flex;
  align-items: center;

  button {
    position: relative;
    margin: 0 auto;
    font-size: 4.5rem;
    border: 2px solid black;
    padding: 1rem;
    border-radius: 10px;
    display: block;
    cursor: pointer;
    color: black;
    background-color: #eee;
  }
  
`

export const SmallButtons = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;

  >button {
    position: relative;
    border: 2px solid #573704;
    padding: 1rem;
    font-size: 1.8rem;
    text-align: center;
    font-weight: 700;
    border-radius: 5px;
    font-family: inherit;
    color: black;
    background-color: #eee;
    height: 5rem;
    cursor: pointer;
    
    &:first-child {
      padding: .8rem 1.5rem .8rem 1.5rem;
      font-weight: 800;
    }

    &:not(:first-child) {
      font-size: 1.8rem;
    }
  }
`

export const NotesButton = styled.button`
  display: inline-block;
  font-size: 1.8rem;
  border: none;
  border-bottom: 1px solid black;
  align-self: center;
  background-color: inherit;
  margin-bottom: 3rem;
  margin-top: 2rem;
  cursor: pointer;
`

