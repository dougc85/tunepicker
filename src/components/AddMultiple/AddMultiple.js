import { React } from 'react';
import './AddMultiple.scss';
import useFormInput from '../../hooks/useFormInput';
import { db } from '../../firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

function AddMultiple(props) {

  const { set, setShowAddMultiple, songNames, user } = props;

  const [songList, handleSongListChange, resetSongList] = useFormInput('');



  function handleCancel(e) {
    e.preventDefault();

    resetSongList();
    setShowAddMultiple(false);
  }

  function handleAdd(e) {
    e.preventDefault();

    const allSongsArray = songList.split(/\r?\n/);

    const allNewSongs = [];
    const allOldSongs = [];

    allSongsArray.forEach((songName) => {
      if (songNames.hasOwnProperty(songName)) {
        allOldSongs.push(songName);
      } else {
        allNewSongs.push(songName);
      }
    })

    const newSongsObj = {}

    allNewSongs.forEach((songName) => {

      const songId = uuid();
      const date = Date.now();
      const titleLower = songName.toLowerCase();

      newSongsObj[`songs.${songId}`] = {
        createdAt: date,
        title: titleLower,
        notes: '',
        songKey: 'random',
        knowledge: 'new',
        sets: {
          [set.id]: set.setName
        },
        id: songId,
      }

      newSongsObj[`songNames.${titleLower}`] = songId;
    })



    const userDoc = doc(db, 'users', user.uid);
    updateDoc(userDoc, {
      ...newSongsObj,
    })
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