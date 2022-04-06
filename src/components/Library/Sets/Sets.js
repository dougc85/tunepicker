import './Sets.scss';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddSet from './AddSet/AddSet';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';

function Sets(props) {

  const { user, loading, setNames } = props;

  const navigate = useNavigate();
  const [showAddSet, setShowAddSet] = useState(false);

  function handleAddButton() {
    setShowAddSet(true);
  }

  function handleClick(setId) {
    navigate(`/library/sets/${setId}`)
  }

  if (!setNames) {
    return (<div>Needs fixing</div>)
  }

  return (
    loading ?
      <Loading /> :
      <div className="Sets">
        <Path heading="Sets" pathType="Sets" />
        <ul className="Sets-sets">
          <div className="Sets-sets-header">
            <h2 className="Sets-sets-header-heading">Sets</h2>
            <button onClick={handleAddButton} className="Sets-sets-header-add">Add a Set</button>
          </div>
          {Object.keys(setNames).map((setId) => {
            return (
              <li onClick={() => { handleClick(setId) }} className="Sets-sets-set" key={setId}>
                {setNames[setId]}
              </li>
            )
          }
          )}
        </ul>
        {showAddSet && <AddSet user={user} setShowAddSet={setShowAddSet} setNames={setNames} />}
      </div >
  )
}

export default Sets;