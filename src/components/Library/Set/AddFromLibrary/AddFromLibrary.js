import React, { useState } from 'react';
import { AddFromLibraryStyled, ButtonContainer, EntryGrouping } from './AddFromLibrary.styled';
import Modal from '../../../generics/Modal.styled'
import capitalize from '../../../../helperFunctions/capitalize';
import AddButton from '../../../generics/AddButton.styled';
import LibraryEntry from './LibraryEntry/LibraryEntry';
import Loading from '../../../Loading/Loading';

import { doc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';

function AddFromLibrary(props) {

  const { setShowAddFromLibrary, set, user, userDoc } = props;
  const { setNames, songNames } = userDoc;

  const [setsToAdd, setSetsToAdd] = useState({});
  const [songsToAdd, setSongsToAdd] = useState({});
  const [loading, setLoading] = useState(false);

  function hideAddFromLibrary(e) {
    if (e) {
      e.preventDefault();
    }
    setShowAddFromLibrary(false);
  }

  const newSongArray = Object.keys(songNames).sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true });
  })

  async function handleAdd() {

    setLoading(true);

    const combinedSongs = new Set();
    const firebasePromises = [];

    try {
      Object.keys(setsToAdd).forEach((setId => {
        const setDocRef = doc(db, 'users', user.uid, 'sets', setId);

        firebasePromises.push(getDoc(setDocRef));
      }));

      const firebaseDocs = await Promise.all(firebasePromises);

      firebaseDocs.forEach((firebaseDoc) => {
        const setData = firebaseDoc.data();
        Object.keys(setData.allSongs).forEach((songId) => {
          combinedSongs.add(songId);
        })
      })

      for (const songId in songsToAdd) {
        combinedSongs.add(songId);
      }

      const setToAdd = {};
      const setInfo = {};
      const forKnowledgeArrays = [];

      combinedSongs.forEach((songId) => {
        if (!set.allSongs.hasOwnProperty(songId)) {
          setToAdd[`allSongs.${songId}`] = null;
          forKnowledgeArrays.push(songId);
          setInfo[`songs.${songId}.sets.${set.id}`] = null;
        }
      })

      setToAdd[`fullKnow`] = arrayUnion(...forKnowledgeArrays);
      setToAdd['currentKnow'] = arrayUnion(...forKnowledgeArrays);

      const setDocRef = doc(db, 'users', user.uid, 'sets', set.id);
      await updateDoc(setDocRef, {
        ...setToAdd
      });

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        ...setInfo
      });

    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
    setShowAddFromLibrary(false);
  }

  return (
    <Modal handleOutsideClick={hideAddFromLibrary}>
      {
        loading ?
          <Loading /> :
          <AddFromLibraryStyled>
            <h3>Add Songs From Your Library</h3>
            <p>
              Select, from the lists below, songs that you would like to add to '{`${capitalize(set.setName)}`}'.
              <span>
                If you select a set, all songs from that set will be added to '{`${capitalize(set.setName)}`}'.
              </span>
              <span>
                Click 'Submit' when you are finished.
              </span>
            </p>
            <ButtonContainer>
              <AddButton onClick={hideAddFromLibrary}>Cancel</AddButton>
              <AddButton onClick={handleAdd}>Submit</AddButton>
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
                    <LibraryEntry entryType='set' entryId={setId} entryTitle={capitalize(setNames[setId])} key={setId} librarySetter={setSetsToAdd} />
                  )
                })}
              </ul>
            </EntryGrouping>
            <EntryGrouping>
              <h4>All Songs</h4>
              <ul>
                {newSongArray.map((songName) => {
                  return (
                    <LibraryEntry entryType='song' entryId={songNames[songName]} entryTitle={capitalize(songName)} key={songNames[songName]} librarySetter={setSongsToAdd} />
                  )
                })}
              </ul>
            </EntryGrouping>
          </AddFromLibraryStyled>
      }
    </Modal>

  )
}

export default AddFromLibrary;