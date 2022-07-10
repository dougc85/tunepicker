import React, { useState } from 'react';
import { EditSetNameStyled, InputGrouping, TitleInput, ErrorMessage } from './EditSetName.styled';
import Modal from '../../../generics/Modal.styled';
import useFormInput from '../../../../hooks/useFormInput';
import AddButton from '../../../generics/AddButton.styled';
import {
  updateDoc, doc, collection,
} from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import capitalize from '../../../../helperFunctions/capitalize';

function EditSetName(props) {

  const { setShowEditSetName, oldTitle, setNames, user, setId } = props;

  const [disableForm, setDisableForm] = useState(false);
  const [title, handleTitleChange] = useFormInput(capitalize(oldTitle));
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }

    setShowEditSetName(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const enteredSetName = title.toLowerCase()
    const oldLowercase = oldTitle.toLowerCase();

    if (enteredSetName === '') {
      setShowError(true);
      setErrorMessage('Set name cannot be blank');
      setDisableForm(true);
      return;
    }


    if (enteredSetName === oldLowercase) {
      handleCancel();
    } else {
      const userDocRef = doc(db, 'users', user.uid);
      const setDocRef = doc(userDocRef, 'sets', setId);

      try {
        updateDoc(userDocRef, {
          [`setNames.${setId}`]: enteredSetName
        })
        updateDoc(setDocRef, {
          setName: enteredSetName
        })
      }
      catch (error) {
        console.log(error.message);
      }
      handleCancel();
    }
  }

  function handleTitleChangeAndDuplicates(e) {
    setShowError(false);
    setErrorMessage('');
    if (Object.keys(setNames).some((setId) => {
      const testSetName = setNames[setId].toLowerCase();
      const enteredSetName = e.target.value.toLowerCase()
      const oldLowercase = oldTitle.toLowerCase();

      return (testSetName === enteredSetName && testSetName !== oldLowercase)
    })) {
      setShowError(true);
      setErrorMessage('Another set has this name already');
      setDisableForm(true);
    } else {
      setDisableForm(false);
    }
    handleTitleChange(e);
  }

  return (
    <Modal handleOutsideClick={handleCancel} contentHeight="15rem">
      <EditSetNameStyled>
        <legend>
          Edit Set Name
        </legend>
        <InputGrouping width="100%">
          <TitleInput required autoFocus onChange={handleTitleChangeAndDuplicates} value={title} id="edit-set-title-input" type="text" name="set-title" autoComplete="off"></TitleInput>
          {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputGrouping>
        <InputGrouping width="80%">
          <AddButton onClick={handleCancel}>Cancel</AddButton>
          <AddButton disabled={disableForm} disable={disableForm} onClick={handleSubmit}>Submit</AddButton>
        </InputGrouping>

      </EditSetNameStyled>
    </Modal>
  )
}

export default EditSetName;