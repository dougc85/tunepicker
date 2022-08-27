import React from 'react';
import styled from 'styled-components';

const QuickArrowStyled = styled.svg`
  height: 140px;
  position: absolute;
  top: 0;
  left: 0;
  color: red;
`

function QuickArrow() {
  return (
    <QuickArrowStyled viewBox="0 0 24 24">
      <path fill="currentColor" d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" />
    </QuickArrowStyled>
  )
}

export default QuickArrow;