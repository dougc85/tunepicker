import styled from "styled-components";
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

const Screen = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .6);
  z-index: 101;
  ${({ raisedZ }) => { return raisedZ ? 'z-index: 105;' : null }}
`;

const Content = styled.div`
  position: fixed;
  width: 80%;
  height: ${props => (props.contentHeight ? props.contentHeight : "80vh")};
  max-height: 580px;
  top: 50%;
  transform: translateY(-50%);
  left: 10%;
  background-color: white;
  font-size: 2rem;
  padding: 1.5rem;
  box-sizing: border-box;
  z-index: 102;
  ${({ raisedZ }) => { return raisedZ ? 'z-index: 106;' : null }}
  overflow: ${({ allowOverflow }) => (allowOverflow ? 'visible' : 'scroll')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  display: ${props => props.flex ? 'flex' : 'block'};
`;

function Modal(props) {

  const { handleOutsideClick, contentHeight, flex, allowOverflow, raisedZ } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100vw';

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <Screen onClick={handleOutsideClick} raisedZ={raisedZ} />,
        document.getElementById('screen-root')
      )}
      {ReactDOM.createPortal(
        <Content contentHeight={contentHeight} flex={flex} allowOverflow={allowOverflow} raisedZ={raisedZ}>
          {props.children}
        </Content>,
        document.getElementById('overlay-root')
      )}
    </>
  )
}

export default Modal;