import React, { useContext } from 'react';
import SubContext from '../../../context/sub-context';
import SongEntry from '../SongEntry/SongEntry';
import Path from '../Path/Path';
import { AllSongsStyled } from './AllSongs.styled';
import Loading from '../../Loading/Loading';

function AllSongs(props) {

  const context = useContext(SubContext);
  const { userDoc, loading } = context;
  const allSongs = (userDoc) ? userDoc.songs : undefined;

  const { setCurrentSong } = props;


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

  if (loading) {
    return (
      <Loading />
    )
  }

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