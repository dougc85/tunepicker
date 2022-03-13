import './AllSongs.scss';
import { React, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import SongEntry from '../SongEntry/SongEntry';

function AllSongs(props) {

  const { user, setCurrentSong } = props;
  const [songs, setSongs] = useState({});

  useEffect(() => {
    if (!user) {
      return;
    }


    const unsubscribeSongs = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      setSongs(doc.data().songs);
    })

    return () => {
      if (unsubscribeSongs) {
        unsubscribeSongs();
      }
    }
  }, [user]);

  return (
    <div className="AllSongs">
      <div className="AllSongs-path">
        <svg className="AllSongs-path-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z" />
        </svg>
        <p className="AllSongs-path-divider">/</p>
        <svg className="AllSongs-path-icon AllSongs-path-icon-book" viewBox="0 0 24 24">
          <path fill="currentColor" d="M13 20.5C13 21.03 13.09 21.53 13.26 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V11H16.5V16.11C14.5 16.57 13 18.36 13 20.5M20 13H18.5V18.21C18.19 18.07 17.86 18 17.5 18C16.12 18 15 19.12 15 20.5S16.12 23 17.5 23 20 21.88 20 20.5V15H22V13H20Z" />
        </svg>
        <p className="AllSongs-path-heading">All Songs</p>
      </div>
      {Object.keys(songs).map((songTitle) => {
        const songObj = songs[songTitle];
        return (
          <SongEntry title={songTitle} song={songObj} sortByDateAdded={false} key={songTitle} setCurrentSong={setCurrentSong} />
        )
      })}
    </div>
  )
}

export default AllSongs;