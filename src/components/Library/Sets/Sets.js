import { React, useState, useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { useNavigate } from 'react-router-dom';
import { SetsStyled, SetsHeader } from './Sets.styled';
import AddSet from './AddSet/AddSet';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';

function Sets() {

  const { userDoc, loading } = useContext(SubContext);
  const { setNames } = userDoc;

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
      <SetsHeader>
        <h2>Sets</h2>
        <button onClick={handleAddButton}>Add a Set</button>
      </SetsHeader>
      <SetsStyled>
        {Object.keys(setNames).sort((id1, id2) => {
          if (setNames[id1] < setNames[id2]) {
            return -1;
          }
          return 1;
        }).map((setId) => {
          return (
            <li onClick={() => { handleClick(setId) }} key={setId}>
              {setNames[setId]}
            </li>
          )
        }
        )}
        <li onClick={() => { handleClick('tunesiwanttolearn') }} key={'tunesiwanttolearn'} >Tunes I Want To Learn</li>
      </SetsStyled>
      {showAddSet && <AddSet setShowAddSet={setShowAddSet} />}
    </>
  )
}

export default Sets;