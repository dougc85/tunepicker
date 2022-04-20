import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { React } from 'react';
import { v4 as uuid } from 'uuid';
import { db } from '../../firebaseConfig';
import useFormInput from '../../hooks/useFormInput';
import './AddMultiple.scss';
import Modal from '../generics/Modal.styled';

function AddMultiple(props) {

  const { set, setShowAddMultiple, songNames, user, allSongs } = props;

  const [songList, handleSongListChange, resetSongList] = useFormInput('');



  function handleCancel(e) {
    e.preventDefault();

    resetSongList();
    setShowAddMultiple(false);
  }

  function handleAdd(e) {
    e.preventDefault();

    let allSongsArray = songList.split(/\r?\n/);

    allSongsArray = allSongsArray.map((songName) => {
      let songCharArray = songName.trim().split('');
      songCharArray = songCharArray.map((char, index) => {
        if (char === '~' || char === '*' || char === '/' || char === '[' || char === ']') {
          return '•';
        }
        return char;
      })
      return songCharArray.join('');
    })

    const allNewSongs = [];
    const allOldSongs = [];

    allSongsArray.forEach((songName) => {
      const titleLower = songName.toLowerCase();
      if (songName.length === 0) {

      } else if (songNames.hasOwnProperty(titleLower)) {
        allOldSongs.push(titleLower);
      } else {
        allNewSongs.push(titleLower);
      }
    })

    const newSongsObj = {};
    const oldSongsObj = {};

    const newSongsInSet = {};

    const songIdsForSetlists = [];

    allNewSongs.forEach((songName) => {
      const songId = uuid();
      const date = Date.now();
      newSongsObj[`songs.${songId}`] = {
        createdAt: date,
        title: songName,
        notes: '',
        songKey: 'random',
        knowledge: 'new',
        sets: {
          [set.id]: set.setName
        },
        id: songId,
      }
      newSongsObj[`songNames.${songName}`] = songId;

      newSongsInSet[`allSongs.${songId}`] = null;
      songIdsForSetlists.push(songId);
    })

    allOldSongs.forEach((songName) => {
      const songId = songNames[songName];
      const oldSongObj = allSongs[songId];
      oldSongObj["sets"][set.id] = set.setName;
      oldSongsObj[`songs.${songId}`] = oldSongObj;

      if (!set.allSongs.hasOwnProperty(songId)) {
        newSongsInSet[`allSongs.${songId}`] = null;
        songIdsForSetlists.push(songId);
      }
    })

    //update userDoc

    const userDoc = doc(db, 'users', user.uid);
    updateDoc(userDoc, {
      ...newSongsObj,
      ...oldSongsObj,
    })

    //Update Set doc

    newSongsInSet[`currentNew`] = arrayUnion(...songIdsForSetlists);
    newSongsInSet[`fullNew`] = arrayUnion(...songIdsForSetlists);

    const setDoc = doc(db, 'users', user.uid, 'sets', set.id);
    updateDoc(setDoc, {
      ...newSongsInSet,
    })
  }

  return (
    <div className="AddMultiple">
      <Modal showModal={setShowAddMultiple} reset={resetSongList} >
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
            Songs cannot use the following characters: ~, *, /, [, or ]
          </p>
          <textarea name="" id="" cols="30" rows="10" className="AddMultiple-form-textarea" value={songList} onChange={handleSongListChange}></textarea>
          <div className="AddMultiple-form-buttons">
            <button onClick={handleCancel} className="AddMultiple-form-cancel">Cancel</button>
            <button onClick={handleAdd} className="AddMultiple-form-add">Add Songs</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddMultiple;