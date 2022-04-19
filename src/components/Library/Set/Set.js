import './Set.scss';
import { React, useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useParams, Routes, Route } from 'react-router-dom';
import AddSong from '../../AddSong/AddSong';
import AddMultiple from '../../AddMultiple/AddMultiple';
import SongEntry from '../SongEntry/SongEntry';
import Loading from '../../Loading/Loading';
import AlreadyInLibrary from '../../AlreadyInLibrary/AlreadyInLibrary';
import Path from '../Path/Path';
import Song from '../Song/Song';

function Set(props) {

  const { setNames, songNames, user, loading, showAlreadyInLibrary, setShowAlreadyInLibrary, setCurrentSong, currentSong, getSongData, allSongs } = props;
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
    <div className="container">
      {renderSet && (
        <div className="Set">
          <Path heading={set.setName} pathType="Set" />
          <div className="Set-songs">
            <div className="Set-songs-header">
              <h2 className="Set-songs-header-heading">Songs</h2>
              <button onClick={handleAddButton} className="Set-songs-header-add">Add a Song</button>
              <button className="Set-songs-header-add" onClick={handleAddMultipleButton} >Add Multiple Songs</button>
            </div>

            {Object.keys(set.allSongs).map((songId) => {
              const song = allSongs[songId];
              return (
                <SongEntry song={song} sortByDateAdded={false} key={songId} setCurrentSong={setCurrentSong} />
              )
            })}
          </div>
          {showAddSong && <AddSong set={set} setShowAddSong={setShowAddSong} user={user} setShowAlreadyInLibrary={setShowAlreadyInLibrary} setSongConsidered={setSongConsidered} />}
          {showAddMultiple && <AddMultiple set={set} setShowAddMultiple={setShowAddMultiple} songNames={songNames} user={user} allSongs={allSongs} />}
          {showAlreadyInLibrary && <AlreadyInLibrary songConsidered={songConsidered} set={set} />}
        </div>
      )}
      <Routes>
        <Route path=":songTitle" element={<Song song={currentSong} loading={loading} getSongData={getSongData} setNames={setNames} user={user} allSongs={allSongs} setCurrentSong={setCurrentSong} />} />
      </Routes>
    </div>
  )
}

export default Set;