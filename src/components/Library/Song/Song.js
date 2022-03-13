import './Song.scss';
import { React } from 'react';

function Song(props) {

  // If song prop is empty, have to make a call to the database!!!

  const { song } = props;

  const titleCapitalized = song.title.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');

  return (
    <div className="Song">
      <div className="Song-path">
        <svg className="Song-path-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z" />
        </svg>
        <p className="Song-path-divider">/</p>
        <svg className="Song-path-icon Song-path-icon-book" viewBox="0 0 24 24">
          <path fill="currentColor" d="M13 20.5C13 21.03 13.09 21.53 13.26 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V11H16.5V16.11C14.5 16.57 13 18.36 13 20.5M20 13H18.5V18.21C18.19 18.07 17.86 18 17.5 18C16.12 18 15 19.12 15 20.5S16.12 23 17.5 23 20 21.88 20 20.5V15H22V13H20Z" />
        </svg>
        <p className="Song-path-divider">/</p>
        <svg className="Song-path-icon Song-path-icon-music" viewBox="0 0 24 24">
          <path fill="currentColor" d="M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z" />
        </svg>
        <p className="Song-path-heading">{titleCapitalized}</p>
      </div>
    </div>
  )
}

export default Song;