import './AddSet.scss';
import { React, useState } from 'react';
import {
  addDoc, setDoc, doc, collection, arrayUnion, updateDoc,
} from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import useFormInput from '../../../../hooks/useFormInput';

function AddSet(props) {

  const { user, setNames, setShowAddSet } = props;
  const [disableForm, setDisableForm] = useState(false);
  const [title, handleTitleChange, resetTitle] = useFormInput('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleCancel(e) {
    e.preventDefault();
    resetTitle();
    setShowAddSet(false);
  }

  function handleTitleChangeAndDuplicates(e) {
    setShowError(false);
    setErrorMessage('');
    if (Object.keys(setNames).some((setId) => setNames[setId].toLowerCase() === e.target.value.toLowerCase())) {
      setShowError(true);
      setErrorMessage('This set name already taken')
      setDisableForm(true);
    } else {
      setDisableForm(false);
    }
    handleTitleChange(e);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (title === '') {
      setErrorMessage('This field is required');
      setShowError(true);
    } else {
      try {
        const newSet = {
          setName: title,
          fullKnow: [],
          currentKnow: [],
          fullNew: [],
          currentNew: [],
          fullMedium: [],
          currentMedium: [],
          allSongs: [],
        };
        const newSetDoc = await addDoc(
          collection(db, 'users', user.uid, 'sets'),
          newSet,
        );
        await updateDoc(
          doc(db, 'users', user.uid),
          {
            [`setNames.${newSetDoc.id}`]: title,
          });

        resetTitle();
        setShowAddSet(false);
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="AddSet">
      <div onClick={handleCancel} className="AddSet-screen"></div>
      <form action="" className="AddSet-form">
        <legend className="AddSet-form-heading">
          Add Set
        </legend>
        <div className="AddSet-form-title">
          <label className="AddSet-form-title-label" htmlFor="set-title">Title:</label>
          <input required className="AddSet-form-title-input" onChange={handleTitleChangeAndDuplicates} value={title} id="set-title" type="text" name="set-title" autoComplete="off"></input>
          {showError && <p className="AddSet-form-title-error">{errorMessage}</p>}
        </div>
        <div className="AddSet-form-buttons">
          <button onClick={handleCancel} className="AddSet-form-cancel">Cancel</button>
          <button disabled={disableForm} onClick={handleAdd} className="AddSet-form-add">Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddSet;