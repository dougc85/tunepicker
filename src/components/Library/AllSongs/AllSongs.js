import React, { useContext, useReducer, useEffect } from 'react';
import SubContext from '../../../context/sub-context';
import SongEntry from '../SongEntry/SongEntry';
import Path from '../Path/Path';
import { AllSongsStyled, AllSongsHeader } from './AllSongs.styled';
import Loading from '../../Loading/Loading';

const songsReducer = (state, action) => {
  if (action.sortMethod === "Title - Ascending") {

    const oldSongObject = { ...action.payload };
    const oldSongArrayOfObjects = Object.keys(oldSongObject).map((songId) => oldSongObject[songId]);
    console.log(oldSongArrayOfObjects, 'oldSongArrayOfObjects');
    const newSongArray = oldSongArrayOfObjects.sort((a, b) => {
      return a.title.localeCompare(b.title, undefined, { numeric: true });
    })

    return {
      songsArray: newSongArray,
      sortedBy: action.sortMethod,
    }
  }
}

const songsInitialValues = {
  songsArray: undefined,
  sortedBy: "Title - Ascending",
}

function AllSongs() {

  const context = useContext(SubContext);
  const { userDoc, loading } = context;
  const { songs: allSongs } = userDoc;

  const [state, dispatch] = useReducer(songsReducer, songsInitialValues);
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

  const sortOptions = [
    "Title - Ascending",
    "Title - Descending",
    "Knowledge",
    "Date Added",
  ]

  return (

    <AllSongsStyled>
      <Path heading="All Songs" pathType="All Songs" />
      <AllSongsHeader>
        <h2>All Songs</h2>
        <div>
          <label htmlFor="allSongs-sorting">Sort By:</label>
          <select id="allSongs-sorting" onChange={() => { }} value={sortedBy}>
            {sortOptions.map((key) => {
              return (
                <option value={key} key={key}>{key}</option>
              )
            })}
          </select>
        </div>
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