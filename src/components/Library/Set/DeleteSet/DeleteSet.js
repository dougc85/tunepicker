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

  const { user, userDoc } = useContext(SubContext);
  const { uid } = user;
  const { pickerSet: pickerId } = userDoc;
  const { songs } = userDoc;

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
      deleteSetDoc();
      updateDoc(doc(db, 'users', uid), {
        ...newSongFields,
        pickerSet: newPickerId,
        [`setNames.${setId}`]: deleteField(),

      });
    }
    catch (error) {
      console.log(error.message);
    }

    navigate('/library/sets');
  }

  function deleteAndRemove(e) {
    hideDeleteSet(e);

    let newPickerId = pickerId;
    if (pickerId === setId) {
      newPickerId = Object.keys(setNames).find((id) => id !== setId);
    }

    const newSongFields = {};


    Object.keys(allSongs).forEach(songId => {

      if (Object.keys(songs[songId].sets).length > 1) {
        newSongFields[`songs.${songId}.sets.${setId}`] = deleteField();
      } else {
        newSongFields[`songs.${songId}`] = deleteField();
        newSongFields[`songNames.${songs[songId]['title']}`] = deleteField();
      }
    })

    try {
      deleteSetDoc();
      updateDoc(doc(db, 'users', uid), {
        ...newSongFields,
        pickerSet: newPickerId,
        [`setNames.${setId}`]: deleteField(),
      });
    }
    catch (error) {
      console.log(error.message);
    }

    navigate('/library/sets');
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
      <Modal handleOutsideClick={hideDeleteSet} contentHeight={'20rem'}>
        <ConfirmRemoveSongs>
          <h3>Confirm Remove Songs</h3>
          <LowerContent>
            <p>
              Are you sure you want to delete the songs in this set from your Library?
              <span>{`** Note that only songs that are ONLY from this set (i.e., not in other sets) will be deleted`}</span>
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