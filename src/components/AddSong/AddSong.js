import './AddSong.scss';
import { React, useState } from 'react';
import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  db
} from '../../firebaseConfig';
import useFormInput from '../../hooks/useFormInput';

function AddSong(props) {

  const { set, user, setShowAdd, setShowAlreadyInLibrary, setSongConsidered } = props;

  const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
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


  function handleOutsideClick() {
    setShowAdd(false);
  }

  function handleCancel(e) {
    e.preventDefault();
    resetTitle();
    resetSongKey();
    resetNotes();
    setShowAdd(false);
  }

  async function handleAdd(e) {
    e.preventDefault();
    try {
      const userDoc = doc(db, 'users', user.uid);
      const setDoc = doc(userDoc, 'sets', set.id);
      const date = Date.now();
      const titleLower = title.toLowerCase();

      const userFirebase = await getDoc(userDoc);
      const userDocData = userFirebase.data();
      if (userDocData.songs[titleLower]) {
        setShowAdd(false);
        resetTitle();
        resetSongKey();
        resetNotes();
        setKnowledge('know');
        setShowAlreadyInLibrary(true);
        setSongConsidered(titleLower);

        //Return here???!?
      }

      updateDoc(userDoc, {

        [`songs.${titleLower}`]: {
          notes,
          songKey,
          knowledge,
          sets: { [set.id]: set.setName },
          createdAt: date,
        }
      });
      updateDoc(setDoc, {
        [knowledgeFields[knowledge][0]]: arrayUnion(titleLower),
        [knowledgeFields[knowledge][1]]: arrayUnion(titleLower),
        allSongs: arrayUnion(titleLower),
      })
      resetTitle();
      resetSongKey();
      resetNotes();
      setKnowledge('know');
      setShowAdd(false);
    }
    catch (error) {
      console.log(error);
    }



  }

  function handleTitleChangeAndDuplicates(e) {
    if (set.allSongs[e.target.value.toLowerCase()]) {
      setDisableForm(true);
    } else {
      setDisableForm(false);
    }
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

  return (
    <div className="AddSong">
      <div onClick={handleCancel} className="AddSong-screen">
      </div>
      <form className="AddSong-form">
        <legend className="AddSong-form-heading">Add Song to '{set.setName}'</legend>
        <div className="AddSong-form-title">
          <label className="AddSong-form-title-label" htmlFor="song-title">Title:</label>
          <input className="AddSong-form-title-input" onChange={handleTitleChangeAndDuplicates} value={title} id="song-title" type="text" name="song-title" autoComplete="off"></input>
        </div>
        <div className="AddSong-form-key">
          <label htmlFor="key" className="AddSong-form-key-label">Key:</label>
          <select disabled={disableForm} name="key" id="key" onChange={handleSongKeyChange} value={songKey} className="AddSong-form-key-input">
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
        </div>
        <fieldset className="AddSong-form-knowledge" disabled={disableForm}>
          <legend>How well do you know this tune?</legend>
          <div className="AddSong-form-knowledge-grouping">
            <input id="knowNew" value="new" type="radio" className="AddSong-form-knowledge-checkbox" name="knowledge" onChange={onRadioChange} checked={isChecked('new')} />
            <label htmlFor="knowNew" className="AddSong-form-knowledge-label">
              New
              <span>Just learned; needs practice</span>
            </label>
          </div>
          <div className="AddSong-form-knowledge-grouping">
            <input id="knowMed" value="med" type="radio" className="AddSong-form-knowledge-checkbox" name="knowledge" onChange={onRadioChange} checked={isChecked('med')} />
            <label htmlFor="knowMed" className="AddSong-form-knowledge-label">
              Medium
              <span>Know alright; should play it often to remember it</span>
            </label>
          </div>
          <div className="AddSong-form-knowledge-grouping">
            <input id="knowKnow" value="know" type="radio" className="AddSong-form-knowledge-checkbox" name="knowledge" onChange={onRadioChange} checked={isChecked('know')} />
            <label htmlFor="knowKnow" className="AddSong-form-knowledge-label">
              Know
              <span>Know inside and out; can play it if it gets called a month from now</span>
            </label>
          </div>
        </fieldset>

        <label htmlFor="song-notes" className="AddSong-form-notes-label">Notes</label>
        <textarea disabled={disableForm} className="AddSong-form-notes-input" value={notes} onChange={handleNotesChange}></textarea>
        <div className="AddSong-form-buttons">
          <button onClick={handleCancel} className="AddSong-form-cancel">Cancel</button>
          <button disabled={disableForm} onClick={handleAdd} className="AddSong-form-add">Add Song</button>
        </div>
      </form>
    </div>
  )
}

export default AddSong;