import styled from "styled-components";
import ReactDOM from 'react-dom';
import React, { useEffect, useContext } from 'react';
import BodyContext from "../../context/body-context";

const Screen = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .6);
  z-index: 101;
  ${({ raisedZ }) => { return raisedZ ? 'z-index: 105;' : null }}

  @media only screen and (min-width: 920px) {
    width: 200vw;
    left: -50vw;
  } 
`;

const Content = styled.div`
  position: fixed;
  width: 80%;
  height: ${props => (props.contentHeight ? props.contentHeight : "80vh")};
  max-height: 580px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  max-width: 550px;

  ${({ addSong }) => {
    if (addSong) {
      return `
        @media only screen and (orientation: landscape) {
            overflow-y: scroll;
            height: 80%;
            display: block;
        }
      `
    }
  }}
`;

function Modal(props) {

  const { handleOutsideClick, contentHeight, flex, allowOverflow, raisedZ, addSong } = props;
  const { setModalBodyStyles } = useContext(BodyContext);

  useEffect(() => {

    if (!setModalBodyStyles) {
      return;
    }


    setModalBodyStyles(`
      position: fixed;
      width: 100vw;
      overflow: hidden;

      @media only screen and (min-width: 920px) {
        left: 50%;
        transform: translateX(-50%);
        max-width: 600px;
      }
    `)

    return () => {
      setModalBodyStyles(`
      `)
    }
  }, [setModalBodyStyles]);

  return (
    <>
      {ReactDOM.createPortal(
        <Screen onClick={handleOutsideClick} raisedZ={raisedZ} />,
        document.getElementById('screen-root')
      )}
      {ReactDOM.createPortal(
        <Content contentHeight={contentHeight} flex={flex} allowOverflow={allowOverflow} raisedZ={raisedZ} addSong={addSong}>
          {props.children}
        </Content>,
        document.getElementById('overlay-root')
      )}
    </>
  )
}

export default Modal;