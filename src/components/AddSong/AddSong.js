import './AddSong.scss';
import { React, useState, useEffect } from 'react';
import useFormInput from '../../hooks/useFormInput';

function AddSong(props) {

  const { set, setShowAdd } = props;
  const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  const [title, handleTitleChange, resetTitle] = useFormInput('');
  const [songKey, handleSongKeyChange, resetSongKey] = useFormInput('random');
  const [knowledge, setKnowledge] = useState('know');

  function handleOutsideClick() {
    setShowAdd(false);
  }

  function handleCancel(e) {
    e.preventDefault();
    resetTitle();
    setShowAdd(false);
  }

  function handleAdd(e) {
    e.preventDefault();
  }

  function onRadioChange(e) {
    if (e.target.checked) {
      setKnowledge(e.target.value);
    }
  }

  function isChecked(value) {
    return value === knowledge;

  }

  useEffect(() => {
    console.log(knowledge);
  }, [knowledge]);

  return (
    <div className="AddSong">
      <div onClick={handleOutsideClick} className="AddSong-screen">
      </div>
      <form className="AddSong-form">
        <legend className="AddSong-form-heading">Add Song to '{set.setName}'</legend>
        <div className="AddSong-form-title">
          <label className="AddSong-form-title-label" htmlFor="song-title">Title:</label>
          <input className="AddSong-form-title-input" onChange={handleTitleChange} value={title} id="song-title" type="text" name="song-title" autoComplete="off"></input>
        </div>
        <div className="AddSong-form-key">
          <label htmlFor="key" className="AddSong-form-key-label">Key:</label>
          <select name="key" id="key" onChange={handleSongKeyChange} value={songKey} className="AddSong-form-key-input">
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
        <fieldset className="AddSong-form-knowledge">
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
        <textarea className="AddSong-form-notes-input"></textarea>
        <div className="AddSong-form-buttons">
          <button onClick={handleCancel} className="AddSong-form-cancel">Cancel</button>
          <button onClick={handleAdd} className="AddSong-form-add">Add Song</button>
        </div>
      </form>
    </div>


  )
}

export default AddSong;