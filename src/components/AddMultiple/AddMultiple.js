import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { db } from '../../firebaseConfig';
import useFormInput from '../../hooks/useFormInput';
import Modal from '../generics/Modal.styled';
import AddButton from '../generics/AddButton.styled';
import { AddMultipleStyled, AddMultipleButtonsStyled, TitleErrorsStyled } from './AddMultiple.styled';

function AddMultiple(props) {

  const { set, setShowAddMultiple, songNames, user, allSongs } = props;

  const [songList, handleSongListChange, resetSongList] = useFormInput('');

  const [showMain, setShowMain] = useState(true);
  const [showTitleErrors, setShowTitleErrors] = useState(false);
  const [titleErrors, setTitleErrors] = useState([]);



  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }
    resetSongList();
    setShowAddMultiple(false);
  }

  function handleAdd(e) {
    e.preventDefault();

    let allSongsArray = songList.split(/\r?\n/);

    allSongsArray = allSongsArray.map((songName) => {
      let songCharArray = songName.trim().split('');
      songCharArray = songCharArray.map((char, index) => {
        if (char === '~' || char === '*' || char === '/' || char === '[' || char === ']') {
          return '•';
        }
        return char;
      })
      return songCharArray.join('');
    })

    const allNewSongs = [];
    const allOldSongs = [];
    const notAdded = [];

    allSongsArray.forEach((songName) => {
      const titleLower = songName.toLowerCase();
      if (songName.length === 0) {

      } else if (titleLower[0] === '.' || titleLower[songName.length - 1] === '.' || titleLower.includes('..')) {
        notAdded.push(titleLower);
      } else if (songNames.hasOwnProperty(titleLower)) {
        allOldSongs.push(titleLower);
      } else {
        allNewSongs.push(titleLower);
      }
    })

    const newSongsObj = {};
    const oldSongsObj = {};

    const newSongsInSet = {};

    const songIdsForSetlists = [];

    allNewSongs.forEach((songName) => {
      const songId = uuid();
      const date = Date.now();
      newSongsObj[`songs.${songId}`] = {
        createdAt: date,
        title: songName,
        notes: '',
        songKey: 'random',
        knowledge: 'new',
        sets: {
          [set.id]: set.setName
        },
        id: songId,
      }
      newSongsObj[`songNames.${songName}`] = songId;

      newSongsInSet[`allSongs.${songId}`] = null;
      songIdsForSetlists.push(songId);
    })

    allOldSongs.forEach((songName) => {
      const songId = songNames[songName];
      const oldSongObj = allSongs[songId];
      oldSongObj["sets"][set.id] = set.setName;
      oldSongsObj[`songs.${songId}`] = oldSongObj;

      if (!set.allSongs.hasOwnProperty(songId)) {
        newSongsInSet[`allSongs.${songId}`] = null;
        songIdsForSetlists.push(songId);
      }
    })

    //update userDoc

    const userDoc = doc(db, 'users', user.uid);
    updateDoc(userDoc, {
      ...newSongsObj,
      ...oldSongsObj,
    })

    //Update Set doc

    newSongsInSet[`currentNew`] = arrayUnion(...songIdsForSetlists);
    newSongsInSet[`fullNew`] = arrayUnion(...songIdsForSetlists);

    const setDoc = doc(db, 'users', user.uid, 'sets', set.id);
    updateDoc(setDoc, {
      ...newSongsInSet,
    })

    if (notAdded.length === 0) {
      handleCancel();
    } else {
      setShowMain(false);
      setShowTitleErrors(true);
      setTitleErrors(notAdded);
    }
  }

  if (showMain) {
    return (
      <Modal handleOutsideClick={handleCancel} >
        <AddMultipleStyled>
          <legend>Add Multiple Songs to '{set.setName}'</legend>
          <p>
            Add multiple songs at once by pasting (or typing out) a list of songs into the text box below.
            Make sure you strike the return/enter key after each song. Songs will be entered into this set and default
            to the 'New' knowledge level.  Also, all will be entered such that your preference for their key will be 'random'.
            Later updates will provide the ability to
            add a list of songs to any number of sets as well as allowing you to set the knowledge level of the group yourself.
            Any songs that you list which are already to be found in your library will be imported into this set with all their
            current settings intact.
            Songs cannot use the following characters: <span>~ * / [ ]</span>
          </p>
          <textarea name="" id="" cols="30" rows="10" value={songList} onChange={handleSongListChange}></textarea>
          <AddMultipleButtonsStyled>
            <AddButton onClick={handleCancel}>Cancel</AddButton>
            <AddButton onClick={handleAdd}>Add Songs</AddButton>
          </AddMultipleButtonsStyled>
        </AddMultipleStyled>
      </Modal>
    )
  }

  if (showTitleErrors) {
    return (
      <Modal handleOutsideClick={handleCancel} >
        <TitleErrorsStyled>
          <h2>Errors Found</h2>
          <p>
            <span>Song titles may not begin or end with a '.' and they cannot contain '..' anywhere in themselves.</span>
            <span>The following songs were not added:</span>
          </p>
          <ul>
            {titleErrors.map(title => (
              <li>{title}</li>
            ))}
          </ul>
          <AddMultipleButtonsStyled>
            <AddButton onClick={handleCancel}>Got It</AddButton>
          </AddMultipleButtonsStyled>

        </TitleErrorsStyled>

      </Modal>
    )
  }

}

export default AddMultiple;