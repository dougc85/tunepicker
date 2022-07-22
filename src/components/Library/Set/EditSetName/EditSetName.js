import React, { useState, useContext } from 'react';
import SubContext from '../../../../context/sub-context';
import { EditSetNameStyled, InputGrouping, TitleInput, ErrorMessage } from './EditSetName.styled';
import Modal from '../../../generics/Modal.styled';
import useFormInput from '../../../../hooks/useFormInput';
import AddButton from '../../../generics/AddButton.styled';
import {
  doc, writeBatch
} from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import capitalize from '../../../../helperFunctions/capitalize';
import Loading from '../../../Loading/Loading';

function EditSetName(props) {

  const { setShowEditSetName, oldTitle, setNames, user, setId } = props;

  const [disableForm, setDisableForm] = useState(false);
  const [title, handleTitleChange] = useFormInput(capitalize(oldTitle));
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleNetworkError } = useContext(SubContext);

  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }

    setShowEditSetName(false);
  }

  async function handleSubmit(e) {
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
      setLoading(true);
      const userDocRef = doc(db, 'users', user.uid);
      const setDocRef = doc(userDocRef, 'sets', setId);

      try {
        const batch = writeBatch(db);

        batch.update(userDocRef, {
          [`setNames.${setId}`]: enteredSetName
        })
        batch.update(setDocRef, {
          setName: enteredSetName
        })

        await batch.commit();
      }
      catch (error) {
        handleNetworkError(error.message);
      }

      setLoading(false);
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
      {loading ? <Loading size={2} /> :
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
      }
    </Modal>
  )
}

export default EditSetName;