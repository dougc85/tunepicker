import React, { useContext } from 'react';
import AddButton from '../generics/AddButton.styled';
import Modal from '../generics/Modal.styled';
import { db } from '../../firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import SubContext from '../../context/sub-context';


function AlreadyInLibrary(props) {

  const { title, set, setShowAddSong, knowledgeFields, knowledge } = props;
  const { setName, id: setId } = set;

  const { user, userDoc } = useContext(SubContext);
  const { songNames, songs } = userDoc;

  function capitalize(str) {
    return str.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');
  }

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
        [`songs.${songId}.sets.${setId}`]: setName,
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
    <Modal handleOutsideClick={handleCancel}>
      {`${capitalize(title.toLowerCase())} is already in your library!!!`}
      {`Would you like to add it to ${setName}???!`}
      <AddButton onClick={handleCancel}>Cancel</AddButton>
      <AddButton onClick={addToSet}>Add From Library</AddButton>
    </Modal>
  )
}

export default AlreadyInLibrary;