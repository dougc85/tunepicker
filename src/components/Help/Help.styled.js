import styled from 'styled-components';

export const HelpPageStyled = styled.div`
  font-size: 1.4rem;
padding: 2rem;
text-align: start;

>h2 {
  font-weight: 700;
  font-size: 2.4rem;
  margin-bottom: 2rem;
}

h3 {
  font-size: 2rem;
  display: inline-block;
}

>p {
  margin-bottom: 2rem;
  
  span {
    display: block;
    margin-top: 1rem;
  }
}

>ul {
  margin-bottom: 2rem;

  li {
    margin-left: 2rem;
  }
}
svg {
  height: 1em;
  display: inline-block;
  margin: 0 .3em;
  transform: translateY(.1em);
}
`