import React, { useContext } from 'react';
import SubContext from '../../../context/sub-context';
import SongEntry from '../SongEntry/SongEntry';
import Path from '../Path/Path';
import { AllSongsStyled } from './AllSongs.styled';
import Loading from '../../Loading/Loading';

function AllSongs() {

  const context = useContext(SubContext);
  const { userDoc, loading } = context;
  const allSongs = (userDoc) ? userDoc.songs : undefined;

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
          <SongEntry title={songObj.title} song={songObj} sortByDateAdded={false} key={songId} />
        )
      })}
    </AllSongsStyled>
  )
}

export default AllSongs;