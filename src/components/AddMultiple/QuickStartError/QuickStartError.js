import React from 'react';
import { QuickStartErrorStyled } from './QuickStartError.styled';
import Modal from '../../generics/Modal.styled';
import AddButton from '../../generics/AddButton.styled';

function QuickStartError(props) {

  const { quickRewind, setShowQuickStartError } = props;

  function handleClick(e) {
    if (e) {
      e.preventDefault();
    }
    setShowQuickStartError(false);
    quickRewind();
  }

  return (
    <Modal handleOutsideClick={handleClick} contentHeight="15rem" raisedZ={true} >
      <QuickStartErrorStyled>
        <h3>QuickStart Error</h3>
        <p>
          Make sure you have entered exactly 3 songs, and that none of those songs are already in this set.
        </p>
        <AddButton onClick={handleClick}>Got it</AddButton>
      </QuickStartErrorStyled>
    </Modal>

  )
}

export default QuickStartError;