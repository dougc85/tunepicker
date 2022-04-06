import './Song.scss';
import { React, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc, updateDoc, deleteField, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import useFormInput from '../../../hooks/useFormInput';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';
import EditConfirm from './EditConfirm/EditConfirm';

function Song(props) {

  const { song, loading, getSongData, setNames, user, setCurrentSong } = props;
  const params = useParams();
  const navigate = useNavigate();

  //Hide/Show Inputs for fields
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showKeyEdit, setShowKeyEdit] = useState(false);
  const [showKnowledgeEdit, setShowKnowledgeEdit] = useState(false);
  const [showNotesEdit, setShowNotesEdit] = useState(false);
  const [showSetsEdit, setShowSetsEdit] = useState(false);
  const [disableEdit, setDisableEdit] = useState(false);

  const titleInput = useRef(null);
  const keyInput = useRef(null);
  const knowledgeInput = useRef(null);
  const notesInput = useRef(null);
  const setsInput = useRef(null);

  const [focus, setFocus] = useState(null);

  //Controlled inputs
  const [title, handleTitleChange] = useFormInput(capitalizeTitle());
  const [songKey, handleSongKeyChange, , setSongKey] = useFormInput('');
  const [knowledge, handleKnowledgeChange, , setKnowledge] = useFormInput('');
  const [notes, handleNotesChange, , setNotes] = useFormInput('');
  const [setArray, setSetArray] = useState([]);

  const knowledgeOptions = {
    know: 'Know it inside and out',
    med: 'Medium well; needs upkeep',
    new: 'Just learned; needs practice',
  };

  const knowledgeArrays = {
    know: ['currentKnow', 'fullKnow'],
    med: ['currentMedium', 'fullMedium'],
    new: ['currentNew', 'fullNew']
  }

  const bgColor =
    knowledge === 'know' ? 'hsl(145, 63%, 49%)' :
      knowledge === 'med' ? 'hsl(54, 98%, 66%)' :
        'hsl(26, 100%, 67%)';

  const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  if (!loading && !song) {
    getSongData(params.songTitle);
  }

  function capitalizeTitle() {
    return params.songTitle.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');
  }

  useEffect(() => {
    if (focus) {
      focus === 'title' ? titleInput.current.focus() :
        focus === 'key' ? keyInput.current.focus() :
          focus === 'knowledge' ? knowledgeInput.current.focus() :
            focus === 'notes' ? notesInput.current.focus() :
              focus === 'sets' ? setsInput.current.focus() : setFocus(null);
    }
  }, [focus])

  function focusInput(field) {
    setFocus(field);
  }

  useEffect(() => {
    if (song) {
      setSongKey(song.songKey);
      setKnowledge(song.knowledge);
      setNotes(song.notes);

      const setsList = Object.keys(setNames).map((setId) => {
        if (song.sets[setId]) {
          return [setNames[setId], true, setId];
        }
        return [setNames[setId], false, setId];
      }).sort();
      setSetArray(setsList)
    }

  }, [song, setNames, setKnowledge, setNotes, setSongKey])

  useEffect(() => {
    if (song) {
      if (!song.sets.hasOwnProperty(params.setId)) {
        navigate(`/library/allsongs/${song.title}`);
      }
    }
  }, [song, params.setId])

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

  async function saveTitleData() {

    const titleLower = title.toLowerCase();

    if (song.title.toLowerCase() === titleLower) {
      return;
    }

    const userDoc = doc(db, 'users', user.uid);

    const currentSong = {
      createdAt: song.createdAt,
      knowledge: song.knowledge,
      notes: song.notes,
      sets: song.sets,
      songKey: song.songKey
    }

    await updateDoc(userDoc, {
      [`songs.${song.title.toLowerCase()}`]: deleteField(),
      [`songs.${titleLower}`]: currentSong
    })
    setCurrentSong({
      ...currentSong,
      title: titleLower
    });

    navigate(`/library/allsongs/${titleLower}`);

    for (let set in song.sets) {
      const setDoc = doc(db, 'users', user.uid, 'sets', set);

      await updateDoc(setDoc, {
        allSongs: arrayRemove(song.title),
        [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.title),
        [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.title),
      });

      updateDoc(setDoc, {
        allSongs: arrayUnion(titleLower),
        [knowledgeArrays[song.knowledge][0]]: arrayUnion(titleLower),
        [knowledgeArrays[song.knowledge][1]]: arrayUnion(titleLower),
      });
    }
  }

  async function saveSongData(fieldString, inputData) {
    if (song[fieldString] === inputData) {
      return;
    }

    const userDoc = doc(db, 'users', user.uid);

    const currentSong = {
      createdAt: song.createdAt,
      knowledge: song.knowledge,
      notes: song.notes,
      sets: song.sets,
      songKey: song.songKey,
      title: song.title,
    }

    currentSong[fieldString] = inputData;

    updateDoc(userDoc, {
      [`songs.${song.title}.${fieldString}`]: inputData
    })
    setCurrentSong({
      ...currentSong
    });
  }

  async function saveKeyData() {
    saveSongData('songKey', songKey);
  }

  async function saveKnowledgeData() {
    saveSongData('knowledge', knowledge);

    if (knowledge === song.knowledge) {
      return;
    }

    for (let set in song.sets) {
      const setDoc = doc(db, 'users', user.uid, 'sets', set);

      updateDoc(setDoc, {
        [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.title),
        [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.title),
        [knowledgeArrays[knowledge][0]]: arrayUnion(song.title),
        [knowledgeArrays[knowledge][1]]: arrayUnion(song.title),
      });
    }
  }

  async function saveNotesData() {
    saveSongData('notes', notes);
  }

  async function saveSetsData() {

    //Check for no changes
    if (setArray.every((setItem) => {
      if (setItem[1] && song.sets.hasOwnProperty(setItem[2])) {
        return true;
      } else if (!setItem[1] && !song.sets.hasOwnProperty(setItem[2])) {
        return true;
      } else {
        return false;
      }
    })) {
      return;
    }

    let newSetsObject = {};

    for (let setItem of setArray) {
      if (setItem[1]) {
        newSetsObject[setItem[2]] = setItem[0];
      }
    }

    saveSongData('sets', newSetsObject);

    for (let setItem of setArray) {
      let setName = setItem[0];
      let songInSet = setItem[1];
      let setId = setItem[2];

      if (songInSet && song.sets.hasOwnProperty(setId)) {
        continue;
      } else if (songInSet && !song.sets.hasOwnProperty(setId)) {
        //add the song to that set in the database
        let setDoc = doc(db, 'users', user.uid, 'sets', setId);

        updateDoc(setDoc, {
          allSongs: arrayUnion(song.title),
          [knowledgeArrays[song.knowledge][0]]: arrayUnion(song.title),
          [knowledgeArrays[song.knowledge][1]]: arrayUnion(song.title),
        })
      } else if (!songInSet && !song.sets.hasOwnProperty(setId)) {
        continue;
      } else {
        //delete the song from that set in the database
        let setDoc = doc(db, 'users', user.uid, 'sets', setId);

        updateDoc(setDoc, {
          allSongs: arrayRemove(song.title),
          [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.title),
          [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.title),
        });
      }
    }
  }

  return (
    (loading || !song) ?
      <Loading /> :
      <div className="Song">
        <Path heading={capitalizeTitle()} pathType={'Song'} />
        <div className="Song-fields">
          <div className="Song-field Song-title">
            <label htmlFor="songTitle-songPage" className="Song-title-label Song-label">Title</label>
            <div className="Song-title-entry Song-entry">
              <input style={{ display: (showTitleEdit ? 'block' : 'none') }} id="songTitle-songPage" ref={titleInput} onChange={handleTitleChange} type="text" className="Song-title-entry-input Song-input" value={title}></input>
              <p style={{ display: (showTitleEdit ? 'none' : 'block') }} className="Song-value Song-title-entry-value">{capitalizeTitle()}</p>
            </div>
            <EditConfirm field="title" show={setShowTitleEdit} focusInput={focusInput} disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveTitleData} />
          </div>
          <div className="Song-field Song-key">
            <label htmlFor="songKey-songPage" className="Song-key-label Song-label">Key</label>
            <div className="Song-key-entry Song-entry">
              <select style={{ display: (showKeyEdit ? 'block' : 'none') }} id="songKey-songPage" ref={keyInput} onChange={handleSongKeyChange} value={songKey} className="Song-key-entry-input Song-input">
                <option value="random" key="random">random</option>
                {keys.map((key) => {
                  let keyModified = key;
                  if (key.length === 2) {
                    key[1] === "#" ? keyModified = key[0] + `\u266F` :
                      keyModified = key[0] + `\u266D`;
                  }
                  return (
                    <option value={key} key={key}>{keyModified}</option>
                  )
                })}
              </select>
              <p style={{ display: (showKeyEdit ? 'none' : 'block') }} className="Song-value Song-key-entry-value">{song.songKey}</p>
            </div>
            <EditConfirm show={setShowKeyEdit} focusInput={focusInput} field="key" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveKeyData} />
          </div>
          <div className="Song-field Song-knowledge">
            <label htmlFor="songKnowledge-songPage" className="Song-knowledge-label Song-label">How Well Do I Know This Tune?</label>
            <div className="Song-knowledge-entry Song-entry">
              <select style={{ display: (showKnowledgeEdit ? 'block' : 'none') }} id="songKnowledge-songPage" ref={knowledgeInput} onChange={handleKnowledgeChange} value={knowledge} className="Song-knowledge-entry-input Song-input">
                {Object.keys(knowledgeOptions).map((key) => {
                  let knowledgeChoice = knowledgeOptions[key];
                  return (
                    <option value={key} key={knowledgeChoice}>{knowledgeChoice}</option>
                  )
                })}
              </select>
              <div style={{ display: (showKnowledgeEdit ? 'none' : 'flex') }} className="Song-value Song-knowledge-entry-value">
                <p>{knowledgeOptions[song.knowledge]}</p>
                <div style={{ backgroundColor: bgColor }} className="Song-knowledge-entry-value-color"></div>
              </div>

            </div>
            <EditConfirm show={setShowKnowledgeEdit} focusInput={focusInput} field="knowledge" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveKnowledgeData} />
          </div>
          <div className="Song-field Song-notes">
            <label htmlFor="songNotes-songPage" className="Song-notes-label Song-label">Notes</label>
            <div className="Song-notes-entry Song-entry">
              <textarea style={{ display: (showNotesEdit ? 'block' : 'none') }} id="songNotes-songPage" ref={notesInput} className="Song-notes-entry-input Song-input" value={notes} onChange={handleNotesChange} ></textarea>
              <p style={{ display: (showNotesEdit ? 'none' : 'block') }} className="Song-value Song-notes-entry-value">{song.notes || 'none'}</p>
            </div>
            <EditConfirm show={setShowNotesEdit} focusInput={focusInput} field="notes" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveNotesData} />
          </div>
          <div className="Song-field Song-sets">
            <fieldset className="Song-sets-label Song-label">Sets</fieldset>
            <div className="Song-sets-entry Song-entry">
              <ul className="Song-sets-entry-checkboxes" style={{ display: (showSetsEdit ? 'block' : 'none') }}>
                {setArray.map((set, idx) => {
                  return (
                    <li className="Song-sets-entry-checkbox" key={`${set[2]}`}>
                      <label htmlFor={`${set[2]}`} className="Song-sets-entry-checkbox-label">{set[0]}</label>
                      <input id={`${set[2]}`} value={set[0]} checked={set[1]} onChange={handleCheckboxChange} type="checkbox" className="Song-sets-entry-checkbox-box Song-input" ref={idx === 0 ? setsInput : undefined}></input>
                    </li>
                  )
                })}
              </ul>
              <ul className="Song-value Song-sets-entry-value" style={{ display: (showSetsEdit ? 'none' : 'block') }}>
                {song.sets && Object.keys(song.sets).map((setId) => (
                  <li className="Song-sets-entry-value-set" key={setId}>{song.sets[setId]}</li>
                ))}
              </ul>
            </div>
            <EditConfirm show={setShowSetsEdit} focusInput={focusInput} field="sets" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveSetsData} />
          </div>
          <button className="Song-delete">Delete Song</button>
        </div>

      </div>
  )
}

export default Song;