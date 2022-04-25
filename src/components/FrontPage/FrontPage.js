import React from 'react';
import { FrontPageStyled } from './FrontPage.styled';

function FrontPage(props) {
  return (
    <FrontPageStyled >
      {`Hello ${props.user}!`}
    </FrontPageStyled>
  )
}

export default FrontPage