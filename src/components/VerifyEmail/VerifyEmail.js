import React from 'react';
import Modal from '../generics/Modal.styled';
import { VerifyEmailStyled, ButtonGroup } from './VerifyEmail.styled';
import { signOut, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AddButton from '../generics/AddButton.styled';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {

  const navigate = useNavigate();

  function handleLogOut() {
    navigate('/welcome');
    signOut(auth).then(() => {

    })
      .catch((err) => {
        console.log(err.message);
      })
  }

  return (
    <Modal handleOutsideClick={() => { }} contentHeight="auto">
      <VerifyEmailStyled>
        <h2>Email Verification</h2>
        <p>An email has been sent to you containing a link to verify your email address and complete the sign-up process. After clicking the link in your email, return here, log out and log back in.  Thank you!</p>
        <ButtonGroup>
          <AddButton onClick={handleLogOut}>Log Out</AddButton>
          <AddButton onClick={() => { sendEmailVerification(auth.currentUser) }}>Resend Verification</AddButton>
        </ButtonGroup>


      </VerifyEmailStyled>
    </Modal>
  )
}

export default VerifyEmail;