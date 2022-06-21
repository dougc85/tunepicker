import React, { useState, useContext } from 'react';
import { EditTitleStyled, FormInputs, ButtonContainer } from './EditTitle.styled';
import Modal from '../../generics/Modal.styled';
import AddButton from '../../generics/AddButton.styled';
import SubContext from '../../../context/sub-context';
import { db } from '../../../firebaseConfig';
import { doc, updateDoc, deleteField } from 'firebase/firestore';

function EditTitle(props) {

  const { setShowEditTitle, songId, title, capitalize } = props;

  const context = useContext(SubContext);
  const { user } = context;

  const [titleVal, setTitleVal] = useState(capitalize(title));

  function hideEditTitle(e) {
    if (e) {
      e.preventDefault();
    }
    setShowEditTitle(false);
  }

  function handleInput(e) {
    setTitleVal(e.target.value);
  }

  function editTitle(e) {

    e.preventDefault();

    if (title !== titleVal) {
      const userDocRef = doc(db, 'users', user.uid);

      updateDoc(userDocRef, {
        [`songNames.${title}`]: deleteField(),
        [`songNames.${titleVal}`]: songId,
        [`songs.${songId}.title`]: titleVal.toLowerCase(),
      })
    }

    hideEditTitle();
  }

  return (
    <Modal handleOutsideClick={hideEditTitle} contentHeight={'14rem'}>
      <EditTitleStyled>
        <h3>Edit Title</h3>
        <FormInputs>
          <div>
            <label htmlFor="edit-title">Title:</label>
            <input value={titleVal} autoComplete="off" onChange={handleInput} id="edit-title" type="text" autoFocus name="edit-title" />
          </div>
          <ButtonContainer>
            <AddButton onClick={hideEditTitle}>Cancel</AddButton>
            <AddButton onClick={editTitle}>Confirm</AddButton>
          </ButtonContainer>
        </FormInputs>
      </EditTitleStyled>
    </Modal>

  )
}

export default EditTitle;