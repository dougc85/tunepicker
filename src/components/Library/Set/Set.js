import { React, useState, useEffect, useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useParams, Routes, Route } from 'react-router-dom';
import AddSong from '../../AddSong/AddSong';
import AddMultiple from '../../AddMultiple/AddMultiple';
import SongEntry from '../SongEntry/SongEntry';
import Loading from '../../Loading/Loading';
import Path from '../Path/Path';
import Song from '../Song/Song';
import { SetStyled, SetHeader, SongHeader, LoadingContainer } from './Set.styled';
import LibraryMenu from '../../../components/generics/LibraryMenu.styled';
import DeleteSet from './DeleteSet/DeleteSet';
import CannotDelete from './CannotDelete/CannotDelete';
import NotFound from '../../generics/NotFound.styled';
import SortBy from '../../generics/SortBy.styled';
import useSongSort from '../../../hooks/useSongSort';
import EditSetName from './EditSetName/EditSetName';
import capitalize from '../../../helperFunctions/capitalize';
import AddFromLibrary from './AddFromLibrary/AddFromLibrary';

function Set(props) {

  const { user, userDoc, loading, handleNetworkError } = useContext(SubContext);
  const { quickStartId, menuArrow, quickForward, quick } = props;

  const { setNames, songNames, songs: allSongs, pickerSet: pickerSetId } = userDoc;

  const params = useParams();

  const [showAddSong, setShowAddSong] = useState(false);
  const [showAddMultiple, setShowAddMultiple] = useState(false);
  const [showDeleteSet, setShowDeleteSet] = useState(false);
  const [showCannotDelete, setShowCannotDelete] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showEditSetName, setShowEditSetName] = useState(false);
  const [showAddFromLibrary, setShowAddFromLibrary] = useState(false);
  const [set, setSet] = useState(undefined);
  const [localLoading, setLocalLoading] = useState(false);
  const [loadingForRedirect, setLoadingForRedirect] = useState(false);

  const [state, dispatch] = useSongSort();
  const { songsArray, sortedBy } = state;

  function handleAddButton(e) {
    setShowAddSong(true);
  }

  function handleAddMultipleButton(e) {
    setShowAddMultiple(true);
  }

  function handleDeleteButton(e) {

    if (Object.keys(setNames).length <= 1) {
      setShowCannotDelete(true);
    } else {
      setShowDeleteSet(true);
    }
  }

  async function setAsPicker(e) {
    try {
      setLocalLoading(true);

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        pickerSet: set.id,
      })
    }
    catch (error) {
      handleNetworkError(error.message);
    }

    setLocalLoading(false);
  }

  function editSetName() {
    setShowEditSetName(true);
  }

  function addFromLibrary() {
    setShowAddFromLibrary(true);
  }

  useEffect(() => {


    let unsubscribeSetSnapshot;

    if (user) {

      const firstRenderSetId = quickStartId ? quickStartId : params.setId;

      try {
        unsubscribeSetSnapshot = onSnapshot(doc(db, 'users', user.uid, 'sets', firstRenderSetId), (doc) => {
          const docData = doc.data();
          if (docData) {
            setSet({
              ...doc.data(),
              id: firstRenderSetId,
            });
          } else {
            setShowNotFound(true);
          }
        });

      } catch (error) {
        handleNetworkError(error.message);
      }
    }

    return () => {
      if (unsubscribeSetSnapshot) {
        unsubscribeSetSnapshot();
      }
    }
  }, [user, params.setId, quickStartId])

  useEffect(() => {
    if (set && allSongs) {
      const setSongsObject = {};

      Object.keys(set.allSongs).forEach((songId) => {
        setSongsObject[songId] = allSongs[songId];
      })

      dispatch({ sortMethod: "Title - Ascending", payload: setSongsObject });
    }

  }, [set, allSongs]);

  const renderSet = params['*'] ? false : true;

  if (loadingForRedirect) {
    return (
      <Loading />
    )
  }

  if (showNotFound) {
    return (
      <NotFound />
    )
  }

  if (loading || !set || !songsArray) {
    return (
      <Loading />
    )
  }

  const libraryMenuItems = (set.id === pickerSetId) ?
    [
      { text: 'Add New Song', func: handleAddButton },
      { text: 'Add Multiple New Songs', func: handleAddMultipleButton },
      { text: 'Add Songs From Your Library', func: addFromLibrary },
      { text: 'Edit Set Name', func: editSetName },
      { text: 'Delete Set', func: handleDeleteButton },
    ] :
    [
      { text: 'Set As PickerSet', func: setAsPicker },
      { text: 'Add New Song', func: handleAddButton },
      { text: 'Add Multiple New Songs', func: handleAddMultipleButton },
      { text: 'Add Songs From Your Library', func: addFromLibrary },
      { text: 'Edit Set Name', func: editSetName },
      { text: 'Delete Set', func: handleDeleteButton },
    ]

  const setSongsObject = {};

  if (set && allSongs) {
    Object.keys(set.allSongs).forEach((songId) => {
      setSongsObject[songId] = allSongs[songId];
    })
  }

  return (
    <>
      {renderSet && (
        <>
          <Path heading={capitalize(set.setName)} pathType="Set" disable={quickForward ? true : false} />
          <SetStyled>
            <SetHeader>
              <h2>{capitalize(set.setName)}</h2>
              <LibraryMenu
                items={libraryMenuItems}
                quickForward={quickForward}
                quick={quick}
              >
                {menuArrow ? menuArrow : null}
              </LibraryMenu>
            </SetHeader>
            {
              (set.id === pickerSetId) ? (
                <p>
                  * Currently Selected in the Tune Picker
                </p>
              ) :
                localLoading ?
                  <LoadingContainer>
                    <Loading size={2} spinnerOnly embedded />
                  </LoadingContainer>
                  : null
            }
            <SongHeader>
              <h3>Songs</h3>
              <SortBy
                dispatch={dispatch}
                sortedBy={sortedBy}
                songList={setSongsObject}
                marginTop={"-22px"}
                disable={quickForward ? true : false}
              />

            </SongHeader>
            <ul>
              {songsArray.map((songObj) => {
                return (
                  <SongEntry song={songObj} sortByDateAdded={false} key={songObj.id} />
                )
              })}
            </ul>
          </SetStyled>
          {showAddSong && <AddSong set={set} songNames={songNames} setShowAddSong={setShowAddSong} user={user} />}
          {showAddMultiple && <AddMultiple set={set} setShowAddMultiple={setShowAddMultiple} songNames={songNames} user={user} allSongs={allSongs} calling="set" />}
          {showDeleteSet && <DeleteSet setShowDeleteSet={setShowDeleteSet} set={set} setNames={setNames} setLoadingForRedirect={setLoadingForRedirect} />}
          {showCannotDelete && <CannotDelete setShowCannotDelete={setShowCannotDelete} />}
          {showEditSetName && <EditSetName setShowEditSetName={setShowEditSetName} oldTitle={set.setName} setNames={setNames} setId={set.id} user={user} />}
          {showAddFromLibrary && <AddFromLibrary setShowAddFromLibrary={setShowAddFromLibrary} set={set} user={user} userDoc={userDoc} />}
        </>
      )
      }
      <Routes>
        <Route path=":songId" element={<Song />} />
      </Routes>
    </>
  )
}

export default Set;