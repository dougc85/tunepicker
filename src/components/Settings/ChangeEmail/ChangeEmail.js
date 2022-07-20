import React from 'react';
import Modal from '../../generics/Modal.styled';
import { ChangeEmailStyled } from './ChangeEmail.styled';

function ChangeEmail(props) {

  const { setShowChangeEmail } = props;

  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }
    setShowChangeEmail(false);
  }
  return (
    <Modal handleOutsideClick={handleCancel} contentHeight={'30rem'}>
      <ChangeEmailStyled>

      </ChangeEmailStyled>
    </Modal >
  )
}

export default ChangeEmail;