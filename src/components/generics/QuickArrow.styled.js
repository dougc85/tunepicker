import React, { useRef } from 'react';
import styled from 'styled-components';

const QuickArrowStyled = styled.div`
  height: ${({ height }) => height + 'px'};
  position: absolute;
  top: ${({ top }) => {
    if (top) {
      return top + 'px';
    } else {
      return 'auto';
    }
  }};
  bottom: ${({ bottom }) => {
    if (bottom) {
      return bottom + 'px';
    } else {
      return 'auto';
    }
  }};
  left: ${({ left }) => {
    if (left) {
      return left + 'px';
    } else {
      return 'auto';
    }
  }};
  right: ${({ right }) => {
    if (right) {
      return right + 'px';
    } else {
      return 'auto';
    }
  }};

  z-index: 1000;
  pointer-events: none;
  ${({ center, height }) => {
    if (center) {
      return `
        left: calc(50% - ${height}px/2);
      `
    }
  }}
  
  ${({ devBorder }) => (devBorder ? 'border: 1px solid green;' : 'border: none;')}

  >svg {
    height: ${({ height }) => height + 'px'};
    transform: rotate(${({ rotation }) => rotation + 'deg'});
    color: red;
  }

  >p {
    display: block;
    width: max-content;
    max-width: 180px;
    position: absolute;
    background-color: #312727;
    color: white;
    padding: 20px;
    font-size: 1.6rem;
    border-radius: 5px;
    border: 3px solid red;
    ${({ textObject }) => {
    if (textObject) {
      return `
          top: ${textObject.top ? textObject.top + 'px' : 'auto'};
          bottom: ${textObject.bottom ? textObject.bottom + 'px' : 'auto'};
          left: ${textObject.left ? textObject.left + 'px' : 'auto'};
          right: ${textObject.right ? textObject.right + 'px' : 'auto'};
        `
    }
  }}
  }
`

function QuickArrow(props) {

  const { rotation, height, top, left, right, bottom, textObject, devBorder, center } = props;

  return (
    <QuickArrowStyled
      height={height || 140}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      rotation={rotation || 0}
      devBorder={devBorder}
      textObject={textObject}
      center={center}
    >

      <svg viewBox="0 0 24 24" >
        <path fill="currentColor" d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" />
      </svg>
      {textObject && (
        <p>
          {textObject ? textObject.text : null}
        </p>
      )}

    </QuickArrowStyled>

  )
}

export default QuickArrow;