import React, { useState, useContext, useRef, useEffect } from 'react';
import SubContext from '../../context/sub-context';
import { TunesIWantToLearnStyled, Header, TunesStyled, RightIcon, SecondRightIcon } from "./TunesIWantToLearn.styled";
import LibraryMenu from '../generics/LibraryMenu.styled';
import Loading from '../Loading/Loading';
import AddMultiple from '../AddMultiple/AddMultiple';
import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import AddSong from '../AddSong/AddSong';
import AddSongToWantToLearn from './AddSongToWantToLearn';
import Path from '../Library/Path/Path';
import capitalize from '../../helperFunctions/capitalize';
import { handleExport } from '../../helperFunctions/handleExport';

function TunesIWantToLearn(quickProps) {

  const { user, userDoc, loading, handleNetworkError } = useContext(SubContext);
  const { tunesIWantToLearn: tuneNames, songs: allSongs, songNames, setNames } = userDoc;

  const {
    quick,
    quickSong,
    deletedSongArrow,
    disableLibMenu,
  } = quickProps;

  const [showAddSong, setShowAddSong] = useState(false);
  const [showAddMultiple, setShowAddMultiple] = useState(false);
  const [showMoveSong, setShowMoveSong] = useState(false);
  const [moveSongName, setMoveSongName] = useState('');
  const [movedSongsAlreadyInLibrary, setMovedSongsAlreadyInLibrary] = useState([]);

  const timeoutsRef = useRef({}); // { [songName]: timeoutId }

  useEffect(() => {
  return () => {
    // clear any pending timers when this component unmounts
    Object.values(timeoutsRef.current).forEach((id) => clearTimeout(id));
    timeoutsRef.current = {};
  };
}, []);

  //This is an object where each key is a song name that is currently scheduled for deletion, so a 
  // loading spinner will appear on each song that's been clicked to delete until the deletion is confirmed.
  const [songsLoading, setSongsLoading] = useState({});


  function handleAddButton(e) {
    setShowAddSong(true);
  }

  function handleAddMultipleButton(e) {
    setShowAddMultiple(true);
  }

  async function deleteTune(name) {
    if (quick) {
      return;
    }
    setSongsLoading((oldObject) => {
      const newObject = { ...oldObject };
      newObject[name] = null;
      return newObject;
    })
    
    const tuneName = name.toLowerCase();
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        [`tunesIWantToLearn.${tuneName}`]: deleteField(),
      })
    } catch (error) {
      handleNetworkError(error.message);
    }
    setSongsLoading((oldObject) => {
      const newObject = { ...oldObject };
      if (newObject.hasOwnProperty(name)) {
        delete newObject[name];
      }
      return newObject;
    })
  }

  async function moveTune(name) {
    if (quick) {
      return;
    }
    
    if (songNames[name]) {
      // Song is already in library, just delete from tunes I want to learn
      setMovedSongsAlreadyInLibrary((oldArray) => [...oldArray, name]);

      timeoutsRef.current[name] = setTimeout(() => {
        setMovedSongsAlreadyInLibrary((oldArray) =>
          oldArray.filter((songName) => songName !== name)
        );
        delete timeoutsRef.current[name];
      }, 1000);
    } else {
      // Open AddSong modal to add to library
      setMoveSongName(name);
      setShowMoveSong(true);
    }
  }

  function handleExportClick() {
    handleExport(Object.keys(tuneNames).sort(), 'Tunes I Want To Learn');
  }

  const libraryMenuItems = [
    { text: 'Add Song To List', func: handleAddButton },
    { text: 'Add Multiple Songs To List', func: handleAddMultipleButton },
    { text: 'Export list as .txt file', func: handleExportClick },
  ]

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Path heading={'Tunes I Want To Learn'} pathType="tunesIWantToLearn" />
      <TunesIWantToLearnStyled>
        <Header>
          <h2>{"Tunes I Want To Learn"}</h2>
          <LibraryMenu
            items={libraryMenuItems}
            disableLibMenu={disableLibMenu}
          />
        </Header>
        <TunesStyled>
          {Object.keys(tuneNames).sort().map((name) => {
            if (name === quickSong) {
              return (
                <li key={name}>
                  {deletedSongArrow ? deletedSongArrow : null}
                  <span>{capitalize(name)}</span>
                  <SecondRightIcon>
                    {songsLoading.hasOwnProperty(name) ?
                      null :
                        <svg onClick={() => moveTune(name)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  >
                          <path  fill="currentColor" d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                        </svg>  
                    }
                  </SecondRightIcon>
                  <RightIcon>
                    {songsLoading.hasOwnProperty(name) ?
                      <Loading size={1} embedded spinnerOnly /> :
                      <svg onClick={() => deleteTune(name)} viewBox="0 0 24 24" >
                        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                      </svg>
                    }
                  </RightIcon>
                </li>
              )
            }
            
          
            return (
              movedSongsAlreadyInLibrary.includes(name) ?

                <li key={name} style={{opacity: 0.5}}>
                  <span>{capitalize(name)} is already in your library</span>
                </li> :
                
                <li key={name}>
                  <span>{capitalize(name)}</span>
                  <SecondRightIcon>
                    {songsLoading.hasOwnProperty(name) ?
                      null :
                        <svg onClick={() => moveTune(name)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  >
                          <path  fill="currentColor" d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                        </svg>  
                    }
                  </SecondRightIcon>
                  <RightIcon>
                    {songsLoading.hasOwnProperty(name) ?
                      <Loading size={1} embedded spinnerOnly /> :
                        <svg onClick={() => deleteTune(name)} viewBox="0 0 24 24" >
                          <path  fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>     
                    }
                  </RightIcon>
                </li>
            )
          }
          )}
        </TunesStyled>
      </TunesIWantToLearnStyled>
      {showAddSong && <AddSongToWantToLearn setShowAddSong={setShowAddSong} user={user} userDoc={userDoc} tuneNames={tuneNames} />}
      {showAddMultiple && <AddMultiple setShowAddMultiple={setShowAddMultiple} songNames={userDoc.tunesIWantToLearn} user={user} calling="tunesIWantToLearn" />}
      {showMoveSong && <AddSong setShowAddSong={setShowMoveSong} songNames={songNames} allSongs={allSongs} setNames={setNames} user={user} calling="moveTuneToLibrary" moveSongName={moveSongName} />}
    </>
  )
}

export default TunesIWantToLearn;