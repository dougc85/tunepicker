import React, { useState, useContext } from 'react';
import { EditTitleStyled, FormInputs, ButtonContainer, ErrorMessage } from './EditTitle.styled';
import Modal from '../../generics/Modal.styled';
import AddButton from '../../generics/AddButton.styled';
import SubContext from '../../../context/sub-context';
import { db } from '../../../firebaseConfig';
import { doc, updateDoc, deleteField } from 'firebase/firestore';
import capitalize from '../../../helperFunctions/capitalize';
import Loading from '../../Loading/Loading';

function EditTitle(props) {

  const { setShowEditTitle, songId, title } = props;

  const context = useContext(SubContext);
  const { user, userDoc } = context;
  const { songNames } = userDoc;

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [titleVal, setTitleVal] = useState(capitalize(title));

  function hideEditTitle(e) {
    if (e) {
      e.preventDefault();
    }
    setShowEditTitle(false);
  }

  function handleInput(e) {
    setErrorMessage('');
    setShowError(false);
    setTitleVal(e.target.value);
  }

  async function editTitle(e) {

    e.preventDefault();

    const newTitle = titleVal.toLowerCase().trim();

    if (title !== newTitle) {

      if (newTitle === '') {
        setErrorMessage('Title cannot be blank');
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

      if (songNames[newTitle]) {
        setErrorMessage("Title already in use");
        setShowError(true);
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);

      try {
        setLoading(true);
        await updateDoc(userDocRef, {
          [`songNames.${title}`]: deleteField(),
          [`songNames.${newTitle}`]: songId,
          [`songs.${songId}.title`]: newTitle,
        })
      } catch (error) {
        console.log(error.message);
      }
    }

    setLoading(false);
    hideEditTitle();
  }

  return (
    <Modal handleOutsideClick={hideEditTitle} contentHeight={'14rem'}>
      {loading ? <Loading size={2} /> :
        <EditTitleStyled >
          <h3>Edit Title</h3>
          <FormInputs>
            <div>
              <label htmlFor="edit-title">Title:</label>
              <input value={titleVal} autoComplete="off" onChange={handleInput} id="edit-title" type="text" autoFocus name="edit-title" />
              {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </div>
            <ButtonContainer>
              <AddButton onClick={hideEditTitle}>Cancel</AddButton>
              <AddButton onClick={editTitle}>Confirm</AddButton>
            </ButtonContainer>
          </FormInputs>
        </EditTitleStyled>
      }
    </Modal>

  )
}

export default EditTitle;