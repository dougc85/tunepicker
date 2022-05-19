import React from 'react';
import { CannotDeleteStyled } from './CannotDelete.styled';
import Modal from '../../../generics/Modal.styled';
import AddButton from '../../../generics/AddButton.styled';

function CannotDelete(props) {

  const { setShowCannotDelete } = props;

  function hideCannotDelete(e) {
    if (e) {
      e.preventDefault();
    }

    setShowCannotDelete(false);
  }

  return (
    <Modal handleOutsideClick={hideCannotDelete} contentHeight={'30rem'}>
      <CannotDeleteStyled>
        <h3>Cannot Delete Set</h3>
        <div>
          <p>
            <span>This set cannot be deleted.</span>
            <span>You must have at least one set in your library at all times.</span>
            <span>If you would like to delete this set, create a new set first and then come back and delete this one.</span>
          </p>
          <AddButton onClick={hideCannotDelete}>Got it</AddButton>
        </div>
      </CannotDeleteStyled>
    </Modal>
  )
}

export default CannotDelete;