import './Set.scss';
import { React, useState } from 'react';
import AddSong from '../../AddSong/AddSong';

function Set(props) {

  const { set } = props;
  const [showAdd, setShowAdd] = useState(false);

  function handleAddButton(e) {
    setShowAdd(true);
  }

  return (
    <div className="Set">
      <h2 className="Set-heading">{set.setName}</h2>
      <button onClick={handleAddButton} className="Set-add">Add a Song</button>
      {showAdd && <AddSong set={set} setShowAdd={setShowAdd} />}
    </div>
  )
}

export default Set;