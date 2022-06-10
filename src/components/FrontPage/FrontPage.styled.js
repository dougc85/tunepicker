import styled from 'styled-components';

export const FrontPageStyled = styled.div`

font-size: 1.4rem;
padding: 2rem;
text-align: start;

>h2 {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 2rem;
}

h3 {
  font-size: 1.5em;
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

`;

export const Checkbox = styled.div`
  
  display: flex;
  align-items: center;

  label {
    margin-left: 1rem;
    font-size: 1.2rem;
  }
  p {
    margin-left: 1rem;
    font-size: 1.2rem;
  }
  input {
    height: 12px;
    width: auto;
    border: 1px solid red;
    flex: 0;
  }
`

export const Separator = styled.div`
  border-bottom: 1px solid black;
  margin: 0rem auto 2rem auto;
  width: 80%;
`