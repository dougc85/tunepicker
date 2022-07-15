import React, { useContext } from 'react';
import AddButton from '../generics/AddButton.styled';
import Modal from '../generics/Modal.styled';
import { db } from '../../firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import SubContext from '../../context/sub-context';
import { AlreadyInLibraryStyled } from './AlreadyInLibrary.styled';
import capitalize from '../../helperFunctions/capitalize';


function AlreadyInLibrary(props) {

  const { title, set, setShowAddSong, knowledgeFields, knowledge } = props;
  const { setName, id: setId } = set;

  const { user, userDoc } = useContext(SubContext);
  const { songNames } = userDoc;

  function handleCancel(e) {
    e.preventDefault();

    setShowAddSong(false);
  }

  function addToSet(e) {
    try {
      const songId = songNames[title];

      const userDocRef = doc(db, 'users', user.uid);
      const setDocRef = doc(db, 'users', user.uid, 'sets', setId);
      updateDoc(userDocRef, {
        [`songs.${songId}.sets.${setId}`]: null,
      })

      updateDoc(setDocRef, {
        [`allSongs.${songId}`]: null,
        [knowledgeFields[knowledge][0]]: arrayUnion(songId),
        [knowledgeFields[knowledge][1]]: arrayUnion(songId),
      })
    }
    catch (error) {
      console.log(error.message);
    }

    handleCancel(e);
  }

  return (
    <Modal handleOutsideClick={handleCancel} contentHeight={'18rem'}>
      <AlreadyInLibraryStyled>
        <h3>Already In Library</h3>
        <p>
          {`The song '${capitalize(title.toLowerCase())}' is already in your library.`}
          {` Would you like to add it to the set '${capitalize(setName)}'?`}
        </p>
        <div>
          <AddButton onClick={handleCancel}>Cancel</AddButton>
          <AddButton onClick={addToSet}>Add From Library</AddButton>
        </div>
      </AlreadyInLibraryStyled>

    </Modal>
  )
}

export default AlreadyInLibrary;