import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Screen, Content, Error } from './ErrorModal.styled';
import AddButton from '../AddButton.styled';

function ErrorModal(props) {

  const { handleOutsideClick, message } = props;

  const [showError, setShowError] = useState(false);

  function handleTriangle(e) {
    setShowError((prev) => !prev);
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Screen onClick={handleOutsideClick} />,
        document.getElementById('screen-root')
      )}
      {ReactDOM.createPortal(
        <Content showError={showError}>
          <div>
            <h3>Network Error</h3>
            <p>A network error has occured. The action you just took was probably invalidated. Common causes include
              a poor internet connection, a problem at the server, a problem in the network. If you receive an error
              that you think is unrelated to these, <a href="mailto:tunepicker.app@gmail.com">contact us</a>.
            </p>
            <h4 onClick={handleTriangle}>
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M1,21H23L12,2" />
              </svg>
              Error Details
            </h4>
            <Error showError={showError}>
              <p>{message}</p>
            </Error>
            <div>
              <AddButton onClick={handleOutsideClick}>Got it</AddButton>
            </div>

          </div>
        </Content>,
        document.getElementById('overlay-root')
      )}
    </>
  )
}

export default ErrorModal;