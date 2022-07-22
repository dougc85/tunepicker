import React from 'react';
import { PasswordResetStyled } from './PasswordReset.styled';
import Modal from '../../../generics/Modal.styled';
import AddButton from '../../../generics/AddButton.styled';

function PasswordReset(props) {

  const { setShowPasswordReset, email } = props;

  function handleClose(e) {
    if (e) {
      e.preventDefault();
    }

    setShowPasswordReset(false);
  }

  return (
    <Modal handleOutsideClick={handleClose} contentHeight={'18rem'}>
      <PasswordResetStyled>
        <h3>Password Reset Sent</h3>
        <p>An email has been sent to '{`${email}`}' which will provide a link for you to reset
          your password.
          <span>If you're still having trouble, <a href="mailto:tunepicker.app@gmail.com">contact us</a>.</span>
        </p>
        <div>
          <AddButton onClick={handleClose}>Got it</AddButton>
        </div>
      </PasswordResetStyled>
    </Modal>

  )
}

export default PasswordReset;