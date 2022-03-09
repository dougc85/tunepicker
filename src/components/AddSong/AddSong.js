import './AddSong.scss';
import { React } from 'react';
import useFormInput from '../../hooks/useFormInput';

function AddSong(props) {

  const { set, setShowAdd } = props;
  const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  const [title, handleTitleChange, resetTitle] = useFormInput('');

  function handleOutsideClick() {
    setShowAdd(false);
  }

  function handleCancel(e) {
    e.preventDefault();
    resetTitle();
    setShowAdd(false);
  }

  function handleAdd(e) {
    e.preventDefault();
  }

  return (
    <div className="AddSong">
      <div onClick={handleOutsideClick} className="AddSong-screen">
      </div>
      <form className="AddSong-form">
        <legend className="AddSong-form-title">Add Song to '{set.setName}'</legend>
        <label className="AddSong-form-title-label" htmlFor="song-title">Title</label>
        <input className="AddSong-form-title-input" onChange={handleTitleChange} value={title} id="song-title" type="text" name="song-title" autocomplete="off"></input>
        <label htmlFor="key" className="AddSong-form-key-label">Key</label>
        <select name="key" id="key" className="AddSong-form-key-input">
          <option value="random">random</option>
          {keys.map((key) => {
            let keyModified = key;
            if (key.length === 2) {
              key[1] === "#" ? keyModified = key[0] + `\u266F` :
                keyModified = key[0] + `\u266D`;
            }
            return (
              <option value={key}>{keyModified}</option>
            )
          })}
        </select>
        <label htmlFor="song-notes" className="AddSong-form-notes-label">Notes</label>
        <textarea className="AddSong-form-notes-input"></textarea>
        <div className="AddSong-form-buttons">
          <button onClick={handleCancel} className="AddSong-form-cancel">Cancel</button>
          <button onClick={handleAdd} className="AddSong-form-add">Add Song</button>
        </div>
      </form>
    </div>


  )
}

export default AddSong;