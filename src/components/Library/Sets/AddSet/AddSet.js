import { React, useState, useContext } from 'react';
import SubContext from '../../../../context/sub-context';
import {
  addDoc, doc, collection, updateDoc,
} from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import useFormInput from '../../../../hooks/useFormInput';
import Modal from '../../../generics/Modal.styled';
import { AddSetStyled, InputGrouping, ErrorMessage } from './AddSet.styled';
import AddButton from '../../../generics/AddButton.styled';
import { TitleInput } from '../../../AddSong/AddSong.styled';
import Loading from '../../../Loading/Loading';
import { removeDoubleSpaces } from '../../../../helperFunctions/removeDoubleSpaces';

function AddSet(props) {

  const { user, userDoc } = useContext(SubContext);

  const { setNames } = userDoc;

  const { setShowAddSet, titleArrow, quickForward, rememberSetName } = props;

  const [disableForm, setDisableForm] = useState(false);
  const [title, handleTitleChange, resetTitle] = useFormInput('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleNetworkError } = useContext(SubContext);

  function handleCancel(e) {
    e.preventDefault();
    if (titleArrow) {
      return;
    }
    resetTitle();
    setShowAddSet(false);
  }

  function handleTitleChangeAndDuplicates(e) {
    setShowError(false);
    setErrorMessage('');
    if (Object.keys(setNames).some((setId) => setNames[setId].toLowerCase() === removeDoubleSpaces(e.target.value.toLowerCase().trim()))) {
      setShowError(true);
      setErrorMessage('This set name already taken')
      setDisableForm(true);
    } else {
      setDisableForm(false);
    }
    handleTitleChange(e);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (title === '') {
      setErrorMessage('This field is required');
      setShowError(true);
    } else {
      setLoading(true);
      const titleLower = removeDoubleSpaces(title.toLowerCase().trim());
      try {
        const newSet = {
          setName: titleLower,
          fullKnow: [],
          currentKnow: [],
          fullNew: [],
          currentNew: [],
          fullMedium: [],
          currentMedium: [],
          allSongs: {},
        };
        const newSetDoc = await addDoc(
          collection(db, 'users', user.uid, 'sets'),
          newSet,
        );

        await updateDoc(
          doc(db, 'users', user.uid),
          {
            [`setNames.${newSetDoc.id}`]: titleLower,
          });
      }
      catch (error) {
        handleNetworkError(error.message);
      }

      resetTitle();
      setLoading(false);
      setShowAddSet(false);
      if (quickForward) {
        rememberSetName(titleLower);
        quickForward();
      }
    }
  }

  return (
    <Modal
      handleOutsideClick={handleCancel}
      contentHeight="15rem"
      allowOverflow={titleArrow ? true : false}
    >
      {loading ? <Loading size={2} /> :
        <AddSetStyled>
          <legend>
            Add Set
          </legend>
          <InputGrouping width="100%">
            {titleArrow ? titleArrow : null}
            <label htmlFor="set-title">Title:</label>
            <TitleInput required onChange={handleTitleChangeAndDuplicates} value={title} id="set-title" type="text" name="set-title" autoComplete="off"></TitleInput>
            {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </InputGrouping>
          <InputGrouping width="80%">
            <AddButton onClick={handleCancel} disable={titleArrow ? true : false}>Cancel</AddButton>
            <AddButton disabled={disableForm} disable={disableForm} onClick={handleAdd}>Add</AddButton>
          </InputGrouping>
        </AddSetStyled>
      }
    </Modal>
  )
}

export default AddSet;