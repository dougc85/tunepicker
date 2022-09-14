import React, { useState, useContext } from 'react';
import SubContext from '../../context/sub-context';
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

  const { handleNetworkError } = useContext(SubContext);

  async function handleLogOut() {
    navigate('/welcome');
    try {
      signOut(auth)
    }
    catch (error) {
      handleNetworkError(error.message);
    }
  }

  async function handleSendingEmail() {
    try {
      await sendEmailVerification(auth.currentUser, { url: 'http://tunepicker.app/email_auth' });
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
      } else {
        handleNetworkError(error.message);
      }
    }

  }

  return (
    <Modal handleOutsideClick={() => { }} contentHeight="auto">
      <VerifyEmailStyled>
        <h2>Email Verification</h2>
        <p>A verification email has been sent to you. Open it, click the link inside, and then click 'continue'
          on the page it opens in your browser.
          <span>
            <span>It may take up to 15 minutes to receive; also, you may need to check your spam folder</span>. If, after waiting, you don't
            see an email, click the link below to send another one.  If you have any other problems, log out and then log back in.
          </span>

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