import styled from "styled-components";

const Screen = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .6);
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
`;

function Modal(props) {

  const { reset, showModal } = props;

  function handleCancel(e) {
    e.preventDefault();
    reset();
    showModal(false);
  }

  return (
    <>
      <Screen onClick={handleCancel} />
      <Content>
        {props.children}
      </Content>
    </>
  )
}

export default Modal;