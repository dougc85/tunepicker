import React, { useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { MoveDownAndOutStyled } from "./MoveDownAndOut.styled";
import Modal from '../../generics/Modal.styled';
import AddButton from '../../generics/AddButton.styled';
import {
  doc,
  deleteField,
  arrayRemove,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import capitalize from '../../../helperFunctions/capitalize';

function MoveDownAndOut(props) {

  const context = useContext(SubContext);
  const { user, userDoc, handleNetworkError } = context;
  const {
    setShowMoveDownAndOut,
    songId,
    title,
    setTune,
    knowledgeArrays,
    setLocalLoading,
    moveOutArrow,
    quickForward,
  } = props;

  const song = userDoc.songs[songId];

  function hideMoveDownAndOut(e) {
    if (e) {
      e.preventDefault();
    }
    setShowMoveDownAndOut(false);
  }

  async function handleMove(e) {
    hideMoveDownAndOut(e);
    setLocalLoading(true);

    setTune('');

    const userDocRef = doc(db, 'users', user.uid);
    const setIds = Object.keys(song.sets);
    const setDocRefs = setIds.map((setId) => doc(db, 'users', user.uid, 'sets', setId));

    try {
      const batch = writeBatch(db);

      batch.update(userDocRef, {
        [`songs.${song.id}`]: deleteField(),
        [`songNames.${song.title}`]: deleteField(),
        [`tunesIWantToLearn.${title}`]: null,
      });

      setDocRefs.forEach((setDocRef) => {
        batch.update(setDocRef, {
          [`allSongs.${song.id}`]: deleteField(),
          [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.id),
          [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.id),
        })
      })

      await batch.commit();

      setLocalLoading(false);
      if (quickForward) {
        quickForward();
      }
    }
    catch (error) {
      handleNetworkError(error.message);
    }


  }

  return (
    <Modal handleOutsideClick={quickForward ? null : hideMoveDownAndOut} contentHeight={'31rem'} allowOverflow={true} >
      <MoveDownAndOutStyled>
        <h3>Move Out Of Library</h3>
        <p>The song '{capitalize(title)}' is already set to indicate that you don't know it very well (you can't go lower) </p>
        <p>Would you like to erase this tune from your library (and from all sets in which it can be found) and add it instead to your list of 'Tunes to Learn'?</p>
        <div>
          <AddButton onClick={handleMove} >
            Move Out and Erase From Library
            {moveOutArrow ? moveOutArrow : null}
          </AddButton>
          <AddButton onClick={hideMoveDownAndOut}>Cancel</AddButton>
        </div>
      </MoveDownAndOutStyled>
    </Modal>
  )
}

export default MoveDownAndOut;