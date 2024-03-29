import React, { useState, useContext } from 'react';
import SubContext from '../../context/sub-context';
import Modal from '../generics/Modal.styled';
import useFormInput from '../../hooks/useFormInput';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AddSongToWantToLearnStyled, InputGrouping, TitleInput, ErrorMessage } from './AddSongToWantToLearn.styled';
import AddButton from '../generics/AddButton.styled';
import Loading from '../Loading/Loading';
import { removeDoubleSpaces } from '../../helperFunctions/removeDoubleSpaces';

function AddSongToWantToLearn(props) {

  const { setShowAddSong, user, tuneNames } = props;
  const [title, handleTitleChange, resetTitle] = useFormInput('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleNetworkError } = useContext(SubContext);


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

    const newTitle = removeDoubleSpaces(title.toLowerCase().trim());

    if (newTitle === '') {
      setErrorMessage('This field is required');
      setShowError(true);
      return;
    }
    if (newTitle.charAt(newTitle.length - 1) === '.' || newTitle[0] === '.') {
      setErrorMessage("Can't start or end with '.'");
      setShowError(true);
      return;
    }
    if (newTitle.includes('..')) {
      setErrorMessage("Title Must Not Include '..'");
      setShowError(true);
      return;
    }

    if (tuneNames.hasOwnProperty(newTitle)) {
      handleCancel();
      return;
    } else {
      try {
        setLoading(true);
        await updateDoc(
          doc(db, 'users', user.uid),
          {
            [`tunesIWantToLearn.${newTitle}`]: null,
          });
        resetTitle();
        setShowAddSong(false);
      }
      catch (error) {
        handleNetworkError(error.message);
      }

      setLoading(true);
    }
  }

  return (
    <Modal handleOutsideClick={handleCancel} contentHeight="15rem">
      {loading ? <Loading size={2} /> :
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
      }

    </Modal>
  )
}

export default AddSongToWantToLearn;