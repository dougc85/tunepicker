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

  if (!loading && !song.title) {
    getSongData(params.songTitle);
  }

  function capitalizeTitle() {
    return params.songTitle.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');
  }

  return (
    loading ?
      <Loading /> :
      <div className="Song">
        <Path heading={capitalizeTitle()} pathType={'Song'} />
        <div className="Song-fields Song-title">
          <label htmlFor="songTitle-songPage" className="Song-title-label">Title</label>
          {showTitleEdit ? <input type="text" className="Song-title-input">{song.title}</input> : <p className="Song-title-value">{song.title}</p>}
          <EditConfirm />
        </div>
      </div>
  )
}

export default Song;