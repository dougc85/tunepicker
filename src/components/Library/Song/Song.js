import './Song.scss';
import { React, useState, useEffect } from 'react';
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
          {showTitleEdit ? <input id="songTitle-songPage" onChange={handleTitleChange} type="text" className="Song-title-input" value={title}></input> : <p className="Song-value Song-title-value">{capitalizeTitle()}</p>}
          <EditConfirm show={setShowTitleEdit} />
        </div>
        <div className="Song-fields Song-key">
          <label htmlFor="songKey-songPage" className="Song-key-label Song-label">Key</label>
          {showKeyEdit ? <input id="songKey-songPage" type="text" value={songKey} onChange={handleSongKeyChange} className="Song-key-input"></input> : <p className="Song-value Song-key-value">{song.songKey}</p>}
          <EditConfirm show={setShowKeyEdit} />
        </div>
        <div className="Song-fields Song-knowledge">
          <label htmlFor="songKnowledge-songPage" className="Song-knowledge-label Song-label">How Well Do I Know This Tune?</label>
          {showKnowledgeEdit ? <input id="songKnowledge-songPage" type="text" className="Song-knowledge-input" value={knowledge} onChange={handleKnowledgeChange}></input> : <p className="Song-value Song-knowledge-value">{knowledgeOptions[song.knowledge]}</p>}
          <EditConfirm show={setShowKnowledgeEdit} />
        </div>
        <div className="Song-fields Song-notes">
          <label htmlFor="songNotes-songPage" className="Song-notes-label Song-label">Notes</label>
          {showNotesEdit ? <input id="songNotes-songPage" type="text" className="Song-notes-input" value={notes} onChange={handleNotesChange} ></input> : <p className="Song-value Song-notes-value">{song.notes || 'none'}</p>}
          <EditConfirm show={setShowNotesEdit} />
        </div>
        <div className="Song-fields Song-sets">
          <label htmlFor="songSets-songPage" className="Song-sets-label Song-label">Sets</label>
          {showSetsEdit ? <input id="songSets-songPage" type="text" className="Song-sets-input">{song.notes}</input> :
            <ul className="Song-value Song-sets-value">
              {song.sets && song.sets.map((set) => (
                <li className="Song-sets-value-set" key="set">{set}</li>
              ))}
            </ul>}
          <EditConfirm show={setShowSetsEdit} />
        </div>
        <button className="Song-delete">Delete Song</button>
      </div>
  )
}

export default Song;