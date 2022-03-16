import './Song.scss';
import { React, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useFormInput from '../../../hooks/useFormInput';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';
import EditConfirm from './EditConfirm/EditConfirm';

function Song(props) {

  const { song, loading, getSongData, sets } = props;
  const params = useParams();
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showKeyEdit, setShowKeyEdit] = useState(false);
  const [showKnowledgeEdit, setShowKnowledgeEdit] = useState(false);
  const [showNotesEdit, setShowNotesEdit] = useState(false);
  const [showSetsEdit, setShowSetsEdit] = useState(false);

  const titleInput = useRef(null);
  const keyInput = useRef(null);
  const knowledgeInput = useRef(null);
  const notesInput = useRef(null);

  const [focus, setFocus] = useState(null);

  const [title, handleTitleChange] = useFormInput(capitalizeTitle());
  const [songKey, handleSongKeyChange, , setSongKey] = useFormInput(song.key);
  const [knowledge, handleKnowledgeChange, , setKnowledge] = useFormInput(song.knowledge);
  const [notes, handleNotesChange, , setNotes] = useFormInput(song.notes);
  const [setArray, setSetArray] = useState([]);

  const knowledgeOptions = {
    know: 'Know it inside and out',
    med: 'Medium well; needs upkeep',
    new: 'Just learned; needs practice',
  };

  const bgColor =
    knowledge === 'know' ? 'hsl(145, 63%, 49%)' :
      knowledge === 'med' ? 'hsl(54, 98%, 66%)' :
        'hsl(26, 100%, 67%)';

  const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  if (!loading && !song.title) {
    getSongData(params.songTitle);
  }

  function capitalizeTitle() {
    return params.songTitle.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');
  }

  useEffect(() => {
    console.log(songKey);
  }, [songKey])

  useEffect(() => {
    if (focus) {
      focus === 'title' ? titleInput.current.focus() :
        focus === 'key' ? keyInput.current.focus() :
          focus === 'knowledge' ? knowledgeInput.current.focus() :
            focus === 'notes' ? notesInput.current.focus() : setFocus(null);
    }
  }, [focus])

  function focusInput(field) {
    setFocus(field);
  }

  useEffect(() => {
    setSongKey(song.songKey);
    setKnowledge(song.knowledge);
    setNotes(song.notes);
    if (sets) {
      setSetArray(Object.keys(sets).map((setName) => {
        for (let songSet of song.sets) {
          if (songSet === setName) {
            return [setName, true];
          }
        }
        return [setName, false];
      }))
    }
  }, [song])

  function handleCheckboxChange(e) {
    setSetArray((oldSets) => {
      return oldSets.map((set) => {
        if (set[0] === e.target.value) {
          return [set[0], !set[1]];
        }
        return set;
      })
    })
  }

  return (
    loading ?
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
            <EditConfirm field="title" show={setShowTitleEdit} focusInput={focusInput} />
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
            <EditConfirm show={setShowKeyEdit} focusInput={focusInput} field="key" />
          </div>
          <div className="Song-field Song-knowledge">
            <label htmlFor="songKnowledge-songPage" className="Song-knowledge-label Song-label">How Well Do I Know This Tune?</label>
            <div className="Song-knowledge-entry Song-entry">
              <select style={{ display: (showKnowledgeEdit ? 'block' : 'none') }} id="songKnowledge-songPage" ref={knowledgeInput} onChange={handleKnowledgeChange} value={knowledge} className="Song-knowledge-entry-input Song-input">
                {Object.keys(knowledgeOptions).map((key) => {
                  let knowledgeChoice = knowledgeOptions[key];
                  return (
                    <option key={knowledgeChoice}>{knowledgeChoice}</option>
                  )
                })}
              </select>
              <div style={{ display: (showKnowledgeEdit ? 'none' : 'flex') }} className="Song-value Song-knowledge-entry-value">
                <p>{knowledgeOptions[song.knowledge]}</p>
                <div style={{ backgroundColor: bgColor }} className="Song-knowledge-entry-value-color"></div>
              </div>

            </div>
            <EditConfirm show={setShowKnowledgeEdit} focusInput={focusInput} field="knowledge" />
          </div>
          <div className="Song-field Song-notes">
            <label htmlFor="songNotes-songPage" className="Song-notes-label Song-label">Notes</label>
            <div className="Song-notes-entry Song-entry">
              <textarea style={{ display: (showNotesEdit ? 'block' : 'none') }} id="songNotes-songPage" ref={notesInput} className="Song-notes-entry-input Song-input" value={notes} onChange={handleNotesChange} ></textarea>
              <p style={{ display: (showNotesEdit ? 'none' : 'block') }} className="Song-value Song-notes-entry-value">{song.notes || 'none'}</p>
            </div>
            <EditConfirm show={setShowNotesEdit} focusInput={focusInput} field="notes" />
          </div>
          <div className="Song-field Song-sets">
            <fieldset className="Song-sets-label Song-label">Sets</fieldset>
            <div className="Song-sets-entry Song-entry">
              {setArray.map((set, idx) => {
                console.log(set);
                return (
                  <div className="Song-sets-entry-checkbox">
                    <label htmlFor={`${set[0] + idx}`} className="Song-sets-entry-checkbox-label">{set[0]}</label>
                    <input id={`${set[0] + idx}`} value={set[0]} checked={set[1]} onChange={handleCheckboxChange} type="checkbox" className="Song-sets-entry-checkbox-box Song-input"></input>
                  </div>
                )
              })}
              <ul className="Song-value Song-sets-entry-value">
                {song.sets && song.sets.map((set) => (
                  <li className="Song-sets-entry-value-set" key="set">{set}</li>
                ))}
              </ul>
            </div>
            <EditConfirm show={setShowSetsEdit} />
          </div>
          <button className="Song-delete">Delete Song</button>
        </div>

      </div>
  )
}

export default Song;