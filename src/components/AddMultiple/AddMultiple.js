import { doc, updateDoc, writeBatch, arrayUnion } from 'firebase/firestore';
import React, { useState, useContext, useEffect } from 'react';
import SubContext from '../../context/sub-context';
import { v4 as uuid } from 'uuid';
import { db } from '../../firebaseConfig';
import useFormInput from '../../hooks/useFormInput';
import Modal from '../generics/Modal.styled';
import AddButton from '../generics/AddButton.styled';
import { AddMultipleStyled, AddMultipleButtonsStyled, TitleErrorsStyled, SetsField, SetsCheckbox } from './AddMultiple.styled';
import Loading from '../Loading/Loading';
import capitalize from '../../helperFunctions/capitalize';

function AddMultiple(props) {

  const { set, setShowAddMultiple, songNames, user, allSongs, calling, setNames, quick, quickForward, songsEntryArrow, addMultipleButtonArrow } = props;

  const [songList, handleSongListChange, resetSongList] = useFormInput('');

  const [showMain, setShowMain] = useState(true);
  const [showTitleErrors, setShowTitleErrors] = useState(false);
  const [titleErrors, setTitleErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setArray, setSetArray] = useState([]);

  const { handleNetworkError } = useContext(SubContext);

  useEffect(() => {
    if (setNames) {
      const setsList = Object.keys(setNames).map((setId) => {
        return [setNames[setId], false, setId];
      }).sort();
      setSetArray(setsList)
    }
  }, [setNames])


  function handleCancel(e) {
    if (e) {
      e.preventDefault();
    }
    resetSongList();
    setShowAddMultiple(false);
  }

  async function handleAdd(e) {
    e.preventDefault();

    setLoading(true);

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

    let songSet = new Set();
    allSongsArray.forEach((songTitle) => {
      songSet.add(songTitle.toLowerCase());
    })

    const allNewSongs = [];
    const allOldSongs = [];
    const notAdded = [];

    songSet.forEach((songName) => {
      if (songName.length === 0) {

      } else if (songName[0] === '.' || songName[songName.length - 1] === '.' || songName.includes('..')) {
        notAdded.push(songName);
      } else if (songNames.hasOwnProperty(songName)) {
        allOldSongs.push(songName);
      } else {
        allNewSongs.push(songName);
      }
    })

    if (calling === 'set' || calling === 'allSongs') {
      const newSongsObj = {};
      const oldSongsObj = {};

      const newSongsInSet = {};

      const newSongIdsForSetlists = [];
      const oldSongIdsForSetlists = [];

      let setsObject = {};

      if (calling === 'set') {
        setsObject[set.id] = null
      }
      else if (calling === 'allSongs') {
        setArray.forEach((set) => {
          if (set[1]) {
            setsObject[set[2]] = null;
          }
        })
      }

      allNewSongs.forEach((songName) => {
        const songId = uuid();
        const date = Date.now();
        newSongsObj[`songs.${songId}`] = {
          createdAt: date,
          title: songName,
          notes: '',
          songKey: 'random',
          knowledge: 'know',
          sets: setsObject,
          id: songId,
        }
        newSongsObj[`songNames.${songName}`] = songId;

        newSongsInSet[`allSongs.${songId}`] = null;
        newSongIdsForSetlists.push(songId);
      })

      if (calling === 'set') {
        allOldSongs.forEach((songName) => {
          const songId = songNames[songName];
          const oldSongObj = allSongs[songId];
          oldSongObj["sets"][set.id] = null;
          oldSongsObj[`songs.${songId}`] = oldSongObj;

          if (!set.allSongs.hasOwnProperty(songId)) {
            newSongsInSet[`allSongs.${songId}`] = null;
            oldSongIdsForSetlists.push(songId);
          }
        })
      }

      //update userDoc

      const userDocRef = doc(db, 'users', user.uid);
      try {
        const batch = writeBatch(db);

        batch.update(userDocRef, {
          ...newSongsObj,
          ...oldSongsObj,
        })

        //Update Set doc

        let knowSongs = [];
        let medSongs = [];
        let newSongs = [];

        oldSongIdsForSetlists.forEach(songId => {
          if (allSongs[songId].knowledge === 'know') {
            knowSongs.push(songId);
          } else if (allSongs[songId].knowledge === 'med') {
            medSongs.push(songId);
          } else {
            newSongs.push(songId);
          }
        });

        newSongsInSet[`currentKnow`] = arrayUnion(...newSongIdsForSetlists, ...knowSongs);
        newSongsInSet[`fullKnow`] = arrayUnion(...newSongIdsForSetlists, ...knowSongs);
        newSongsInSet[`currentMedium`] = arrayUnion(...medSongs);
        newSongsInSet[`fullMedium`] = arrayUnion(...medSongs);
        newSongsInSet[`currentNew`] = arrayUnion(...newSongs);
        newSongsInSet[`fullNew`] = arrayUnion(...newSongs);

        const setDocRefs = []

        if (calling === 'set') {
          setDocRefs.push(doc(db, 'users', user.uid, 'sets', set.id));
        } else if (calling === 'allSongs') {
          setArray.forEach((set) => {
            if (set[1]) {
              setDocRefs.push(doc(db, 'users', user.uid, 'sets', set[2]));
            }
          })
        }

        setDocRefs.forEach((setDocRef) => {
          batch.update(setDocRef, {
            ...newSongsInSet,
          })
        })

        await batch.commit();

      } catch (error) {
        handleNetworkError(error.message);
      }

    } else if (calling === 'tunesIWantToLearn') {

      const newSongsObj = {};

      allNewSongs.forEach(songName => {
        newSongsObj[`tunesIWantToLearn.${songName}`] = null;
      })

      const userDocRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userDocRef, {
          ...newSongsObj,
        })
      } catch (error) {
        handleNetworkError(error.message);
      }

    }

    setLoading(false);

    if (notAdded.length === 0) {
      handleCancel();
    } else {
      setShowTitleErrors(true);
      setShowMain(false);
      setTitleErrors(notAdded);
    }

    if (quickForward) {
      quickForward();
    }
  }

  function handleCheckboxChange(e) {
    setSetArray((oldSets) => {
      return oldSets.map((set) => {
        if (set[0] === e.target.value) {
          return [set[0], !set[1], set[2]];
        }
        return set;
      })
    })
  }

  const configObj =
    (calling === 'set') ?
      {
        heading: `Add Multiple Songs to '${capitalize(set.setName)}'`,
        instructions: (
          <>
            <p>
              Add multiple songs at once by entering a list of songs into the text box below
            </p>
            <ul>
              <li>
                Strike the return/enter key after each song.
              </li>
              <li>
                Any songs that you list which are already to be found in your library will be imported into this set with all their current settings intact
              </li>
              <li>
                Songs cannot use the following characters: <span>~ * / [ ]</span>
              </li>
            </ul>
          </>
        )

      } :
      {
        heading: "Add Multiple Songs",
        instructions: (
          <>
            <p>
              Add multiple songs at once by pasting (or typing out) a list of songs into the text box below
            </p>
            <ul>
              <li>
                Make sure you strike the return/enter key after each song
              </li>
              <li>
                Songs cannot use the following characters: <span>~ * / [ ]</span>
              </li>
            </ul>
          </>
        )
      }

  if (showMain) {
    return (
      <Modal handleOutsideClick={quick ? null : handleCancel} allowOverflow={songsEntryArrow ? true : false}>
        {
          loading ?
            <Loading /> :
            (<AddMultipleStyled allSongs={(calling === 'allSongs') ? true : false}>
              <legend>{configObj.heading}</legend>
              {configObj.instructions}
              <textarea name="" id="" cols="27" rows="5" value={songList} onChange={handleSongListChange} disabled={quick === 17 ? true : false}></textarea>
              {(calling === 'allSongs') &&
                <SetsField>
                  <legend>Add Songs To Which Sets?</legend>
                  <ul>
                    {setArray.map((set, idx) => {
                      return (
                        <SetsCheckbox key={`${set[2]}`}>
                          <input id={`${set[2]}`} value={set[0]} checked={set[1]} onChange={handleCheckboxChange} type="checkbox"></input>
                          <label htmlFor={`${set[2]}`} >{capitalize(set[0])}</label>
                        </SetsCheckbox>
                      )
                    })}
                  </ul>
                </SetsField>
              }
              <AddMultipleButtonsStyled allSongs={(calling === 'allSongs') ? true : false}>
                {songsEntryArrow ? songsEntryArrow : null}
                <AddButton onClick={handleCancel} disable={(quick === 16 || quick === 17) ? true : false}>Cancel</AddButton>
                <AddButton onClick={handleAdd} disable={(quick === 16) ? true : false}>
                  Add Songs
                  {addMultipleButtonArrow ? addMultipleButtonArrow : null}
                </AddButton>
              </AddMultipleButtonsStyled>
            </AddMultipleStyled>)
        }
      </Modal>
    )
  }

  if (showTitleErrors) {
    return (
      <Modal handleOutsideClick={handleCancel} contentHeight={"40rem"}>
        <TitleErrorsStyled>
          <h2>Errors Found</h2>
          <p>
            <span>Song titles may not begin or end with a '.' and they cannot contain '..' anywhere in themselves.</span>
            <span>The following songs were not added:</span>
          </p>
          <ul>
            {titleErrors.map(title => (
              <li key={title}>{title}</li>
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