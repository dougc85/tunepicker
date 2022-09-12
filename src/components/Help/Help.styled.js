import styled from 'styled-components';

export const HelpStyled = styled.div`
  font-size: 1.4rem;
  padding: 2rem 2rem 0 2rem;
  text-align: start;
  max-width: 700px;
  margin: 0 auto;

  >h2 {
    font-weight: 700;
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }

  >ul {
    position: relative;
    list-style-type: none;

    li:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  >a {
    display: block;

    :active, :link, :visited, :hover {
      text-decoration: none;
      text-align: center;
      background-color: #decaff;
      color: black;
      font-size: 2.5rem;
      padding: 1rem;
      border-radius: 10px;
      width: 50%;
      margin: 3rem auto;
      margin-top: 3rem;
    }
  }
`