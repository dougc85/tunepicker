import './Song.scss';
import { React } from 'react';
import { useParams } from 'react-router-dom';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';

function Song(props) {

  const { song, loading, getSongData } = props;
  const params = useParams();

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
      </div>
  )
}

export default Song;