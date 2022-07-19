import React, { useState, useContext } from 'react';
import { EditKeyStyled, FormInputs } from './EditKey.styled';
import Modal from '../../generics/Modal.styled';
import AddButton from '../../generics/AddButton.styled';
import SubContext from '../../../context/sub-context';
import { db } from '../../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import Loading from '../../Loading/Loading';

function EditKey(props) {

  const { setShowEditKey, songId, songKey } = props;

  const context = useContext(SubContext);
  const { user } = context;

  const [keyVal, setKeyVal] = useState(songKey);
  const [loading, setLoading] = useState(false);

  const keys = ['C', 'D\u266D', 'D', 'E\u266D', 'E', 'F', 'F\u266F', 'G', 'A\u266D', 'A', 'B\u266D', 'B'];

  function hideEditKey(e) {
    if (e) {
      e.preventDefault();
    }
    setShowEditKey(false);
  }

  function handleInput(e) {
    setKeyVal(e.target.value);
  }

  async function editKey(e) {

    e.preventDefault();

    if (songKey !== keyVal) {
      const userDocRef = doc(db, 'users', user.uid);

      try {
        setLoading(true);
        await updateDoc(userDocRef, {
          [`songs.${songId}.songKey`]: keyVal,
        })
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }

    }

    hideEditKey();
  }

  return (
    <Modal handleOutsideClick={hideEditKey} contentHeight={'10rem'}>
      {loading ? <Loading size={2} spinnerOnly /> : (
        <EditKeyStyled>
          <h3>Edit Key</h3>
          <FormInputs>
            <div>
              <label htmlFor="edit-key" >Key:</label>
              <select name="edit-key" id="edit-key" onChange={handleInput} value={keyVal} >
                <option value="random" key="random">random</option>
                {keys.map((key) => {
                  return (
                    <option value={key} key={key}>{key}</option>
                  )
                })}
              </select>
            </div>
            <AddButton onClick={editKey}>Confirm</AddButton>
          </FormInputs>
        </EditKeyStyled>
      )}
    </Modal>
  )
}

export default EditKey;