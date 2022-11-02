import styled from 'styled-components';
import { fonts } from '../../partials/variables.styled';

export const HeaderStyled = styled.header`

  position: fixed;
  z-index: 100;
  ${({ hideLibMenu }) => {
    if (hideLibMenu) {
      return `
        z-index: 10000;
      `
    }
  }}
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  width: 100vw;
  @media only screen and (min-width : 920px) {
      max-width: 500px;
      margin: 0 auto;
    }

  h1 {
    font-family: ${fonts.appFont};
    border-bottom: 1px solid grey;
    text-align: center;
    font-size: 40px;
    padding: 15px 0;
    background-color: #eee;
    box-shadow: 0 5px 15px rgba(70, 70, 70, 0.2);
    user-select: none;
  }
`

export const SiteContent = styled.div`
  margin-top: 88px;
  background-color: white;
`