import React, { useContext } from 'react';
import SubContext from '../../../../context/sub-context';
import { db } from '../../../../firebaseConfig'
import { DeleteSongStyled } from './DeleteSong.styled';
import Modal from '../../../generics/Modal.styled';
import AddButton from '../../../generics/AddButton.styled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, updateDoc, arrayRemove, deleteField } from 'firebase/firestore';
import capitalize from '../../../../helperFunctions/capitalize';

function DeleteSong(props) {

  const { song, knowledgeArrays, setShowRemoveSong, forPicker, initialPick, removeOnly, dispatch, setLocalLoading } = props;
  let { setShowDeleteSong } = props;

  if (setShowRemoveSong) {
    setShowDeleteSong = setShowRemoveSong;
  }

  const { user, userDoc } = useContext(SubContext);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const path = location.pathname;

  const atAllSongs = path.slice(9, 17) === 'allsongs';

  const setId =
    atAllSongs ?
      null :
      forPicker ?
        userDoc.pickerSet :
        path.slice(14, (path.indexOf('/', 14)));


  const contentConfig =
    (atAllSongs || (forPicker && !removeOnly)) ?
      {
        modalHeight: '17rem',
        showSetRemoval: false,
      } :
      {
        modalHeight: (forPicker ? '14rem' : '22rem'),
        showSetRemoval: true,
        setName: userDoc.setNames[setId],
      }

  function hideDeleteSong(e) {
    if (e) {
      e.preventDefault();
    }
    setShowDeleteSong(false);
  }

  async function removeFromSet(e) {
    hideDeleteSong(e)
    if (setLocalLoading) {
      setLocalLoading(true);
    }

    let userDocRef = doc(db, 'users', user.uid);
    let setDocRef = doc(db, 'users', user.uid, 'sets', setId);

    try {
      const userPromise = updateDoc(userDocRef, {
        [`songs.${song.id}.sets.${setId}`]: deleteField(),
      })

      const setPromise = updateDoc(setDocRef, {
        [`allSongs.${song.id}`]: deleteField(),
        [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.id),
        [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.id),
      });

      await Promise.all([userPromise, setPromise]);
    }
    catch (error) {
      console.log(error);
    }

    if (forPicker) {
      dispatch({ type: 'SET_TUNE', payload: '' });
      setLocalLoading(false);
      return;
    } else {
      navigate(`/library/sets/${setId}`);
    }
  }

  async function deleteFromLibrary(e) {
    hideDeleteSong(e)
    if (forPicker) {
      setLocalLoading(true);
      initialPick();
    }

    let userDocRef = doc(db, 'users', user.uid);
    const setIds = Object.keys(song.sets);
    const setDocRefs = setIds.map((id) => doc(db, 'users', user.uid, 'sets', id));

    try {
      const setPromises = [];

      setDocRefs.forEach((setDocRef) => {
        const setPromise = updateDoc(setDocRef, {
          [`allSongs.${song.id}`]: deleteField(),
          [knowledgeArrays[song.knowledge][0]]: arrayRemove(song.id),
          [knowledgeArrays[song.knowledge][1]]: arrayRemove(song.id),
        })
        setPromises.push(setPromise);
      })

      const userPromise = updateDoc(userDocRef, {
        [`songs.${song.id}`]: deleteField(),
        [`songNames.${song.title}`]: deleteField(),
      });

      await Promise.all([userPromise, ...setPromises]);


      if (forPicker) {
        setLocalLoading(false);
        return;
      }

      if (atAllSongs) {
        navigate('/library/allsongs');
      } else {
        navigate(`/library/sets/${params.setId}`);
      }

    }
    catch (error) {
      console.log(error.message);
    }
  }



  return (
    <Modal handleOutsideClick={hideDeleteSong} contentHeight={contentConfig.modalHeight}>
      <DeleteSongStyled>
        <h3>Delete Song</h3>
        <div>
          {contentConfig.showSetRemoval && <AddButton onClick={removeFromSet}>Remove song from '{capitalize(contentConfig.setName)}'</AddButton>}
          {!removeOnly && <div>
            <AddButton onClick={deleteFromLibrary}>Delete Song From Library</AddButton>
            <p>**Note that this will also delete the song from ALL sets in which it may be found</p>
          </div>}
          <AddButton onClick={hideDeleteSong}>Cancel</AddButton>
        </div>

      </DeleteSongStyled>
    </Modal >
  )
}

export default DeleteSong;