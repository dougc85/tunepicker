import React, { useState } from 'react';
import Modal from '../generics/Modal.styled';
import { VerifyEmailStyled, ButtonGroup, Error, Feedback } from './VerifyEmail.styled';
import { signOut, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AddButton from '../generics/AddButton.styled';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {

  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [feedback, setFeedback] = useState('');

  async function handleLogOut() {
    navigate('/welcome');
    try {
      signOut(auth)
    }
    catch (error) {
      console.log(error.message);
    }
  }

  async function handleSendingEmail() {
    try {
      await sendEmailVerification(auth.currentUser);
      if (emailError) {
        setEmailError('');
      }
      setFeedback('Email sent')
      setTimeout(() => {
        setFeedback('');
      }, 3000)
    }
    catch (error) {
      if (error.message === "Firebase: Error (auth/too-many-requests).") {
        if (feedback) {
          setFeedback('');
        }
        setEmailError(
          <>
            <span>Too many requests.</span>
            <span>Try again in a few minutes.</span>
          </>

        );
        setTimeout(() => {
          setEmailError('');
        }, 3000)
      }
      console.log(error.message);
    }

  }

  return (
    <Modal handleOutsideClick={() => { }} contentHeight="auto">
      <VerifyEmailStyled>
        <h2>Email Verification</h2>
        <p>An email has been sent to you containing a link to verify your email address and complete the sign-up process. After clicking the link in your email, return here, log out and log back in.  Thank you!
          <span>*Check spam folder for the email</span>
        </p>

        <ButtonGroup>
          <AddButton onClick={handleLogOut}>Log Out</AddButton>
          <div>
            <AddButton onClick={handleSendingEmail}>Resend Verification</AddButton>
            {emailError ? <Error>{emailError}</Error> : null}
            {feedback ? <Feedback>{feedback}</Feedback> : null}
          </div>
        </ButtonGroup>


      </VerifyEmailStyled>
    </Modal>
  )
}

export default VerifyEmail;