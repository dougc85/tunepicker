import React, { useState, useContext, useEffect, useRef } from 'react';
import SubContext from '../../../context/sub-context';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  doc, updateDoc, deleteField, arrayUnion, arrayRemove, writeBatch
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import useFormInput from '../../../hooks/useFormInput';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';
import EditConfirm from './EditConfirm/EditConfirm';
import DeleteSong from './DeleteSong/DeleteSong';
import {
  SongStyled,
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
import LoadingContainer from './LoadingContainer/LoadingContainer';
import capitalize from '../../../helperFunctions/capitalize';

function Song(props) {

  // async function getSongData(id) {
  //   const userFirebase = await getDoc(doc(db, 'users', user.uid));
  //   const userData = userFirebase.data();
  // }

  const context = useContext(SubContext);
  const { loading, userDoc, user } = context;
  const { setNames, songs: allSongs, songNames } = userDoc;

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
  const [titleLoading, setTitleLoading] = useState(false);
  const [keyLoading, setKeyLoading] = useState(false);
  const [knowledgeLoading, setKnowledgeLoading] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const [setsLoading, setSetsLoading] = useState(false);

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

  const keys = ['C', 'D\u266D', 'D', 'E\u266D', 'E', 'F', 'F\u266F', 'G', 'A\u266D', 'A', 'B\u266D', 'B'];

  // if (!loading && !song) {
  //   getSongData(params.songId);
  // }

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
        if (song.sets.hasOwnProperty(setId)) {
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

  async function saveSongData(fieldString, inputData, batch) {

    if (song[fieldString] === inputData) {
      return;
    }

    console.log(batch, 'batch');

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

    try {
      if (fieldString === 'title') {
        await updateDoc(userDoc, {
          [`songs.${song.id}.${fieldString}`]: inputData,
          [`songNames.${song.title}`]: deleteField(),
          [`songNames.${inputData}`]: song.id,
        })
      } else {
        if (batch) {
          batch.update(userDoc, {
            [`songs.${song.id}.${fieldString}`]: inputData
          })
        } else {
          await updateDoc(userDoc, {
            [`songs.${song.id}.${fieldString}`]: inputData
          })
        }
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  async function saveTitleData() {

    const newTitle = title.toLowerCase().trim();

    if (newTitle === '') {
      setErrorMessage('Title Field Required');
      return true;
    }

    if (newTitle.charAt(newTitle.length - 1) === '.' || newTitle[0] === '.') {
      setErrorMessage("Can't start or end with '.'");
      return true;
    }

    if (newTitle.includes('..')) {
      setErrorMessage("Title Must Not Include '..'");
      return true;
    }

    if (song.title !== newTitle && songNames[newTitle]) {
      setErrorMessage("Title already in use");
      return true;
    }

    setTitleLoading(true);
    saveSongData('title', newTitle);
    setTitleLoading(false);
  }

  async function saveKeyData() {
    setKeyLoading(true);
    saveSongData('songKey', songKey);
    setKeyLoading(false);
  }

  async function saveKnowledgeData() {

    if (knowledge === song.knowledge) {
      return;
    }

    setKnowledgeLoading(true);

    const batch = writeBatch(db);

    for (let set in song.sets) {
      const setDoc = doc(db, 'users', user.uid, 'sets', set);

      try {
        batch.update(setDoc, {
          [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.id),
          [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.id),
          [knowledgeArrays[knowledge][0]]: arrayUnion(song.id),
          [knowledgeArrays[knowledge][1]]: arrayUnion(song.id),
        });
      } catch (error) {
        console.log(error.message);
      }

      saveSongData('knowledge', knowledge, batch);
      await batch.commit();
      setKnowledgeLoading(false);
    }
  }

  async function saveNotesData() {
    setNotesLoading(true);
    saveSongData('notes', notes);
    setNotesLoading(false);
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
        newSetsObject[setItem[2]] = null;
      }
    }

    setSetsLoading(true);
    const batch = writeBatch(db);

    try {
      for (let setItem of setArray) {
        let songInSet = setItem[1];
        let setId = setItem[2];

        if (songInSet && song.sets.hasOwnProperty(setId)) {
          continue;
        } else if (songInSet && !song.sets.hasOwnProperty(setId)) {
          //add the song to that set in the database
          let setDoc = doc(db, 'users', user.uid, 'sets', setId);

          batch.update(setDoc, {
            [`allSongs.${song.id}`]: null,
            [knowledgeArrays[song.knowledge][0]]: arrayUnion(song.id),
            [knowledgeArrays[song.knowledge][1]]: arrayUnion(song.id),
          })
        } else if (!songInSet && !song.sets.hasOwnProperty(setId)) {
          continue;
        } else {
          //delete the song from that set in the database
          let setDoc = doc(db, 'users', user.uid, 'sets', setId);

          batch.update(setDoc, {
            [`allSongs.${song.id}`]: deleteField(),
            [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.id),
            [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.id),
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }

    saveSongData('sets', newSetsObject, batch);
    await batch.commit();
    setSetsLoading(false);
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
          <div>
            <label htmlFor="songTitle-songPage">Title</label>
            {titleLoading && <LoadingContainer />}
          </div>
          <TitleEntryStyled>
            <input autoComplete="off" style={{ display: (showTitleEdit ? 'block' : 'none') }} id="songTitle-songPage" ref={titleInput} onChange={handleTitleChangeAndError} type="text" value={title}></input>
            {errorMessage && <TitleError>{errorMessage}</TitleError>}
            <p style={{ display: (showTitleEdit ? 'none' : 'block') }}>{capitalize(allSongs[params.songId].title)}</p>
          </TitleEntryStyled>
          <EditConfirm field="title" show={setShowTitleEdit} focusInput={focusInput} disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveTitleData} />
        </div>
        <div>
          <div>
            <label htmlFor="songKey-songPage">Key</label>
            {keyLoading && <LoadingContainer />}
          </div>
          <KeyEntryStyled>
            <select style={{ display: (showKeyEdit ? 'block' : 'none') }} id="songKey-songPage" ref={keyInput} onChange={handleSongKeyChange} value={songKey}>
              <option value="random" key="random">random</option>
              {keys.map((key) => {
                return (
                  <option value={key} key={key}>{key}</option>
                )
              })}
            </select>
            <p style={{ display: (showKeyEdit ? 'none' : 'block') }}>{song.songKey}</p>
          </KeyEntryStyled>
          <EditConfirm show={setShowKeyEdit} focusInput={focusInput} field="key" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveKeyData} />
        </div>
        <div>
          <div>
            <KnowledgeLabel htmlFor="songKnowledge-songPage"><span>How Well Do I Know This Tune?</span></KnowledgeLabel>
            {knowledgeLoading && <LoadingContainer knowledge />}
          </div>
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
          <div>
            <NotesLabel htmlFor="songNotes-songPage">Notes</NotesLabel>
            {notesLoading && <LoadingContainer />}
          </div>
          <NotesEntryStyled>
            <textarea style={{ display: (showNotesEdit ? 'block' : 'none') }} id="songNotes-songPage" ref={notesInput} value={notes} onChange={handleNotesChange} ></textarea>
            <p style={{ display: (showNotesEdit ? 'none' : 'block') }}>{song.notes || 'none'}</p>
          </NotesEntryStyled>
          <EditConfirm show={setShowNotesEdit} focusInput={focusInput} field="notes" disableEdit={disableEdit} setDisableEdit={setDisableEdit} saveData={saveNotesData} />
        </div>
        <div>
          <div>
            <SetsLabel>Sets</SetsLabel>
            {setsLoading && <LoadingContainer sets />}
          </div>
          <SetsEntryStyled>
            <ul style={{ display: (showSetsEdit ? 'block' : 'none') }}>
              {setArray.map((set, idx) => {
                return (
                  <SetsCheckbox key={`${set[2]}`}>
                    <input id={`${set[2]}`} value={set[0]} checked={set[1]} onChange={handleCheckboxChange} type="checkbox" ref={idx === 0 ? setsInput : undefined}></input>
                    <label htmlFor={`${set[2]}`} >{capitalize(set[0])}</label>
                  </SetsCheckbox>
                )
              })}
            </ul>
            <ul style={{ display: (showSetsEdit ? 'none' : 'block') }}>
              {song.sets && Object.keys(song.sets).map((setId) => (
                <li key={setId}>{capitalize(setNames[setId])}</li>
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