import './Set.scss';
import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddSong from '../../AddSong/AddSong';
import SongEntry from '../SongEntry/SongEntry';
import Loading from '../../Loading/Loading';
import AlreadyInLibrary from '../../AlreadyInLibrary/AlreadyInLibrary';

function Set(props) {

  const { sets, user, loading, showAlreadyInLibrary, setShowAlreadyInLibrary } = props;
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
        <div className="Set-path">
          <svg className="Set-path-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z" />
          </svg>
          <p className="Set-path-divider">/</p>
          <svg className="Set-path-icon Set-path-icon-book" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z" />
          </svg>
          <p className="Set-path-divider">/</p>
          <svg className="Set-path-icon Set-path-icon-doc" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z" />
          </svg>
          <p className="Set-path-heading">{set.setName}</p>
        </div>
        <div className="Set-songs">
          <div className="Set-songs-header">
            <h2 className="Set-songs-header-heading">Songs</h2>
            <button onClick={handleAddButton} className="Set-songs-header-add">Add a Song</button>
          </div>

          {Object.keys(set.allSongs).map((songTitle) => {
            const { knowledge, createdAt } = set.allSongs[songTitle];
            return (
              <SongEntry title={songTitle} knowledge={knowledge} createdAt={createdAt} sortByDateAdded={false} key={songTitle} />
            )
          })}
        </div>
        {showAdd && <AddSong set={set} setShowAdd={setShowAdd} user={user} setShowAlreadyInLibrary={setShowAlreadyInLibrary} setSongConsidered={setSongConsidered} />}
        {showAlreadyInLibrary && <AlreadyInLibrary songConsidered={songConsidered} set={set} />}

      </div>

  )
}

export default Set;