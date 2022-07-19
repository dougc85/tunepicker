import { React, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  arrayUnion,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  db
} from '../../firebaseConfig';
import useFormInput from '../../hooks/useFormInput';
import Modal from '../generics/Modal.styled';
import { AddSongStyled, InputGrouping, TitleInput, ErrorMessage, KnowledgeField } from './AddSong.styled';
import AddButton from '../generics/AddButton.styled';
import AlreadyInLibrary from '../AlreadyInLibrary/AlreadyInLibrary';
import Loading from '../Loading/Loading';

function AddSong(props) {

  const { set, songNames, user, setShowAddSong } = props;

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

    const newTitle = title.toLowerCase().trim();

    if (newTitle.charAt(newTitle.length - 1) === '.' || newTitle[0] === '.') {
      setDisableForm(true);
      setErrorMessage("Can't start or end with '.'");
      return;
    }

    if (newTitle.includes('..')) {
      setErrorMessage("Title Must Not Include '..'");
      return;
    }

    if (songNames[newTitle]) {
      setShowAddForm(false);
      setShowAlreadyInLibrary(true);

      return;
    }

    setLoading(true);

    try {
      const userDoc = doc(db, 'users', user.uid);
      const setDoc = doc(userDoc, 'sets', set.id);
      const date = Date.now();

      const songId = uuid();

      const userDocPromise = updateDoc(userDoc, {

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
      const setDocPromise = updateDoc(setDoc, {
        [`${knowledgeFields[knowledge][0]}`]: arrayUnion(songId),
        [`${knowledgeFields[knowledge][1]}`]: arrayUnion(songId),
        [`allSongs.${songId}`]: null,
      })

      const firebasePromises = [userDocPromise, setDocPromise];
      await Promise.all(firebasePromises);

      resetTitle();
      resetSongKey();
      resetNotes();
      setKnowledge('know');
    }
    catch (error) {
      console.log(error);
    }

    setLoading(false);
    setShowAddSong(false);
  }

  function handleTitleChangeAndDuplicates(e) {

    setErrorMessage('');

    const titleLower = e.target.value.toLowerCase();

    if (songNames[titleLower]) {
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

  if (showAddForm) {
    return (
      <Modal handleOutsideClick={handleCancel} >
        {
          loading ?
            <Loading /> :
            (
              <AddSongStyled>
                <legend>Add Song to '{set.setName}'</legend>
                <InputGrouping width={"100%"}>
                  <label htmlFor="song-title">Title:</label>
                  <TitleInput onChange={handleTitleChangeAndDuplicates} value={title} id="song-title" type="text" name="song-title" autoComplete="off"></TitleInput>
                  {errorMessage && (<ErrorMessage>{`*${errorMessage}`}</ErrorMessage>)}
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
                  </div>
                </KnowledgeField>
                <label htmlFor="song-notes" >Notes</label>
                <textarea disabled={disableForm} value={notes} onChange={handleNotesChange}></textarea>
                <InputGrouping width={"80%"}>
                  <AddButton onClick={handleCancel} >Cancel</AddButton>
                  <AddButton disabled={disableForm} onClick={handleAdd}>Add Song</AddButton>
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