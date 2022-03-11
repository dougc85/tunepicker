import './Set.scss';
import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddSong from '../../AddSong/AddSong';
import SongEntry from '../SongEntry/SongEntry';
import Loading from '../../Loading/Loading';

function Set(props) {

  const { sets, user, loading } = props;
  const params = useParams();
  const set = sets[params.setName];

  const [showAdd, setShowAdd] = useState(false);

  function handleAddButton(e) {
    setShowAdd(true);
  }

  return (
    loading ?
      <Loading /> :
      <div className="Set">
        <div className="Set-header">
          <h2 className="Set-heading">{set.setName}</h2>
          <button onClick={handleAddButton} className="Set-add">Add a Song</button>
        </div>
        <div className="Set-songs">
          {Object.keys(set.allSongs).map((songTitle) => {
            const { knowledge, createdAt } = set.allSongs[songTitle];
            return (
              <SongEntry title={songTitle} knowledge={knowledge} createdAt={createdAt} sortByDateAdded={false} key={songTitle} />
            )
          })}
        </div>
        {showAdd && <AddSong set={set} setShowAdd={setShowAdd} user={user} />}
      </div>

  )
}

export default Set;