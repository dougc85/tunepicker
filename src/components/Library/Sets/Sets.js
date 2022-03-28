import './Sets.scss';
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  doc,
  collection,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AddSet from './AddSet/AddSet';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';

function Sets(props) {

  const { sets, user, loading, setNames } = props;

  const navigate = useNavigate();
  const [showAddSet, setShowAddSet] = useState(false);

  function handleAddButton() {
    setShowAddSet(true);
  }

  function handleClick(set) {
    navigate(`/library/sets/${set}`)
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
          {setNames.map((set) => {
            return (
              <li onClick={() => { handleClick(set) }} className="Sets-sets-set" key={set}>
                {set}
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