import React, { useContext, useReducer, useEffect } from 'react';
import SubContext from '../../../context/sub-context';
import SongEntry from '../SongEntry/SongEntry';
import Path from '../Path/Path';
import { AllSongsStyled, AllSongsHeader } from './AllSongs.styled';
import Loading from '../../Loading/Loading';
import useSongSort from '../../../hooks/useSongSort';
import SortBy from '../../generics/SortBy.styled';

function AllSongs() {

  const context = useContext(SubContext);
  const { userDoc, loading } = context;
  const { songs: allSongs } = userDoc;

  const [state, dispatch] = useSongSort();
  const { songsArray, sortedBy } = state;


  useEffect(() => {
    if (allSongs) {
      dispatch({ sortMethod: "Title - Ascending", payload: allSongs });
    }
  }, [allSongs]);


  if (loading || !songsArray) {
    return (
      <Loading />
    )
  }

  return (

    <AllSongsStyled>
      <Path heading="All Songs" pathType="All Songs" />
      <AllSongsHeader>
        <h2>All Songs</h2>
        <SortBy dispatch={dispatch} sortedBy={sortedBy} songList={allSongs} marginTop={"-13px"} />
      </AllSongsHeader>
      <ul>
        {songsArray.map((songObj) => {
          return (
            <SongEntry title={songObj.title} song={songObj} key={songObj.id} />
          )
        })}
      </ul>
    </AllSongsStyled>
  )
}

export default AllSongs;