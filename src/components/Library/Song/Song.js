import './Song.scss';
import { React } from 'react';
import Path from '../Path/Path';

function Song(props) {

  // If song prop is empty, have to make a call to the database!!!

  const { song } = props;

  const titleCapitalized = song.title.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');

  return (
    <div className="Song">
      <Path heading={titleCapitalized} pathType={'Song'} />
    </div>
  )
}

export default Song;