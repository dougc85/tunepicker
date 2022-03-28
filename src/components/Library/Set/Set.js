import './Set.scss';
import { React, useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useParams } from 'react-router-dom';
import AddSong from '../../AddSong/AddSong';
import SongEntry from '../SongEntry/SongEntry';
import Loading from '../../Loading/Loading';
import AlreadyInLibrary from '../../AlreadyInLibrary/AlreadyInLibrary';
import Path from '../Path/Path';

function Set(props) {

  const { sets, user, loading, showAlreadyInLibrary, setShowAlreadyInLibrary, setCurrentSong } = props;
  const params = useParams();

  const [showAdd, setShowAdd] = useState(false);
  const [songConsidered, setSongConsidered] = useState('');
  const [set, setSet] = useState(undefined);

  function handleAddButton(e) {
    setShowAdd(true);
  }

  useEffect(() => {

    let unsubscribeSetSnapshot;

    if (user) {
      try {
        unsubscribeSetSnapshot = onSnapshot(doc(db, 'users', user.uid, 'sets', params.setName), (doc) => {
          setSet(doc.data());
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
  }, [user, params.setName])

  return (
    (loading || !set) ?
      <Loading /> :
      <div className="Set">
        <Path heading={set.setName} pathType="Set" />
        <div className="Set-songs">
          <div className="Set-songs-header">
            <h2 className="Set-songs-header-heading">Songs</h2>
            <button onClick={handleAddButton} className="Set-songs-header-add">Add a Song</button>
          </div>

          {Object.keys(set.allSongs).map((songTitle) => {
            const song = set.allSongs[songTitle];
            return (
              <SongEntry title={songTitle} song={song} sortByDateAdded={false} key={songTitle} setCurrentSong={setCurrentSong} />
            )
          })}
        </div>
        {showAdd && <AddSong set={set} setShowAdd={setShowAdd} user={user} setShowAlreadyInLibrary={setShowAlreadyInLibrary} setSongConsidered={setSongConsidered} />}
        {showAlreadyInLibrary && <AlreadyInLibrary songConsidered={songConsidered} set={set} />}

      </div>

  )
}

export default Set;