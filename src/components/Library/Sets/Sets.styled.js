import styled from 'styled-components';

export const SetsStyled = styled.ul`
  li {
    padding: 1rem;
    border-bottom: .5px solid rgb(10, 10, 10);
    font-size: 2rem;
    text-align: start;
    background-color: rgb(223, 223, 223);
  }
`;

export const SetsHeader = styled.div`
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;


  h2 {
    text-align: start;
    font-weight: bold;
    font-size: 2.5rem;
    margin-right: auto;
  }

  button {
    font-size: 1.8rem;
    background-color: white;
    padding: .7rem;
    border: 1px solid black;
    border-radius: 10px;
    display: block;
    margin-right: 2rem;
  }
`
