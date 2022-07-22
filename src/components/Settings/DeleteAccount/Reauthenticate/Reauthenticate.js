import React, { useState, useContext } from 'react';
import SubContext from '../../../../context/sub-context';
import { ReauthenticateStyled, ButtonContainer, LoadingContainer, Error } from './Reauthenticate.styled';
import Modal from '../../../generics/Modal.styled';
import AddButton from '../../../generics/AddButton.styled';
import { EmailAuthProvider, reauthenticateWithCredential, } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import Loading from '../../../Loading/Loading';


function Reauthenticate(props) {

  const { setShow, action, message, actionMessage, loading, setLoading, deleteAccount, email } = props;

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { handleNetworkError } = useContext(SubContext);

  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }
    setShow(false);
  }

  async function reauthenticateAndTakeAction(e) {

    if (e) {
      e.preventDefault();
    }

    if (!password) {
      setError('*Required Field')
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
      action();
      if (!deleteAccount) {
        setShow(false);
      }
    }
    catch (error) {
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError('Invalid Password');
      } else {
        handleNetworkError(error.message);
      }
      setLoading(false);
    }
  }

  function handleInput(e) {
    setError('');
    setPassword(e.target.value);
  }

  return (
    <Modal handleOutsideClick={handleCancel} contentHeight={'32rem'}>
      <ReauthenticateStyled>
        <h3>Reauthenticate</h3>
        <p>In order to {`${message}`}, you'll need to re-enter your password:</p>
        <div>
          <label>Email</label>
          <p>{email}</p>
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={handleInput} />
          {error ? <Error>{error}</Error> : null}
        </div>
        <ButtonContainer>
          <AddButton onClick={handleCancel}>Cancel</AddButton>
          <div></div>
          <AddButton onClick={reauthenticateAndTakeAction}>{actionMessage}</AddButton>
          {loading &&
            <LoadingContainer>
              <Loading spinnerOnly embedded size={2} />
            </LoadingContainer>}
        </ButtonContainer>
      </ReauthenticateStyled>
    </Modal>

  )
}

export default Reauthenticate;