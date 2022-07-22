import React, { useState, useContext } from 'react';
import SubContext from '../../context/sub-context';
import { TunesIWantToLearnStyled, Header, TunesStyled } from "./TunesIWantToLearn.styled";
import LibraryMenu from '../generics/LibraryMenu.styled';
import Loading from '../Loading/Loading';
import AddMultiple from '../AddMultiple/AddMultiple';
import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import AddSongToWantToLearn from './AddSongToWantToLearn';
import Path from '../Library/Path/Path';
import capitalize from '../../helperFunctions/capitalize';

function TunesIWantToLearn() {

  const { user, userDoc, loading, handleNetworkError } = useContext(SubContext);
  const { tunesIWantToLearn: tuneNames } = userDoc;

  const [showAddSong, setShowAddSong] = useState(false);
  const [showAddMultiple, setShowAddMultiple] = useState(false);
  const [songsLoading, setSongsLoading] = useState({});


  function handleAddButton(e) {
    setShowAddSong(true);
  }

  function handleAddMultipleButton(e) {
    setShowAddMultiple(true);
  }

  async function deleteTune(e) {
    setSongsLoading((oldObject) => {
      const newObject = { ...oldObject };
      newObject[e.target.dataset.name] = null;
      return newObject;
    })
    const tuneName = e.target.dataset.name.toLowerCase();
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
      if (newObject.hasOwnProperty(e.target.dataset.name)) {
        delete newObject[e.target.dataset.name];
      }
      return newObject;
    })
  }

  const libraryMenuItems = [
    { text: 'Add Song To List', func: handleAddButton },
    { text: 'Add Multiple Songs To List', func: handleAddMultipleButton },
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
          />
        </Header>
        <TunesStyled>
          {Object.keys(tuneNames).sort().map((name) => {
            return (
              <li key={name}>
                <span>{capitalize(name)}</span>
                <div>
                  {songsLoading.hasOwnProperty(name) ?
                    <Loading size={1} embedded spinnerOnly /> :
                    <svg viewBox="0 0 24 24" >
                      <path data-name={name} onClick={deleteTune} fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                  }
                </div>

              </li>
            )
          }
          )}
        </TunesStyled>
      </TunesIWantToLearnStyled>
      {showAddSong && <AddSongToWantToLearn setShowAddSong={setShowAddSong} user={user} userDoc={userDoc} tuneNames={tuneNames} />}
      {showAddMultiple && <AddMultiple setShowAddMultiple={setShowAddMultiple} songNames={userDoc.tunesIWantToLearn} user={user} calling="tunesIWantToLearn" />}
    </>
  )
}

export default TunesIWantToLearn;