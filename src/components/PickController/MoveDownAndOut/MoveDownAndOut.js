import React, { useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { MoveDownAndOutStyled } from "./MoveDownAndOut.styled";
import Modal from '../../generics/Modal.styled';
import AddButton from '../../generics/AddButton.styled';
import {
  updateDoc,
  doc,
  deleteField,
  arrayRemove,

} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function MoveDownAndOut(props) {

  const context = useContext(SubContext);
  const { user, userDoc } = context;
  const { setShowMoveDownAndOut, songId, title, setTune, capitalize, knowledgeArrays } = props;
  const song = userDoc.songs[songId];

  function hideMoveDownAndOut(e) {
    if (e) {
      e.preventDefault();
    }
    setShowMoveDownAndOut(false);
  }

  function handleMove(e) {

    hideMoveDownAndOut(e);
    setTune('');

    const userDocRef = doc(db, 'users', user.uid);
    const setIds = Object.keys(song.sets);
    const setDocRefs = setIds.map((setId) => doc(db, 'users', user.uid, 'sets', setId));

    try {
      updateDoc(userDocRef, {
        [`songs.${song.id}`]: deleteField(),
        [`songNames.${song.title}`]: deleteField(),
        [`tunesIWantToLearn.${title}`]: null,
      });

      setDocRefs.forEach((setDocRef) => {
        updateDoc(setDocRef, {
          [`allSongs.${song.id}`]: deleteField(),
          [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.id),
          [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.id),
        })
      })


    }
    catch (error) {
      console.log(error.message);
    }

  }

  return (
    <Modal handleOutsideClick={hideMoveDownAndOut} contentHeight={'31rem'}>
      <MoveDownAndOutStyled>
        <h3>Move Out Of Library</h3>
        <p>The song '{capitalize(title)}' is already set to indicate that you don't know it very well, the lowest setting. </p>
        <p>Would you like to erase this tune from your library (and from all sets in which it can be found) and add it instead to your list of 'Tunes to Learn'?</p>
        <div>
          <AddButton onClick={handleMove} >Move Out and Erase From Library</AddButton>
          <AddButton onClick={hideMoveDownAndOut}>Cancel</AddButton>
        </div>
      </MoveDownAndOutStyled>
    </Modal>
  )
}

export default MoveDownAndOut;