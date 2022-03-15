import './Song.scss';
import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  console.log(song.sets);

  return (
    loading ?
      <Loading /> :
      <div className="Song">
        <Path heading={capitalizeTitle()} pathType={'Song'} />
        <div className="Song-fields Song-title">
          <label htmlFor="songTitle-songPage" className="Song-title-label Song-label">Title</label>
          {showTitleEdit ? <input id="songTitle-songPage" type="text" className="Song-title-input">{capitalizeTitle()}</input> : <p className="Song-value Song-title-value">{capitalizeTitle()}</p>}
          <EditConfirm />
        </div>
        <div className="Song-fields Song-key">
          <label htmlFor="songKey-songPage" className="Song-key-label Song-label">Key</label>
          {showKeyEdit ? <input id="songKey-songPage" type="text" className="Song-key-input">{song.songKey}</input> : <p className="Song-value Song-key-value">{song.songKey}</p>}
          <EditConfirm />
        </div>
        <div className="Song-fields Song-knowledge">
          <label htmlFor="songKnowledge-songPage" className="Song-knowledge-label Song-label">How Well Do I Know This Tune?</label>
          {showKnowledgeEdit ? <input id="songKnowledge-songPage" type="text" className="Song-knowledge-input">{knowledgeOptions[song.knowledge]}</input> : <p className="Song-value Song-knowledge-value">{knowledgeOptions[song.knowledge]}</p>}
          <EditConfirm />
        </div>
        <div className="Song-fields Song-notes">
          <label htmlFor="songNotes-songPage" className="Song-notes-label Song-label">Notes</label>
          {showNotesEdit ? <input id="songNotes-songPage" type="text" className="Song-notes-input">{song.notes}</input> : <p className="Song-value Song-notes-value">{song.notes || 'none'}</p>}
          <EditConfirm />
        </div>
        <div className="Song-fields Song-sets">
          <label htmlFor="songSets-songPage" className="Song-sets-label Song-label">Sets</label>
          {showSetsEdit ? <input id="songSets-songPage" type="text" className="Song-sets-input">{song.notes}</input> :
            <ul className="Song-value Song-sets-value">
              {song.sets.map((set) => (
                <li className="Song-sets-value-set" key="set">{set}</li>
              ))}
            </ul>}
          <EditConfirm />
        </div>
        <button className="Song-delete">Delete Song</button>
      </div>
  )
}

export default Song;