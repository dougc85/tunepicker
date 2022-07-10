import styled from 'styled-components';

export const AddFromLibraryStyled = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;

  h3 {
    font-weight: bold;
    text-align: end;
    font-size: 1.3rem;
    transform: translateY(-.5rem);
  }

  p {
    margin-top: 1rem;
    text-align: start;

    span {
      display: block;
      margin-top: 1rem;
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem auto 4rem auto;
  width: 70%;
`

export const EntryGrouping = styled.div`
  h4 {
    text-align: start;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  ul {
    list-style: none;
    text-align: start;
    font-size: 1.5rem;
  }
  padding-bottom: 2rem;
`