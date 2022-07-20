import React, { useState } from 'react';
import { ChangePasswordStyled, ButtonContainer, LoadingContainer, Error } from './ChangePassword.styled';
import Modal from '../../generics/Modal.styled';
import Loading from '../../Loading/Loading';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig'
import AddButton from '../../generics/AddButton.styled';

function ChangePassword(props) {
  const { setShowChangePassword, oldEmail } = props;
  const [loading, setLoading] = useState(false);
  const [oldError, setOldError] = useState('');
  const [newError, setNewError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }
    setShowChangePassword(false);
  }

  function handleOldPasswordInput(e) {
    setOldError('');
    setOldPassword(e.target.value);
  }

  function handleNewPasswordInput(e) {
    setNewError('');
    setNewPassword(e.target.value);
  }

  async function changePassword(e) {
    if (e) {
      e.preventDefault();
    }

    if (!oldPassword) {
      setOldError('*Required Field')
      return;
    }

    if (!newPassword) {
      setNewError('*Required Field')
      return;
    }

    if (newPassword.length < 6) {
      setNewError('Password min of 6 characters')
      return;
    }

    if (newPassword === oldPassword) {
      setNewError('New password must be different')
      return;
    }

    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPassword
      )
      await reauthenticateWithCredential(
        auth.currentUser,
        credential
      )
      await updatePassword(auth.currentUser, newPassword)

      setShowChangePassword(false);
    }

    catch (error) {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setOldError('Invalid Password');
      }
      setLoading(false);
    }

  }

  return (
    <Modal handleOutsideClick={handleCancel} contentHeight={'35rem'}>
      <ChangePasswordStyled autoComplete="off">
        <h3>Change Password</h3>
        <p>Please enter your old password followed by your new password:</p>
        <div>
          <label>Email</label>
          <p>{oldEmail}</p>
        </div>
        <div>
          <label>Old Password</label>
          <input type="text" value={oldPassword} onChange={handleOldPasswordInput} autoComplete={"off"} />
          {oldError ? <Error>{oldError}</Error> : null}
        </div>
        <div>
          <label>New Password</label>
          <input type="text" value={newPassword} onChange={handleNewPasswordInput} autoComplete={"off"} />
          {newError ? <Error>{newError}</Error> : null}
        </div>
        <ButtonContainer>
          <AddButton onClick={handleCancel}>Cancel</AddButton>
          <div></div>
          <AddButton onClick={changePassword}>Change Password</AddButton>
          {loading &&
            <LoadingContainer>
              <Loading spinnerOnly embedded size={2} />
            </LoadingContainer>}
        </ButtonContainer>
      </ChangePasswordStyled>
    </Modal >
  )
}

export default ChangePassword;