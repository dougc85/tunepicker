import './AllSongs.scss';
import { React, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import SongEntry from '../SongEntry/SongEntry';
import Path from '../Path/Path';

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
      <Path heading="All Songs" pathType="All Songs" />
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