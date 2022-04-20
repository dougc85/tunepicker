import styled from "styled-components";
import ReactDOM from 'react-dom';

const Screen = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .6);
  z-index: 100;
`;

const Content = styled.div`
  position: fixed;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  background-color: white;
  font-size: 2rem;
  padding: 1.5rem;
  box-sizing: border-box;
  z-index: 101;
`;

function Modal(props) {

  const { handleOutsideClick } = props;

  return (
    <>
      {ReactDOM.createPortal(
        <Screen onClick={handleOutsideClick} />,
        document.getElementById('screen-root')
      )}
      {ReactDOM.createPortal(
        <Content>
          {props.children}
        </Content>,
        document.getElementById('overlay-root')
      )}
    </>
  )
}

export default Modal;