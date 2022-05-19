import React, { useState } from 'react';
import { ConfirmRemoveSongs, DeleteSetStyled, LowerContent } from './DeleteSet.styled';
import Modal from '../../../generics/Modal.styled';
import AddButton from '../../../generics/AddButton.styled';

function DeleteSet(props) {

  const { setShowDeleteSet } = props;

  const [showFirstModal, setShowFirstModal] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);

  function hideDeleteSet(e) {
    if (e) {
      e.preventDefault();
    }
    setShowDeleteSet(false);
  }

  function handleDeleteAndKeep(e) {
    hideDeleteSet(e);


  }

  function handleDeleteAndRemoveButton(e) {
    setShowFirstModal(false);
    setShowSecondModal(true);
  }

  if (showFirstModal) {
    return (
      <Modal handleOutsideClick={hideDeleteSet} contentHeight={'20rem'}>
        <DeleteSetStyled>
          <h3>Delete Set</h3>
          <div>
            <AddButton onClick={handleDeleteAndRemoveButton}>Delete set, and remove songs from Library</AddButton>
            <AddButton onClick={handleDeleteAndKeep}>Delete set, but keep songs in Library</AddButton>
            <AddButton onClick={hideDeleteSet}>Cancel</AddButton>
          </div>
        </DeleteSetStyled>
      </Modal>
    )
  }

  if (showSecondModal) {
    return (
      <Modal handleOutsideClick={hideDeleteSet} contentHeight={'15rem'}>
        <ConfirmRemoveSongs>
          <h3>Confirm Remove Songs</h3>
          <LowerContent>
            <p>
              Are you sure you want to delete all the songs in this set from your Library?
            </p>
            <div>
              <AddButton onClick={hideDeleteSet}>Cancel</AddButton>
              <AddButton>Confirm</AddButton>
            </div>
          </LowerContent>
        </ConfirmRemoveSongs>
      </Modal >
    )
  }
}

export default DeleteSet;