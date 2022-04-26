import { React } from 'react';
import SongEntry from '../SongEntry/SongEntry';
import Path from '../Path/Path';
import { AllSongsStyled } from './AllSongs.styled';

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

    <AllSongsStyled>
      <Path heading="All Songs" pathType="All Songs" />
      {Object.keys(allSongs).map((songId) => {
        const songObj = allSongs[songId];
        return (
          <SongEntry title={songObj.title} song={songObj} sortByDateAdded={false} key={songId} setCurrentSong={setCurrentSong} />
        )
      })}
    </AllSongsStyled>
  )
}

export default AllSongs;