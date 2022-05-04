import './Sets.scss';
import { React, useState, useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { useNavigate } from 'react-router-dom';

import AddSet from './AddSet/AddSet';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';

function Sets() {

  const { userDoc, loading } = useContext(SubContext);
  const setNames = (userDoc) ? userDoc.setNames : undefined;

  const navigate = useNavigate();
  const [showAddSet, setShowAddSet] = useState(false);

  function handleAddButton() {
    setShowAddSet(true);
  }

  function handleClick(setId) {
    navigate(`/library/sets/${setId}`)
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Path heading="Sets" pathType="Sets" />
      <ul className="Sets-sets">
        <div className="Sets-sets-header">
          <h2 className="Sets-sets-header-heading">Sets</h2>
          <button onClick={handleAddButton} className="Sets-sets-header-add">Add a Set</button>
        </div>
        {Object.keys(setNames).sort((id1, id2) => {
          if (setNames[id1] < setNames[id2]) {
            return -1;
          }
          return 1;
        }).map((setId) => {
          return (
            <li onClick={() => { handleClick(setId) }} className="Sets-sets-set" key={setId}>
              {setNames[setId]}
            </li>
          )
        }
        )}
      </ul>
      {showAddSet && <AddSet setShowAddSet={setShowAddSet} />}
    </>
  )
}

export default Sets;