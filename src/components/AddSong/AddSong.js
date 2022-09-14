import React, { useState, useContext, useEffect } from 'react';
import SubContext from '../../context/sub-context';
import { v4 as uuid } from 'uuid';
import {
  arrayUnion,
  doc,
  writeBatch,
} from 'firebase/firestore';
import {
  db
} from '../../firebaseConfig';
import useFormInput from '../../hooks/useFormInput';
import Modal from '../generics/Modal.styled';
import { AddSongStyled, InputGrouping, TitleInput, ErrorMessage, KnowledgeField, NotesField, SetsField, SetsCheckbox } from './AddSong.styled';
import AddButton from '../generics/AddButton.styled';
import AlreadyInLibrary from '../AlreadyInLibrary/AlreadyInLibrary';
import Loading from '../Loading/Loading';
import capitalize from '../../helperFunctions/capitalize';
import { removeDoubleSpaces } from '../../helperFunctions/removeDoubleSpaces';

function AddSong(props) {

  const {
    set,
    songNames,
    user,
    setShowAddSong,
    allSongs,
    setNames,
    quick,
    songTitleArrow,
    keyArrow,
    knowledgeArrow,
    addButtonArrow,
    quickForward,
    rememberCreatedSongName
  } = props;

  const keys = ['C', 'D\u266D', 'D', 'E\u266D', 'E', 'F', 'F\u266F', 'G', 'A\u266D', 'A', 'B\u266D', 'B'];
  const knowledgeFields = {
    know: ["fullKnow", "currentKnow"],
    med: ["fullMedium", "currentMedium"],
    new: ["fullNew", "currentNew"],
  }

  const [title, handleTitleChange, resetTitle] = useFormInput('');
  const [songKey, handleSongKeyChange, resetSongKey] = useFormInput('random');
  const [notes, handleNotesChange, resetNotes] = useFormInput('');
  const [knowledge, setKnowledge] = useState('know');
  const [disableForm, setDisableForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(true);
  const [showAlreadyInLibrary, setShowAlreadyInLibrary] = useState(false);
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
    e.preventDefault();
    resetTitle();
    resetSongKey();
    resetNotes();
    setShowAddSong(false);
  }

  async function handleAdd(e) {
    e.preventDefault();

    if (title === '') {
      setErrorMessage('Title Field Required');
      return;
    }

    const newTitle = removeDoubleSpaces(title.toLowerCase().trim());

    if (newTitle.charAt(newTitle.length - 1) === '.' || newTitle[0] === '.') {
      setDisableForm(true);
      setErrorMessage("Can't start or end with '.'");
      return;
    }

    if (newTitle.includes('..')) {
      setErrorMessage("Title Must Not Include '..'");
      return;
    }

    if (!allSongs && songNames[newTitle]) {
      setShowAddForm(false);
      setShowAlreadyInLibrary(true);
      return;
    }

    setLoading(true);

    try {
      const batch = writeBatch(db);
      const userDocRef = doc(db, 'users', user.uid);
      let setDocRef;
      const setDocRefArray = [];
      let setIDs = [];

      setArray.forEach((set) => {
        if (set[1]) {
          setIDs.push(set[2]);
        }
      })

      if (allSongs) {
        setIDs.forEach((setID) => {
          setDocRefArray.push(doc(userDocRef, 'sets', setID));
        })
      } else {
        setDocRef = doc(userDocRef, 'sets', set.id);
      }

      const date = Date.now();
      const songId = uuid();

      if (allSongs) {
        const setsObject = {};
        setIDs.forEach((setID) => {
          setsObject[setID] = null;
        })
        batch.update(userDocRef, {

          [`songs.${songId}`]: {
            title: newTitle,
            notes,
            songKey,
            knowledge,
            sets: setsObject,
            createdAt: date,
            id: songId,
          },
          [`songNames.${newTitle}`]: songId,
        });

        setDocRefArray.forEach((setDocRef) => {
          batch.update(setDocRef, {
            [`${knowledgeFields[knowledge][0]}`]: arrayUnion(songId),
            [`${knowledgeFields[knowledge][1]}`]: arrayUnion(songId),
            [`allSongs.${songId}`]: null,
          })
        })
      } else {
        batch.update(userDocRef, {

          [`songs.${songId}`]: {
            title: newTitle,
            notes,
            songKey,
            knowledge,
            sets: { [set.id]: null },
            createdAt: date,
            id: songId,
          },
          [`songNames.${newTitle}`]: songId,
        });

        batch.update(setDocRef, {
          [`${knowledgeFields[knowledge][0]}`]: arrayUnion(songId),
          [`${knowledgeFields[knowledge][1]}`]: arrayUnion(songId),
          [`allSongs.${songId}`]: null,
        })
      }

      await batch.commit();

      resetTitle();
      resetSongKey();
      resetNotes();
      setKnowledge('know');
    }
    catch (error) {
      handleNetworkError(error.message);
    }

    setLoading(false);
    setShowAddSong(false);
    if (quickForward) {
      rememberCreatedSongName(newTitle);
      quickForward();
    }
  }

  function handleTitleChangeAndDuplicates(e) {

    setErrorMessage('');

    const titleLower = removeDoubleSpaces(e.target.value.toLowerCase().trim());

    if (songNames[titleLower]) {

      if (allSongs || quick) {
        setDisableForm(true);
        handleTitleChange(e);
        setErrorMessage('Song Already In Library');
        return;
      }

      const songId = songNames[titleLower];
      if (set.allSongs.hasOwnProperty(songId)) {
        setDisableForm(true);
        handleTitleChange(e);
        setErrorMessage('Song Already In Set');
        return;
      }
    }

    setDisableForm(false);
    handleTitleChange(e);
  }

  function onRadioChange(e) {
    if (e.target.checked) {
      setKnowledge(e.target.value);
    }
  }

  function isChecked(value) {
    return value === knowledge;

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

  function disableForQuick() {
    return (quick && !addButtonArrow) ? true : false;
  }

  if (showAddForm) {
    return (
      <Modal addSong={true} handleOutsideClick={quick ? null : handleCancel} contentHeight={"50rem"} flex={allSongs ? false : true} allowOverflow={knowledgeArrow ? true : false}>
        {
          loading ?
            <Loading /> :
            (
              <AddSongStyled allSongs={allSongs}>
                <legend>{`Add Song${allSongs ? ' To Library' : ` to '${capitalize(set.setName)}'`}`}</legend>
                <InputGrouping width={"100%"}>
                  <label htmlFor="song-title">Title:</label>
                  <TitleInput onChange={handleTitleChangeAndDuplicates} value={title} id="song-title" type="text" name="song-title" autoComplete="off"></TitleInput>
                  {errorMessage && (<ErrorMessage>{`*${errorMessage}`}</ErrorMessage>)}
                  {songTitleArrow ? songTitleArrow : null}
                </InputGrouping>
                <InputGrouping width={"70%"}>
                  <label htmlFor="key" >Key:</label>
                  <select disabled={disableForm} name="key" id="key" onChange={handleSongKeyChange} value={songKey} >
                    <option value="random" key="random">random</option>
                    {keys.map((key) => {
                      return (
                        <option value={key} key={key}>{key}</option>
                      )
                    })}
                  </select>
                  {keyArrow ? keyArrow : null}
                </InputGrouping>
                <KnowledgeField disabled={disableForm}>
                  <legend>How well do you know this tune?</legend>
                  <div>
                    <input id="knowNew" value="new" type="radio" name="knowledge" onChange={onRadioChange} checked={isChecked('new')} />
                    <label htmlFor="knowNew">
                      New
                      <span>Just learned; needs practice</span>
                    </label>
                  </div>
                  <div>
                    <input id="knowMed" value="med" type="radio" name="knowledge" onChange={onRadioChange} checked={isChecked('med')} />
                    <label htmlFor="knowMed">
                      Medium
                      <span>Know alright; should play it often to remember it</span>
                    </label>
                  </div>
                  <div>
                    <input id="knowKnow" value="know" type="radio" name="knowledge" onChange={onRadioChange} checked={isChecked('know')} />
                    <label htmlFor="knowKnow">
                      Know
                      <span>Know inside and out; can play it if it gets called a month from now</span>
                    </label>
                    {knowledgeArrow ? knowledgeArrow : null}
                  </div>
                </KnowledgeField>
                <NotesField>
                  <label htmlFor="song-notes" >Notes</label>
                  <textarea disabled={disableForm} value={notes} onChange={handleNotesChange}></textarea>
                </NotesField>
                {allSongs &&
                  <SetsField>
                    <legend>Sets</legend>
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
                <InputGrouping width={"80%"}>
                  <AddButton onClick={handleCancel} disable={disableForQuick()}>Cancel</AddButton>
                  <AddButton disabled={disableForm} onClick={handleAdd} disable={disableForQuick()}>
                    Add Song
                    {addButtonArrow ? addButtonArrow : null}
                  </AddButton>
                </InputGrouping>
              </AddSongStyled>
            )
        }
      </Modal >
    )
  }

  if (showAlreadyInLibrary) {
    return (
      <AlreadyInLibrary setShowAddSong={setShowAddSong} title={title} knowledge={knowledge} knowledgeFields={knowledgeFields} set={set} />
    )
  }

}

export default AddSong;