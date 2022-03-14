import './Set.scss';
import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddSong from '../../AddSong/AddSong';
import SongEntry from '../SongEntry/SongEntry';
import Loading from '../../Loading/Loading';
import AlreadyInLibrary from '../../AlreadyInLibrary/AlreadyInLibrary';
import Path from '../Path/Path';

function Set(props) {

  const { sets, user, loading, showAlreadyInLibrary, setShowAlreadyInLibrary, setCurrentSong } = props;
  const params = useParams();
  const set = sets[params.setName];

  const [showAdd, setShowAdd] = useState(false);
  const [songConsidered, setSongConsidered] = useState('');

  function handleAddButton(e) {
    setShowAdd(true);
  }

  return (
    loading ?
      <Loading /> :
      <div className="Set">
        <Path heading="Set" pathType="Set" />
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