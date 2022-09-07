import { React, useState, useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { useNavigate } from 'react-router-dom';
import { SetStyled, SetsHeader } from './Sets.styled';
import AddSet from './AddSet/AddSet';
import Path from '../Path/Path';
import Loading from '../../Loading/Loading';
import capitalize from '../../../helperFunctions/capitalize';

function Sets(props) {

  const { userDoc, loading } = useContext(SubContext);
  const { setNames } = userDoc;

  const { addArrow, titleArrow, setArrow, quickForward, quick, rememberSetName, createdSetName, rememberSetId } = props;

  const navigate = useNavigate();
  const [showAddSet, setShowAddSet] = useState(false);

  function handleAddButton() {
    if (setArrow) {
      return;
    }
    if (addArrow) {
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
      <ul>
        {Object.keys(setNames).sort((id1, id2) => {
          if (setNames[id1] < setNames[id2]) {
            return -1;
          }
          return 1;
        }).map((setId) => {
          if (setNames[setId] === createdSetName) {
            return (
              <SetStyled
                onClick={() => {
                  rememberSetId(setId);
                  quickForward();
                }}
                key={setId}
              >
                {capitalize(setNames[setId])}
                {setArrow}
              </SetStyled>
            )
          } else {
            return (
              <SetStyled onClick={() => { handleClick(setId) }} key={setId} disable={(addArrow || setArrow) ? true : false}>
                {capitalize(setNames[setId])}
              </SetStyled>
            )
          }
        }
        )}
      </ul>
      {showAddSet &&
        <AddSet
          setShowAddSet={setShowAddSet}
          titleArrow={titleArrow}
          quickForward={quickForward}
          rememberSetName={rememberSetName}
        />}
    </>
  )
}

export default Sets;