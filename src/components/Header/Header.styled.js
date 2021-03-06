import styled from 'styled-components';
import { fonts } from '../../partials/variables.styled';

export const HeaderStyled = styled.header`

  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100vw;

  h1 {
    font-family: ${fonts.appFont};
    border-bottom: 1px solid grey;
    text-align: center;
    font-size: 4rem;
    padding: 1.5rem 0;
    background-color: #eee;
    box-shadow: 0 .5rem 1.5rem rgba(70, 70, 70, 0.2);
  }
`

export const SiteContent = styled.div`
  margin-top: 88px;
`