import styled from 'styled-components';

export const TunesIWantToLearnStyled = styled.div`
  margin-top: 1.5rem;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
      font-weight: bold;
      font-size: 2.5rem;
      margin-left: 1rem;
    }
  svg {
    height: 24px;
    margin-left: 1rem;
  }
  
`

export const TunesStyled = styled.ul`
  li {
    padding: 1rem;
    font-size: 2rem;
    text-align: start;
    position: relative;

    &:nth-child(2n-1) {
      background-color: #fee9e9;
    }

    &:nth-child(2n) {
      background-color: #ffd3d3;
    }

    svg {
      height: 20px;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(0,0,0, .4);
    }
  }
`;