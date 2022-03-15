import './Song.scss';
import { React, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useFormInput from '../../../hooks/useFormInput';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';
import EditConfirm from './EditConfirm/EditConfirm';

function Song(props) {

  const { song, loading, getSongData } = props;
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
  const setsInput = useRef(null);

  const [focus, setFocus] = useState(null);

  const [title, handleTitleChange] = useFormInput(capitalizeTitle());
  const [songKey, handleSongKeyChange, , setSongKey] = useFormInput(song.key);
  const [knowledge, handleKnowledgeChange, , setKnowledge] = useFormInput(song.knowledge);
  const [notes, handleNotesChange, , setNotes] = useFormInput(song.notes);

  const knowledgeOptions = {
    know: 'Know it inside and out',
    med: 'Medium well; needs upkeep',
    new: 'Just learned; needs practice',
  };

  if (!loading && !song.title) {
    getSongData(params.songTitle);
  }

  function capitalizeTitle() {
    return params.songTitle.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');
  }

  useEffect(() => {
    if (focus) {
      focus === 'title' ? titleInput.current.focus() : setFocus(null);
    }
  }, [focus])

  function focusInput(field) {
    setFocus(field);
  }

  useEffect(() => {
    setSongKey(song.songKey);
    setKnowledge(song.knowledge);
    setNotes(song.notes);
  }, [song])

  return (
    loading ?
      <Loading /> :
      <div className="Song">
        <Path heading={capitalizeTitle()} pathType={'Song'} />
        <div className="Song-fields Song-title">
          <label htmlFor="songTitle-songPage" className="Song-title-label Song-label">Title</label>
          <div className="Song-title-entry Song-entry">
            <input style={{ display: (showTitleEdit ? 'block' : 'none') }} id="songTitle-songPage" ref={titleInput} onChange={handleTitleChange} type="text" className="Song-title-entry-input Song-input" value={title}></input>
            <p style={{ display: (showTitleEdit ? 'none' : 'block') }} className="Song-value Song-title-entry-value">{capitalizeTitle()}</p>
          </div>
          <EditConfirm field="title" show={setShowTitleEdit} focusInput={focusInput} />
        </div>
        <div className="Song-fields Song-key">
          <label htmlFor="songKey-songPage" className="Song-key-label Song-label">Key</label>
          <div className="Song-key-entry Song-entry">
            {showKeyEdit ? <input id="songKey-songPage" ref={keyInput} type="text" value={songKey} onChange={handleSongKeyChange} className="Song-key-entry-input Song-input"></input> : <p className="Song-value Song-key-entry-value">{song.songKey}</p>}
          </div>
          <EditConfirm show={setShowKeyEdit} />
        </div>
        <div className="Song-fields Song-knowledge">
          <label htmlFor="songKnowledge-songPage" className="Song-knowledge-label Song-label">How Well Do I Know This Tune?</label>
          <div className="Song-knowledge-entry Song-entry">
            {showKnowledgeEdit ? <input id="songKnowledge-songPage" ref={knowledgeInput} type="text" className="Song-knowledge-entry-input Song-input" value={knowledge} onChange={handleKnowledgeChange}></input> : <p className="Song-value Song-knowledge-entry-value">{knowledgeOptions[song.knowledge]}</p>}
          </div>
          <EditConfirm show={setShowKnowledgeEdit} />
        </div>
        <div className="Song-fields Song-notes">
          <label htmlFor="songNotes-songPage" className="Song-notes-label Song-label">Notes</label>
          <div className="Song-notes-entry Song-entry">
            {showNotesEdit ? <input id="songNotes-songPage" ref={notesInput} type="text" className="Song-notes-entry-input Song-input" value={notes} onChange={handleNotesChange} ></input> : <p className="Song-value Song-notes-entry-value">{song.notes || 'none'}</p>}
          </div>
          <EditConfirm show={setShowNotesEdit} />
        </div>
        <div className="Song-fields Song-sets">
          <label htmlFor="songSets-songPage" className="Song-sets-label Song-label">Sets</label>
          <div className="Song-sets-entry Song-entry">
            {showSetsEdit ? <input id="songSets-songPage" ref={setsInput} type="text" className="Song-sets-entry-input Song-input">{song.notes}</input> :
              <ul className="Song-value Song-sets-entry-value">
                {song.sets && song.sets.map((set) => (
                  <li className="Song-sets-entry-value-set" key="set">{set}</li>
                ))}
              </ul>}
          </div>
          <EditConfirm show={setShowSetsEdit} />
        </div>
        <button className="Song-delete">Delete Song</button>
      </div>
  )
}

export default Song;