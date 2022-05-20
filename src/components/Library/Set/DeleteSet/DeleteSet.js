import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SubContext from '../../../../context/sub-context';
import { ConfirmRemoveSongs, DeleteSetStyled, LowerContent } from './DeleteSet.styled';
import Modal from '../../../generics/Modal.styled';
import AddButton from '../../../generics/AddButton.styled';
import { doc, deleteDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';

function DeleteSet(props) {

  const navigate = useNavigate();

  const { setShowDeleteSet, set, setNames } = props;

  const { id: setId, allSongs } = set;

  const { user, pickerSet } = useContext(SubContext);
  const { uid } = user;
  const { id: pickerId } = pickerSet;

  const [showFirstModal, setShowFirstModal] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);

  function hideDeleteSet(e) {
    if (e) {
      e.preventDefault();
    }
    setShowDeleteSet(false);
  }

  function handleDeleteAndRemoveButton(e) {
    setShowFirstModal(false);
    setShowSecondModal(true);
  }

  function deleteSetDoc() {
    deleteDoc(doc(db, 'users', uid, 'sets', setId));
  }

  function deleteAndKeep(e) {
    hideDeleteSet(e);

    let newPickerId = pickerId;
    if (pickerId === setId) {
      newPickerId = Object.keys(setNames).find((id) => id !== setId);
    }

    const newSongFields = {};

    Object.keys(allSongs).forEach(songId => {
      newSongFields[`songs.${songId}.sets.${setId}`] = deleteField();
    })

    try {
      updateDoc(doc(db, 'users', uid), {
        ...newSongFields,
        pickerSet: newPickerId,
        [`setNames.${setId}`]: deleteField(),

      });

      deleteSetDoc();

    }
    catch (error) {
      console.log(error);
    }

    navigate('/library/sets');
  }

  async function deleteAndRemove(e) {
    hideDeleteSet(e);
    deleteSetDoc();
  }

  if (showFirstModal) {
    return (
      <Modal handleOutsideClick={hideDeleteSet} contentHeight={'20rem'}>
        <DeleteSetStyled>
          <h3>Delete Set</h3>
          <div>
            <AddButton onClick={handleDeleteAndRemoveButton}>Delete set, and remove songs from Library</AddButton>
            <AddButton onClick={deleteAndKeep}>Delete set, but keep songs in Library</AddButton>
            <AddButton onClick={hideDeleteSet}>Cancel</AddButton>
          </div>
        </DeleteSetStyled>
      </Modal>
    )
  }

  if (showSecondModal) {
    return (
      <Modal handleOutsideClick={hideDeleteSet} contentHeight={'15rem'}>
        <ConfirmRemoveSongs>
          <h3>Confirm Remove Songs</h3>
          <LowerContent>
            <p>
              Are you sure you want to delete all the songs in this set from your Library?
            </p>
            <div>
              <AddButton onClick={hideDeleteSet}>Cancel</AddButton>
              <AddButton onClick={deleteAndRemove}>Confirm</AddButton>
            </div>
          </LowerContent>
        </ConfirmRemoveSongs>
      </Modal >
    )
  }
}

export default DeleteSet;