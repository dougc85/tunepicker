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
  ${({ devBorder }) => (devBorder ? 'border: 1px solid green;' : 'border: none;')}

  >svg {
    height: ${({ height }) => height ? (height + 'px') : (140 + 'px')};
    transform: rotate(${({ rotation }) => rotation ? (rotation + 'deg') : (0 + 'deg')});
    color: red;
  }

  >p {
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
      console.log(textObject, 'text');
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

  const { rotation, height, top, left, right, bottom, textObject, devBorder } = props;

  return (
    <QuickArrowStyled
      height={height}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      rotation={rotation}
      devBorder={devBorder}
      textObject={textObject}
    >

      <svg viewBox="0 0 24 24" >
        <path fill="currentColor" d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" />
      </svg>
      {textObject && (
        <p textObject={textObject}>
          {textObject ? textObject.text : null}
        </p>
      )}

    </QuickArrowStyled>

  )
}

export default QuickArrow;