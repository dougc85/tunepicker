import React, { useState } from 'react';
import Modal from '../generics/Modal.styled';
import useFormInput from '../../hooks/useFormInput';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AddSongToWantToLearnStyled, InputGrouping, TitleInput, ErrorMessage } from './AddSongToWantToLearn.styled';
import AddButton from '../generics/AddButton.styled';

function AddSongToWantToLearn(props) {

  const { setShowAddSong, user, tuneNames } = props;
  const [title, handleTitleChange, resetTitle] = useFormInput('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');




  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }

    resetTitle();
    setShowAddSong(false);
  }

  function handleTitleChangeAndErrorReset(e) {
    setShowError(false);
    setErrorMessage('');

    handleTitleChange(e);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (title === '') {
      setErrorMessage('This field is required');
      setShowError(true);
    } else if (tuneNames.hasOwnProperty(title)) {
      handleCancel();
      return;
    } else {
      try {
        await updateDoc(
          doc(db, 'users', user.uid),
          {
            [`tunesIWantToLearn.${title.toLowerCase().trim()}`]: null,
          });
        resetTitle();
        setShowAddSong(false);
      }
      catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <Modal handleOutsideClick={handleCancel} contentHeight="15rem">
      <AddSongToWantToLearnStyled>
        <legend>
          Add Song
        </legend>
        <InputGrouping width="100%">
          <label htmlFor="song-wantToLearn-title">Title:</label>
          <TitleInput required onChange={handleTitleChangeAndErrorReset} value={title} id="song-wantToLearn-title" type="text" name="song-wantToLearn-title" autoComplete="off"></TitleInput>
          {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputGrouping>
        <InputGrouping width="80%">
          <AddButton onClick={handleCancel}>Cancel</AddButton>
          <AddButton onClick={handleAdd}>Add</AddButton>
        </InputGrouping>
      </AddSongToWantToLearnStyled>
    </Modal>
  )
}

export default AddSongToWantToLearn;