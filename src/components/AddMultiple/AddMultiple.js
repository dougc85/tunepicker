import { React, useState } from 'react';
import './AddMultiple.scss';
import useFormInput from '../../hooks/useFormInput';

function AddMultiple(props) {

  const { set, setShowAddMultiple } = props;

  const [songList, handleSongListChange, resetSongList] = useFormInput('');



  function handleCancel(e) {
    e.preventDefault();

    // Here, reset the form inputs

    setShowAddMultiple(false);
  }

  function handleAdd(e) {
    e.preventDefault();

    const songArray = songList.split(/\r?\n/);
    console.log(songArray);
  }

  return (
    <div className="AddMultiple">
      <div onClick={handleCancel} className="AddMultiple-screen"></div>
      <form action="" className="AddMultiple-form">
        <legend className="AddMultiple-form-heading">Add Multiple Songs to '{set.setName}'</legend>
        <p className="AddMultiple-form-directions">
          Add multiple songs at once by pasting (or typing out) a list of songs into the text box below.
          Make sure you strike the return/enter key after each song. Songs will be entered into this set and default
          to the 'New' knowledge level.  Also, all will be entered such that your preference for their key will be 'random'.
          Later updates will provide the ability to
          add a list of songs to any number of sets as well as allowing you to set the knowledge level of the group yourself.
          Any songs that you list which are already to be found in your library will be imported into this set with all their
          current settings intact.
        </p>
        <textarea name="" id="" cols="30" rows="10" className="AddMultiple-form-textarea" value={songList} onChange={handleSongListChange}></textarea>
        <div className="AddMultiple-form-buttons">
          <button onClick={handleCancel} className="AddMultiple-form-cancel">Cancel</button>
          <button onClick={handleAdd} className="AddMultiple-form-add">Add Songs</button>
        </div>
      </form>
    </div>
  )
}

export default AddMultiple;