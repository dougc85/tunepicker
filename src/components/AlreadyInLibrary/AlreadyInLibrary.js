import React, { useContext, useState } from 'react';
import AddButton from '../generics/AddButton.styled';
import Modal from '../generics/Modal.styled';
import { db } from '../../firebaseConfig';
import { doc, writeBatch, arrayUnion } from 'firebase/firestore';
import SubContext from '../../context/sub-context';
import { AlreadyInLibraryStyled } from './AlreadyInLibrary.styled';
import capitalize from '../../helperFunctions/capitalize';
import Loading from '../Loading/Loading';


function AlreadyInLibrary(props) {

  const { title, set, setShowAddSong, knowledgeFields, knowledge } = props;
  const { setName, id: setId } = set;

  const { user, userDoc, handleNetworkError } = useContext(SubContext);
  const { songNames } = userDoc;
  const [loading, setLoading] = useState(false);

  function handleCancel(e) {
    e.preventDefault();

    setShowAddSong(false);
  }

  async function addToSet(e) {
    try {
      setLoading(true);
      const songId = songNames[title];

      const batch = writeBatch(db);
      const userDocRef = doc(db, 'users', user.uid);
      const setDocRef = doc(db, 'users', user.uid, 'sets', setId);

      batch.update(userDocRef, {
        [`songs.${songId}.sets.${setId}`]: null,
      })

      batch.update(setDocRef, {
        [`allSongs.${songId}`]: null,
        [knowledgeFields[knowledge][0]]: arrayUnion(songId),
        [knowledgeFields[knowledge][1]]: arrayUnion(songId),
      })

      await batch.commit();
    }
    catch (error) {
      handleNetworkError(error.message);
    }

    setLoading(false);
    handleCancel(e);
  }

  return (
    <Modal handleOutsideClick={handleCancel} contentHeight={'18rem'}>
      {
        loading ?
          <Loading /> :
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
      }
    </Modal>
  )
}

export default AlreadyInLibrary;