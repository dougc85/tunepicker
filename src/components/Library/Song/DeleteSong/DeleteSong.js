import React, { useContext } from 'react';
import SubContext from '../../../../context/sub-context';
import { db } from '../../../../firebaseConfig'
import { DeleteSongStyled } from './DeleteSong.styled';
import Modal from '../../../generics/Modal.styled';
import AddButton from '../../../generics/AddButton.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayRemove, deleteField } from 'firebase/firestore';

function DeleteSong(props) {

  const { song, knowledgeArrays, setShowDeleteSong } = props;
  const { user, userDoc } = useContext(SubContext);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const setId =
    (path.slice(9, 17) === 'allsongs') ?
      null :
      path.slice(14, (path.indexOf('/', 14)));


  const contentConfig =
    (path.slice(9, 17) === 'allsongs') ?
      {
        modalHeight: '17rem',
        showSetRemoval: false,
      } :
      {
        modalHeight: '22rem',
        showSetRemoval: true,
        setName: userDoc.setNames[setId],
      }


  function hideDeleteSong(e) {
    if (e) {
      e.preventDefault();

      setShowDeleteSong(false);
    }
  }

  function removeFromSet(e) {
    hideDeleteSong(e)

    let userDocRef = doc(db, 'users', user.uid);
    let setDocRef = doc(db, 'users', user.uid, 'sets', setId);

    try {
      updateDoc(userDocRef, {
        [`songs.${song.id}.sets.${setId}`]: deleteField(),
      })

      updateDoc(setDocRef, {
        [`allSongs.${song.id}`]: deleteField(),
        [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.id),
        [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.id),
      });
    }
    catch (error) {
      console.log(error);
    }

    navigate(`/library/sets/${setId}`);
  }

  function deleteFromLibrary(e) {
    hideDeleteSong(e)
  }



  return (
    <Modal handleOutsideClick={hideDeleteSong} contentHeight={contentConfig.modalHeight}>
      <DeleteSongStyled>
        <h3>Delete Song</h3>
        <div>
          {contentConfig.showSetRemoval && <AddButton onClick={removeFromSet}>Remove Song From {contentConfig.setName}</AddButton>}
          <div>
            <AddButton onClick={deleteFromLibrary}>Delete Song From Library</AddButton>
            <p>**Note that this will also delete the song from ALL sets in which it may be found</p>
          </div>
          <AddButton onClick={hideDeleteSong}>Cancel</AddButton>
        </div>

      </DeleteSongStyled>
    </Modal >
  )
}

export default DeleteSong;