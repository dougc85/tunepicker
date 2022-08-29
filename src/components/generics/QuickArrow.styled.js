import React from 'react';
import styled from 'styled-components';

const QuickArrowStyled = styled.div`
  height: ${({ height }) => height ? (height + 'px') : (140 + 'px')};
  position: absolute;
  top: ${({ top }) => top ? (top + 'px') : 'auto'};
  left: ${({ left }) => left ? (left + 'px') : 'auto'};
  right: ${({ right }) => right ? (right + 'px') : 'auto'};
  bottom: ${({ bottom }) => bottom ? (bottom + 'px') : 'auto'};
  z-index: 1000;

  >svg {
    height: ${({ height }) => height ? (height + 'px') : (140 + 'px')};
    transform: rotate(${({ rotation }) => rotation ? (rotation + 'deg') : (0 + 'deg')});
    color: red;
  }
`

function QuickArrow(props) {

  const { rotation, height, top, left, right, bottom } = props;

  return (
    <QuickArrowStyled height={height} top={top} left={left} right={right} bottom={bottom} rotation={rotation}>
      <svg viewBox="0 0 24 24" >
        <path fill="currentColor" d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" />
      </svg>
    </QuickArrowStyled>

  )
}

export default QuickArrow;