import React, { useContext, useEffect, useState } from 'react';
import SubContext from '../../../context/sub-context';
import SongEntry from '../SongEntry/SongEntry';
import Path from '../Path/Path';
import { AllSongsStyled, AllSongsHeader, SongsHeader } from './AllSongs.styled';
import Loading from '../../Loading/Loading';
import useSongSort from '../../../hooks/useSongSort';
import SortBy from '../../generics/SortBy.styled';
import LibraryMenu from '../../generics/LibraryMenu.styled';
import AddSong from '../../AddSong/AddSong';
import AddMultiple from '../../AddMultiple/AddMultiple';
import { handleExport } from '../../../helperFunctions/handleExport';

function AllSongs() {

  const context = useContext(SubContext);
  const { userDoc, loading, user } = context;
  const { songs: allSongs, songNames, setNames } = userDoc;

  const [state, dispatch] = useSongSort();
  const { songsArray, sortedBy } = state;

  const [showAddSong, setShowAddSong] = useState(false);
  const [showAddMultiple, setShowAddMultiple] = useState(false);


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

  function handleAddButton() {
    setShowAddSong(true);
  }

  function handleAddMultipleButton() {
    setShowAddMultiple(true);
  }

  function handleExportClick() {

    const songNames = songsArray.map((song) => {
      return song.title;
    });
    handleExport(songNames, 'All Songs');

  };

  const libraryMenuItems = [
    { text: 'Add New Song', func: handleAddButton },
    { text: 'Add Multiple Songs', func: handleAddMultipleButton },
    { text: 'Export all as .txt file', func: handleExportClick },
  ];

  return (

    <>
      <AllSongsStyled>
        <Path heading="All Songs" pathType="All Songs" />
        <AllSongsHeader>
          <h2>All Songs</h2>
          <LibraryMenu items={libraryMenuItems} allSongs />
        </AllSongsHeader>
        <SongsHeader>
          <SortBy dispatch={dispatch} sortedBy={sortedBy} songList={allSongs} marginTop={"-13px"} />
        </SongsHeader>
        <ul>
          {songsArray.map((songObj) => {
            return (
              <SongEntry title={songObj.title} song={songObj} key={songObj.id} />
            )
          })}
        </ul>
      </AllSongsStyled>
      {showAddSong &&
        <AddSong user={user} setShowAddSong={setShowAddSong} songNames={songNames} allSongs setNames={setNames} />
      }
      {showAddMultiple &&
        <AddMultiple calling={'allSongs'} setShowAddMultiple={setShowAddMultiple} songNames={songNames} user={user} allSongs={allSongs} setNames={setNames} />
      }
    </>
  )
}

export default AllSongs;