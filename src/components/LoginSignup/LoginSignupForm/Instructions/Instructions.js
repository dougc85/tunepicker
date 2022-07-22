import React from 'react';
import { InstructionsStyled } from './Instructions.styled';
import Modal from '../../../generics/Modal.styled';
import AddButton from '../../../generics/AddButton.styled';

function Instructions(props) {

  const { setShowInstructions } = props;

  function handleClose(e) {
    if (e) {
      e.preventDefault();
    }
    setShowInstructions(false);
  }

  return (
    <Modal handleOutsideClick={handleClose} contentHeight={'17rem'}>
      <InstructionsStyled>
        <h3>
          Password Reset
        </h3>
        <p>
          Enter your email address into the login form.  Then, click 'forgot?' again, and an email
          will be sent to you which will allow you to reset your password.
        </p>
        <div>
          <AddButton onClick={handleClose}>Got it</AddButton>
        </div>
      </InstructionsStyled>
    </Modal >
  )
}

export default Instructions;