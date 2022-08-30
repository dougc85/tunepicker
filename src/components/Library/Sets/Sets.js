import { React, useState, useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { useNavigate } from 'react-router-dom';
import { SetsStyled, SetsHeader } from './Sets.styled';
import AddSet from './AddSet/AddSet';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';
import capitalize from '../../../helperFunctions/capitalize';

function Sets(props) {

  const { userDoc, loading } = useContext(SubContext);
  const { setNames } = userDoc;

  const { addArrow, titleArrow, quickForward, quick } = props;

  const navigate = useNavigate();
  const [showAddSet, setShowAddSet] = useState(false);

  function handleAddButton() {
    if (quick === 4) {
      quickForward();
    }
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
      <Path heading="Sets" pathType="Sets" disable={quickForward ? true : false} />
      <SetsHeader>
        <h2>Sets</h2>
        <button onClick={handleAddButton}>
          Add a Set
          {addArrow ? addArrow : null}
        </button>
      </SetsHeader>
      <SetsStyled disable={(quick === 4) ? true : false}>
        {Object.keys(setNames).sort((id1, id2) => {
          if (setNames[id1] < setNames[id2]) {
            return -1;
          }
          return 1;
        }).map((setId) => {
          return (
            <li onClick={() => { handleClick(setId) }} key={setId}>
              {capitalize(setNames[setId])}
            </li>
          )
        }
        )}
      </SetsStyled>
      {showAddSet && <AddSet setShowAddSet={setShowAddSet} titleArrow={titleArrow} quickForward={quickForward} />}
    </>
  )
}

export default Sets;