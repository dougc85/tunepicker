import { React, useState, useEffect, useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useParams, Routes, Route } from 'react-router-dom';
import AddSong from '../../AddSong/AddSong';
import AddMultiple from '../../AddMultiple/AddMultiple';
import SongEntry from '../SongEntry/SongEntry';
import Loading from '../../Loading/Loading';
import AlreadyInLibrary from '../../AlreadyInLibrary/AlreadyInLibrary';
import Path from '../Path/Path';
import Song from '../Song/Song';
import { SetSongs, SetSongsHeader } from './SetSongs.styled';

function Set(props) {

  const { user, userDoc, loading } = useContext(SubContext);

  const { songNames, songs: allSongs } = userDoc;

  const { showAlreadyInLibrary, setShowAlreadyInLibrary } = props;
  const params = useParams();

  const [showAddSong, setShowAddSong] = useState(false);
  const [showAddMultiple, setShowAddMultiple] = useState(false);
  const [songConsidered, setSongConsidered] = useState('');
  const [set, setSet] = useState(undefined);

  function handleAddButton(e) {
    setShowAddSong(true);
  }

  function handleAddMultipleButton(e) {
    setShowAddMultiple(true);
  }

  async function setAsPicker(e) {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        pickerSet: set.id,
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {


    let unsubscribeSetSnapshot;

    if (user) {
      try {
        unsubscribeSetSnapshot = onSnapshot(doc(db, 'users', user.uid, 'sets', params.setId), (doc) => {
          setSet({
            ...doc.data(),
            id: params.setId,
          });
        });

      } catch (err) {
        console.log(err.message);
      }
    }

    return () => {
      if (unsubscribeSetSnapshot) {
        unsubscribeSetSnapshot();
      }
    }
  }, [user, params.setId])

  const renderSet = params['*'] ? false : true;

  if (loading || !set) {
    return (
      <Loading />
    )
  }

  return (
    <>
      {renderSet && (
        <>
          <Path heading={set.setName} pathType="Set" />
          <SetSongs>
            <SetSongsHeader>
              <h2>Songs</h2>
              <button onClick={handleAddButton}>Add a Song</button>
              <button onClick={handleAddMultipleButton} >Add Multiple Songs</button>
              <button onClick={setAsPicker} >Set as Picker Set</button>
            </SetSongsHeader>

            {Object.keys(set.allSongs).map((songId) => {
              const song = allSongs[songId];
              return (
                <SongEntry song={song} sortByDateAdded={false} key={songId} />
              )
            })}
          </SetSongs>
          {showAddSong && <AddSong set={set} songNames={songNames} setShowAddSong={setShowAddSong} user={user} setShowAlreadyInLibrary={setShowAlreadyInLibrary} setSongConsidered={setSongConsidered} />}
          {showAddMultiple && <AddMultiple set={set} setShowAddMultiple={setShowAddMultiple} songNames={songNames} user={user} allSongs={allSongs} />}
          {showAlreadyInLibrary && <AlreadyInLibrary songConsidered={songConsidered} set={set} />}
        </>
      )}
      <Routes>
        <Route path=":songId" element={<Song />} />
      </Routes>
    </>
  )
}

export default Set;