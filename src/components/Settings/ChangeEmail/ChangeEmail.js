import React, { useState } from 'react';
import Modal from '../../generics/Modal.styled';
import { ChangeEmailStyled, ButtonContainer, PasswordContainer, LoadingContainer, Error } from './ChangeEmail.styled';
import AddButton from '../../generics/AddButton.styled';
import Loading from '../../Loading/Loading';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

function ChangeEmail(props) {

  const { setShowChangeEmail, oldEmail } = props;
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }
    setShowChangeEmail(false);
  }

  function handleEmailInput(e) {
    setEmailError('');
    setEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPasswordError('');
    setPassword(e.target.value);
  }

  async function changeEmail(e) {
    if (e) {
      e.preventDefault();
    }

    if (!password) {
      setPasswordError('*Required Field')
      return;
    }

    if (!email) {
      setEmailError('*Required Field')
      return;
    }

    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      )
      await reauthenticateWithCredential(
        auth.currentUser,
        credential
      )
      await updateEmail(auth.currentUser, email.trim().toLowerCase());
      await sendEmailVerification(auth.currentUser);
      await signOut(auth);
    }

    catch (error) {
      console.log(error.message);
      if (error.message === 'Firebase: Error (auth/invalid-email).') {
        setEmailError('Invalid Email');
      }
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        setEmailError('Email already in use');
      }
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setPasswordError('Invalid Password');
      }
      setLoading(false);
    }
  }

  return (
    <Modal handleOutsideClick={handleCancel} contentHeight={'47rem'}>
      <ChangeEmailStyled autoComplete="off">
        <h3>Change Email</h3>
        <p>Please enter your new preferred email address and re-enter your password.
          <span>
            After submitting this form, you will be logged out, and a verification email will be sent
            to your new email address.  You will need to click on the link in this email in order to
            log back in.
            <span>*Check your spam folder for the verification email!!*</span>
          </span>

        </p>
        <div>
          <label>Old Email</label>
          <p>{oldEmail}</p>
        </div>
        <div>
          <label>New Email</label>
          <input type="text" value={email} onChange={handleEmailInput} autoComplete={"off"} />
          {emailError ? <Error>{emailError}</Error> : null}
        </div>
        <div>
          <label>Password</label>
          <PasswordContainer>
            <input type="text" value={password} onChange={handlePasswordInput} autoComplete={"off"} />
          </PasswordContainer>
          {passwordError ? <Error>{passwordError}</Error> : null}
        </div>
        <ButtonContainer>
          <AddButton onClick={handleCancel}>Cancel</AddButton>
          <div></div>
          <AddButton onClick={changeEmail}>Change Email</AddButton>
          {loading &&
            <LoadingContainer>
              <Loading spinnerOnly embedded size={2} />
            </LoadingContainer>}
        </ButtonContainer>
      </ChangeEmailStyled>
    </Modal >
  )
}

export default ChangeEmail;