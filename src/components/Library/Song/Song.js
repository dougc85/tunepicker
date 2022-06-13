import React, { useState, useContext, useEffect, useRef } from 'react';
import SubContext from '../../../context/sub-context';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  doc, updateDoc, deleteField, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import useFormInput from '../../../hooks/useFormInput';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';
import EditConfirm from './EditConfirm/EditConfirm';
import DeleteSong from './DeleteSong/DeleteSong';
import {
  SongStyled,
  SongEntryStyled,
  TitleEntryStyled,
  TitleError,
  KeyEntryStyled,
  KnowledgeLabel,
  KnowledgeEntryStyled,
  NotesLabel,
  NotesEntryStyled,
  SetsLabel,
  SetsEntryStyled,
  SetsCheckbox,
} from './Song.styled';
import AddButton from '../../generics/AddButton.styled';

function Song(props) {

  // async function getSongData(id) {
  //   const userFirebase = await getDoc(doc(db, 'users', user.uid));
  //   const userData = userFirebase.data();
  // }

  const context = useContext(SubContext);
  const { loading, userDoc, user } = context;
  const { setNames, songs: allSongs } = userDoc;

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const song = (allSongs) ? allSongs[params.songId] : undefined;

  //Hide/Show Inputs for fields
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showKeyEdit, setShowKeyEdit] = useState(false);
  const [showKnowledgeEdit, setShowKnowledgeEdit] = useState(false);
  const [showNotesEdit, setShowNotesEdit] = useState(false);
  const [showSetsEdit, setShowSetsEdit] = useState(false);
  const [disableEdit, setDisableEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteSong, setShowDeleteSong] = useState(false);

  const titleInput = useRef(null);
  const keyInput = useRef(null);
  const knowledgeInput = useRef(null);
  const notesInput = useRef(null);
  const setsInput = useRef(null);

  const [focus, setFocus] = useState(null);

  //Controlled inputs
  const [title, handleTitleChange, , setTitle] = useFormInput('');
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

  // if (!loading && !song) {
  //   getSongData(params.songId);
  // }

  function capitalize(str) {
    return str.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');
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
      setTitle(capitalize(song.title));

      const setsList = Object.keys(setNames).map((setId) => {
        if (song.sets[setId]) {
          return [setNames[setId], true, setId];
        }
        return [setNames[setId], false, setId];
      }).sort();
      setSetArray(setsList)
    }

  }, [song, setNames, setKnowledge, setNotes, setSongKey, setTitle])

  useEffect(() => {
    if (song) {
      if (!song.sets.hasOwnProperty(params.setId) && location.pathname.slice(9, 17) !== 'allsongs') {
        navigate(`/library/allsongs/${song.id}`);
      }
    }
  }, [song, params.setId, navigate, location.pathname])

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
      id: song.id,
    }

    currentSong[fieldString] = inputData;

    if (fieldString === 'title') {
      updateDoc(userDoc, {
        [`songs.${song.id}.${fieldString}`]: inputData,
        [`songNames.${song.title}`]: deleteField(),
        [`songNames.${inputData}`]: song.id,
      })
    } else {
      updateDoc(userDoc, {
        [`songs.${song.id}.${fieldString}`]: inputData
      })
    }
  }

  async function saveTitleData() {

    const titleLower = title.toLowerCase().trim();

    if (title === '') {
      setErrorMessage('Title Field Required');
      return true;
    }

    if (titleLower.charAt(titleLower.length - 1) === '.' || titleLower[0] === '.') {
      setErrorMessage("Can't start or end with '.'");
      return true;
    }

    if (title.includes('..')) {
      setErrorMessage("Title Must Not Include '..'");
      return true;
    }

    saveSongData('title', titleLower);
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
        [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.id),
        [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.id),
        [knowledgeArrays[knowledge][0]]: arrayUnion(song.id),
        [knowledgeArrays[knowledge][1]]: arrayUnion(song.id),
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

    for (let setItem of setArray) {
      let songInSet = setItem[1];
      let setId = setItem[2];

      if (songInSet && song.sets.hasOwnProperty(setId)) {
        continue;
      } else if (songInSet && !song.sets.hasOwnProperty(setId)) {
        //add the song to that set in the database
        let setDoc = doc(db, 'users', user.uid, 'sets', setId);

        updateDoc(setDoc, {
          [`allSongs.${song.id}`]: null,
          [knowledgeArrays[song.knowledge][0]]: arrayUnion(song.id),
          [knowledgeArrays[song.knowledge][1]]: arrayUnion(song.id),
        })
      } else if (!songInSet && !song.sets.hasOwnProperty(setId)) {
        continue;
      } else {
        //delete the song from that set in the database
        let setDoc = doc(db, 'users', user.uid, 'sets', setId);

        updateDoc(setDoc, {
          [`allSongs.${song.id}`]: deleteField(),
          [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.id),
          [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.id),
        });
      }
    }

    saveSongData('sets', newSetsObject);
  }

  function handleTitleChangeAndError(e) {
    setErrorMessage('');
    handleTitleChange(e);
  }

  if (loading || !song) {
    return (
      <Loading />
    )
  }

  function handleDeleteButton() {
    setShowDeleteSong(true);
  }

  return (
    <>
      <Path heading={capitalize(allSongs[params.songId].title)} pathType={'Song'} />
      <SongStyled >
        <div>
          <label htmlFor="songTitle-songPage">Title</label>
          <TitleEntryStyled>
            <input autoComplete="off" style={{ display: (showTitleEdit ? 'block' : 'none') }} id="songTitle-songPage" ref={titleInput} onChange={handleTitleChangeAndError} type="text" value={title}></input>
            {errorMessage && <TitleError>{errorMessage}</TitleError>}
            <p style={{ display: (showTitleEdit ? 'none' : 'block') }}>{capitalize(allSongs[params.songId].title)}</p>
          </TitleEntryStyled>
          <EditConfirm field="title" show={setShowTitleEdit} focusInput={focusInput} disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveTitleData} />
        </div>
        <div>
          <label htmlFor="songKey-songPage">Key</label>
          <KeyEntryStyled>
            <select style={{ display: (showKeyEdit ? 'block' : 'none') }} id="songKey-songPage" ref={keyInput} onChange={handleSongKeyChange} value={songKey}>
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
            <p style={{ display: (showKeyEdit ? 'none' : 'block') }}>{song.songKey}</p>
          </KeyEntryStyled>
          <EditConfirm show={setShowKeyEdit} focusInput={focusInput} field="key" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveKeyData} />
        </div>
        <div>
          <KnowledgeLabel htmlFor="songKnowledge-songPage"><span>How Well Do I Know This Tune?</span></KnowledgeLabel>
          <KnowledgeEntryStyled>
            <select style={{ display: (showKnowledgeEdit ? 'block' : 'none') }} id="songKnowledge-songPage" ref={knowledgeInput} onChange={handleKnowledgeChange} value={knowledge}>
              {Object.keys(knowledgeOptions).map((key) => {
                let knowledgeChoice = knowledgeOptions[key];
                return (
                  <option value={key} key={knowledgeChoice}>{knowledgeChoice}</option>
                )
              })}
            </select>
            <div style={{ display: (showKnowledgeEdit ? 'none' : 'flex') }}>
              <p>{knowledgeOptions[song.knowledge]}</p>
              <div style={{ backgroundColor: bgColor }}></div>
            </div>

          </KnowledgeEntryStyled>
          <EditConfirm show={setShowKnowledgeEdit} focusInput={focusInput} field="knowledge" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveKnowledgeData} />
        </div>
        <div>
          <NotesLabel htmlFor="songNotes-songPage">Notes</NotesLabel>
          <NotesEntryStyled>
            <textarea style={{ display: (showNotesEdit ? 'block' : 'none') }} id="songNotes-songPage" ref={notesInput} value={notes} onChange={handleNotesChange} ></textarea>
            <p style={{ display: (showNotesEdit ? 'none' : 'block') }}>{song.notes || 'none'}</p>
          </NotesEntryStyled>
          <EditConfirm show={setShowNotesEdit} focusInput={focusInput} field="notes" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveNotesData} />
        </div>
        <div>
          <SetsLabel>Sets</SetsLabel>
          <SetsEntryStyled>
            <ul style={{ display: (showSetsEdit ? 'block' : 'none') }}>
              {setArray.map((set, idx) => {
                return (
                  <SetsCheckbox key={`${set[2]}`}>
                    <label htmlFor={`${set[2]}`} >{set[0]}</label>
                    <input id={`${set[2]}`} value={set[0]} checked={set[1]} onChange={handleCheckboxChange} type="checkbox" ref={idx === 0 ? setsInput : undefined}></input>
                  </SetsCheckbox>
                )
              })}
            </ul>
            <ul style={{ display: (showSetsEdit ? 'none' : 'block') }}>
              {song.sets && Object.keys(song.sets).map((setId) => (
                <li key={setId}>{song.sets[setId]}</li>
              ))}
            </ul>
          </SetsEntryStyled>
          <EditConfirm show={setShowSetsEdit} focusInput={focusInput} field="sets" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveSetsData} />
        </div>
        <button onClick={handleDeleteButton}>Delete Song</button>
      </SongStyled>
      {showDeleteSong && <DeleteSong song={song} knowledgeArrays={knowledgeArrays} setShowDeleteSong={setShowDeleteSong} />}
    </>
  )
}

export default Song;