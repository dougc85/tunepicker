import React from 'react';
import { AddFromLibraryStyled, ButtonContainer, EntryGrouping } from './AddFromLibrary.styled';
import Modal from '../../../generics/Modal.styled'
import capitalize from '../../../../helperFunctions/capitalize';
import AddButton from '../../../generics/AddButton.styled';
import LibraryEntry from './LibraryEntry/LibraryEntry';

function AddFromLibrary(props) {

  const { setShowAddFromLibrary, set, user, userDoc } = props;
  const { setNames, songNames } = userDoc;

  function hideAddFromLibrary(e) {
    if (e) {
      e.preventDefault();
    }

    setShowAddFromLibrary(false);
  }

  ;
  const newSongArray = Object.keys(songNames).sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true });
  })

  return (
    <Modal handleOutsideClick={hideAddFromLibrary}>
      <AddFromLibraryStyled>
        <h3>Add Songs From Your Library</h3>
        <p>
          Select from the lists below songs from your library that you would like to add to '{`${capitalize(set.setName)}`}'.
          <span>
            If you select a set, all songs from that set will be added to '{`${capitalize(set.setName)}`}'.
          </span>
          <span>
            Click 'Submit' when you are finished.
          </span>
        </p>
        <ButtonContainer>
          <AddButton onClick={hideAddFromLibrary}>Cancel</AddButton>
          <AddButton>Submit</AddButton>
        </ButtonContainer>
        <EntryGrouping>
          <h4>Sets</h4>
          <ul>
            {Object.keys(setNames).sort((id1, id2) => {
              if (setNames[id1] < setNames[id2]) {
                return -1;
              }
              return 1;
            }).map((setId) => {
              return (
                <LibraryEntry entryType='set' entryId={setId} entryTitle={capitalize(setNames[setId])} key={setId} />
              )
            })}
          </ul>
        </EntryGrouping>
        <EntryGrouping>
          <h4>All Songs</h4>
          <ul>
            {newSongArray.map((songName) => {
              return (
                <LibraryEntry entryType='set' entryId={songNames[songName]} entryTitle={capitalize(songName)} key={songNames[songName]} />
              )
            })}
          </ul>
        </EntryGrouping>


      </AddFromLibraryStyled>
    </Modal>

  )
}

export default AddFromLibrary;