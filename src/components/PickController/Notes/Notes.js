import React from 'react';
import AddButton from '../../generics/AddButton.styled';
import Modal from '../../generics/Modal.styled';
import { NotesStyled } from './Notes.styled';

function Notes(props) {

  const { notes, setShowNotes } = props;

  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }

    setShowNotes(false);
  }

  function addWhitespace(str) {

    if (!str) {
      return (
        <p>This song has no notes to display.</p>
      )
    }

    let elementArray = [];
    let newString = '';

    for (const char of str) {

      if (char === '\n') {
        elementArray.push(newString);
        elementArray.push(<br />);
        newString = '';
      } else {
        newString = newString.concat(char);
      }
    }
    elementArray.push(newString);
    return elementArray;
  }

  return (
    <Modal handleOutsideClick={handleCancel} contentHeight={'30rem'}>
      <NotesStyled>
        <h3>Notes</h3>
        <p>{addWhitespace(notes)}</p>
        <AddButton onClick={handleCancel}>Done</AddButton>
      </NotesStyled>
    </Modal>
  )
}

export default Notes;