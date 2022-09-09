import React, { useState, useContext } from 'react';
import { ChangeSetStyled, Buttons } from './ChangeSet.styled';
import Modal from '../../generics/Modal.styled';
import SubContext from '../../../context/sub-context';
import Loading from '../../Loading/Loading';
import AddButton from '../../generics/AddButton.styled';
import capitalize from '../../../helperFunctions/capitalize';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function ChangeSet(props) {

  const { setShowChangeSet, currentSetId, initialPick } = props

  const [loading, setLoading] = useState(false);
  const [newPickerSetId, setNewPickerSetId] = useState(currentSetId);

  const { user, userDoc, handleNetworkError } = useContext(SubContext);
  const { setNames } = userDoc;

  function hideChangeSet(e) {
    if (e) {
      e.preventDefault();
    }
    setShowChangeSet(false);
  }

  function isChecked(value) {
    return (value === newPickerSetId)
  }

  function handleRadioChange(e) {
    if (e.target.checked) {
      setNewPickerSetId(e.target.value);
    }
  }

  async function submitSet(e) {
    e.preventDefault();

    if (newPickerSetId !== currentSetId) {

      const userDocRef = doc(db, 'users', user.uid);

      try {
        setLoading(true);
        await updateDoc(userDocRef, {
          pickerSet: newPickerSetId,
        })
      } catch (error) {
        handleNetworkError(error.message);
      }
    }
    setLoading(false);
    hideChangeSet();
  }

  return (
    <Modal handleOutsideClick={hideChangeSet}>
      {loading ? <Loading size={2} /> :
        <ChangeSetStyled>
          <h3>Change Set</h3>
          <fieldset>
            <legend>Pick tunes from which set?</legend>
            {Object.keys(setNames).map((setId) => {
              return (
                <div key={setId}>
                  <input
                    id={setId}
                    value={setId}
                    type="radio"
                    name="picker-set-option"
                    onChange={handleRadioChange}
                    checked={isChecked(setId)}
                  />
                  <label htmlFor={setId}>
                    {capitalize(setNames[setId])}
                    <span></span>
                  </label>
                </div>
              )
            })}
          </fieldset>
          <Buttons>
            <AddButton onClick={hideChangeSet}>Cancel</AddButton>
            <div />
            <AddButton onClick={submitSet}>Select</AddButton>
          </Buttons>
        </ChangeSetStyled>
      }
    </Modal>
  )
}

export default ChangeSet;