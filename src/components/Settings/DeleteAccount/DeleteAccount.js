import React, { useState, useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { DeleteAccountStyled } from './DeleteAccount.styled';
import Modal from '../../generics/Modal.styled';
import AddButton from '../../generics/AddButton.styled';
import Reauthenticate from './Reauthenticate/Reauthenticate';
import { doc, writeBatch } from 'firebase/firestore';
import { deleteUser, signOut } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function DeleteAccount(props) {

  const { setShowDeleteAccount } = props;
  const [showReauth, setShowReauth] = useState(false);
  const [loading, setLoading] = useState(false);

  const context = useContext(SubContext);
  const { userDoc, user, handleNetworkError } = context;

  const navigate = useNavigate();

  function handleCancel() {
    setShowDeleteAccount(false);
  }

  function handleDeleteConfirm() {
    setShowReauth(true);
  }

  async function handleDelete(e) {
    if (e) {
      e.preventDefault();
    }

    try {
      const batch = writeBatch(db);
      Object.keys(userDoc.setNames).forEach((setId) => {
        batch.delete(doc(db, 'users', user.uid, 'sets', setId));
      })
      batch.delete(doc(db, 'users', user.uid));
      await batch.commit();
      await deleteUser(auth.currentUser);
      await signOut(auth)
      navigate('/welcome');
    }
    catch (error) {
      handleNetworkError(error.message);
    }

  }

  return (
    <>
      {
        showReauth ?
          <Reauthenticate deleteAccount email={user.email} action={handleDelete} setShow={setShowDeleteAccount} message="delete your account" actionMessage="Confirm Delete" loading={loading} setLoading={setLoading} /> :
          <Modal handleOutsideClick={handleCancel} contentHeight={'20rem'}>
            <DeleteAccountStyled>
              <h3>Delete Account</h3>
              <p>Are you sure you want to delete your account? This action cannot be undone.
                All your songs, sets, and settings will be deleted along with your login information.</p>
              <div>
                <AddButton onClick={handleCancel}>Cancel</AddButton>
                <div></div>
                <AddButton onClick={handleDeleteConfirm}>Delete</AddButton>
              </div>

            </DeleteAccountStyled>
          </Modal>
      }
    </>
  )
}

export default DeleteAccount;