import React, { useState, useContext } from 'react';
import SubContext from '../../../../context/sub-context';
import { AddFromLibraryStyled, ButtonContainer, EntryGrouping } from './AddFromLibrary.styled';
import Modal from '../../../generics/Modal.styled'
import capitalize from '../../../../helperFunctions/capitalize';
import AddButton from '../../../generics/AddButton.styled';
import LibraryEntry from './LibraryEntry/LibraryEntry';
import Loading from '../../../Loading/Loading';

import { doc, arrayUnion, runTransaction } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';

function AddFromLibrary(props) {

  const { setShowAddFromLibrary, set, user, userDoc } = props;
  const { setNames, songNames } = userDoc;

  const [setsToAdd, setSetsToAdd] = useState({});
  const [songsToAdd, setSongsToAdd] = useState({});
  const [loading, setLoading] = useState(false);

  const { handleNetworkError } = useContext(SubContext);

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
      await runTransaction(db, async (transaction) => {
        Object.keys(setsToAdd).forEach((setId => {
          const setDocRef = doc(db, 'users', user.uid, 'sets', setId);

          firebasePromises.push(transaction.get(setDocRef));
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
        const knowledgeArrays = {};

        knowledgeArrays.new = [];
        knowledgeArrays.med = [];
        knowledgeArrays.know = [];

        combinedSongs.forEach((songId) => {
          if (!set.allSongs.hasOwnProperty(songId)) {
            setToAdd[`allSongs.${songId}`] = null;
            knowledgeArrays[userDoc.songs[songId].knowledge].push(songId);
            setInfo[`songs.${songId}.sets.${set.id}`] = null;

            console.log(userDoc.songs[songId], 'songInfo');
          }
        })

        setToAdd[`fullKnow`] = arrayUnion(...knowledgeArrays.know);
        setToAdd['currentKnow'] = arrayUnion(...knowledgeArrays.know);

        setToAdd[`fullMedium`] = arrayUnion(...knowledgeArrays.med);
        setToAdd['currentMedium'] = arrayUnion(...knowledgeArrays.med);

        setToAdd[`fullNew`] = arrayUnion(...knowledgeArrays.new);
        setToAdd['currentNew'] = arrayUnion(...knowledgeArrays.new);

        console.log(setToAdd, 'setToAdd');
        const setDocRef = doc(db, 'users', user.uid, 'sets', set.id);
        transaction.update(setDocRef, {
          ...setToAdd
        });

        const userDocRef = doc(db, 'users', user.uid);
        transaction.update(userDocRef, {
          ...setInfo
        });
      })
    } catch (error) {
      handleNetworkError(error.message);
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