import './AllSongs.scss';
import { React } from 'react';
import SongEntry from '../SongEntry/SongEntry';
import Path from '../Path/Path';

function AllSongs(props) {

  const { setCurrentSong, allSongs } = props;


  //vvvvvv  Unnecessary????  vvvvvv
  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   }

  //   const unsubscribeSongs = onSnapshot(doc(db, 'users', user.uid), (doc) => {
  //     setSongs(doc.data().songs);
  //   })

  //   return () => {
  //     if (unsubscribeSongs) {
  //       unsubscribeSongs();
  //     }
  //   }
  // }, [user]);

  return (
    <div className="AllSongs">
      <Path heading="All Songs" pathType="All Songs" />
      {Object.keys(allSongs).map((songId) => {
        const songObj = allSongs[songId];
        return (
          <SongEntry title={songObj.title} song={songObj} sortByDateAdded={false} key={songId} setCurrentSong={setCurrentSong} />
        )
      })}
    </div>
  )
}

export default AllSongs;