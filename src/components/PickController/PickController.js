import React from "react";
import { useState, useEffect, useContext, useReducer, useRef } from "react";
import SubContext from "../../context/sub-context";
import { PickControllerStyled, PickerInfo, PickingFrom, PickerMenu, TuneWrapper, SmallButtons, NextButton, NotesButton } from './PickController.styled';
import Loading from "../Loading/Loading";
import { onSnapshot, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebaseConfig'
import LibraryMenu from '../generics/LibraryMenu.styled';
import MoveDownAndOut from "./MoveDownAndOut/MoveDownAndOut";
import EditTitle from "./EditTitle/EditTitle";
import EditKey from "./EditKey/EditKey";
import Path from "../Library/Path/Path";
import DeleteSong from "../Library/Song/DeleteSong/DeleteSong";
import Notes from "./Notes/Notes";
import capitalize from "../../helperFunctions/capitalize";

const pickerReducer = (state, action) => {
  if (action.type === 'SET_PICKERS') {
    return {
      ...state,
      pickerSet: action.payload,
      mutablePickerSet: action.payload,
    }
  }
  if (action.type === 'SET_MUTABLE') {
    return {
      ...state,
      mutablePickerSet: action.payload,
    }
  }
  if (action.type === 'RESET_PICKER') {
    return {
      ...state,
      pickerSet: action.payload,
      mutablePickerSet: action.payload,
      tune: '',
    }
  }
  if (action.type === 'SET_TUNE') {
    return {
      ...state,
      tune: action.payload,
    }
  }
}

const pickerInitialValues = {
  pickerSet: undefined,
  mutablePickerSet: undefined,
  tune: '',
}

function PickController() {

  const context = useContext(SubContext);
  const { user, loading, userDoc, handleNetworkError } = context;
  const allSongs = userDoc.songs;


  const ORANGE = 'hsl(26, 100%, 67%)';
  const YELLOW = 'hsl(54, 98%, 66%)';
  const EMERALD = 'hsl(145, 63%, 50%)';

  const knowledgeArrays = {
    know: ['currentKnow', 'fullKnow'],
    med: ['currentMedium', 'fullMedium'],
    new: ['currentNew', 'fullNew']
  }

  // const [newList, setNewList] = useListModifier([...tuneData.newList]);
  // const [medList, setMedList] = useListModifier([...tuneData.medList]);
  // const [knowList, setKnowList] = useListModifier([...tuneData.knowList]);


  const [currentList, setCurrentList] = useState('');
  const [oldList, setOldList] = useState('');
  const [choices, setChoices] = useState(['new', 'new', 'new', 'med', 'med', 'know']);
  const [keys, setKeys] = useState(['C', 'D\u266D', 'D', 'E\u266D', 'E', 'F', 'F\u266F', 'G', 'A\u266D', 'A', 'B\u266D', 'B']);
  const [key, setKey] = useState('');
  const [triggerListKey, setTriggerListKey] = useState(false);
  const [showNoSongs, setShowNoSongs] = useState(false);
  const [showMoveDownAndOut, setShowMoveDownAndOut] = useState(false);
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showEditKey, setShowEditKey] = useState(false);
  const [showDeleteSong, setShowDeleteSong] = useState(false);
  const [showRemoveSong, setShowRemoveSong] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const [state, dispatch] = useReducer(pickerReducer, pickerInitialValues);
  const { pickerSet, mutablePickerSet, tune } = state;
  const mutableRef = useRef(mutablePickerSet);
  const setTune = (newTune) => {
    dispatch({ type: 'SET_TUNE', payload: newTune });
  }

  useEffect(() => {
    mutableRef.current = mutablePickerSet;
  }, [mutablePickerSet]);


  //Cleanup on dismount
  useEffect(() => {

    function writeToDB() {

      const userDocRef = doc(db, 'users', user.uid);
      const setDocRef = doc(userDocRef, 'sets', userDoc.pickerSet);
      try {
        setDoc(setDocRef, mutableRef.current);
      } catch (error) {
        handleNetworkError(error.message);
      }


      //Write to localStorage to ensure doc gets set, even on page refresh
      const currentDate = new Date();
      const timestamp = currentDate.getTime();

      const refreshObject = {
        time: timestamp,
        set: mutableRef.current,
        user: user.uid,
      }
      localStorage.setItem('forRefresh', JSON.stringify(refreshObject));
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        writeToDB();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (user.uid && userDoc.pickerSet) {
        writeToDB();
      }
    }
  }, [user.uid, userDoc.pickerSet]);


  useEffect(() => {
    if (!user.uid || !userDoc.pickerSet) {
      return;
    }

    let unsubscribeSetDoc;

    try {
      unsubscribeSetDoc = onSnapshot(doc(db, 'users', user.uid, 'sets', userDoc.pickerSet), (firebaseDoc) => {

        const newPickerSet = { ...firebaseDoc.data(), id: userDoc.pickerSet };
        dispatch({ type: 'SET_PICKERS', payload: newPickerSet });
        pickKey();
      });
    } catch (error) {
      handleNetworkError(error.message);
    }



    //On test to see if page has been reloaded within last 5 seconds; if so, save current pickerSet status to database
    let forRefresh = localStorage.getItem('forRefresh');
    if (forRefresh) {

      forRefresh = JSON.parse(forRefresh);

      if (forRefresh.set.setName === userDoc.setNames[userDoc.pickerSet] && forRefresh.user === user.uid) {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();

        if ((timestamp - forRefresh.time) < 5000) {
          const userDocRef = doc(db, 'users', user.uid);
          const setDocRef = doc(userDocRef, 'sets', userDoc.pickerSet);
          try {
            setDoc(setDocRef, forRefresh.set);
          } catch (error) {
            handleNetworkError(error.message);
          }

        }
      }

      localStorage.clear();
    }

    return () => {
      if (unsubscribeSetDoc) {
        unsubscribeSetDoc();
      }
    }

  }, [user.uid, userDoc.pickerSet]);

  function initialPick() {
    if (pickerSet.currentNew.length !== 0) {
      pickTune({
        action: 'NEW_TUNE',
        knowledge: 'new'
      });
    } else if (pickerSet.currentMedium.length !== 0) {
      pickTune({
        action: 'NEW_TUNE',
        knowledge: 'med'
      });
    } else if (pickerSet.currentKnow.length !== 0) {
      pickTune({
        action: 'NEW_TUNE',
        knowledge: 'know'
      });
    } else {
      resetPicker();
    }
    pickKey();
  }

  useEffect(() => {
    if (!loading && !localLoading && pickerSet) {

      if (Object.keys(pickerSet.allSongs).length === 0) {
        setShowNoSongs(true);
        return;
      }

      if (tune) {
        pickTune({
          action: 'RESELECT',
        })
        pickKey();
        return;
      }

      initialPick();
    }
  }, [loading, localLoading, pickerSet]);

  function pickList(choices) {
    let choicesTemp = choices;

    if (mutablePickerSet.currentNew.length === 0 && mutablePickerSet.currentMedium.length === 0) {
      if (mutablePickerSet.currentKnow.length === 0) {
        if (mutablePickerSet.fullKnow.length === 0) {
          const updatedSet = { ...mutablePickerSet };
          updatedSet.currentNew = [...mutablePickerSet.fullNew];
          updatedSet.currentMedium = [...mutablePickerSet.fullMedium];
          setOldList(currentList);
          if (mutablePickerSet.fullNew.length > 0) {
            setCurrentList('new');
          } else {
            setCurrentList('med');
          }
          dispatch({ type: 'SET_MUTABLE', payload: updatedSet });
          return;
        }
        const updatedSet = { ...mutablePickerSet };
        updatedSet.currentKnow = [...mutablePickerSet.fullKnow];
        setOldList(currentList);
        setCurrentList('know');
        dispatch({ type: 'SET_MUTABLE', payload: updatedSet });
        return;
      }
      setOldList(currentList);
      setCurrentList('know');
      return;
    }

    //Reset choices if necessary
    if (choicesTemp.length === 0) {
      choicesTemp = ['new', 'new', 'new', 'med', 'med', 'know'];
    }

    const choicePosition = Math.floor(Math.random() * choicesTemp.length);
    const choice = choicesTemp[choicePosition];
    choicesTemp.splice(choicePosition, 1);

    switch (choice) {
      case 'new':
        if (mutablePickerSet.currentNew.length === 0) {
          return pickList(choicesTemp);
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('new');
        return;
      case 'med':
        if (mutablePickerSet.currentMedium.length === 0) {
          return pickList(choicesTemp);
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('med');
        return;
      case 'know':
        if (mutablePickerSet.currentKnow.length === 0) {
          //If there are no songs marked 'know' but there are songs in the other knowledge categories
          if (mutablePickerSet.fullKnow.length === 0) {
            return pickList(choicesTemp);
          }

          //If user is done with 'new' and 'med' and needs to recycle 'know'ç
          if (mutablePickerSet.currentNew.length === 0 && mutablePickerSet.currentMedium.length === 0) {
            setChoices(choicesTemp);
            setOldList(currentList);
            setCurrentList('know');
            const updatedSet = { ...mutablePickerSet };
            updatedSet.currentKnow = [...mutablePickerSet.fullKnow];
            dispatch({ type: 'SET_MUTABLE', payload: updatedSet });
            return;
          }
          //If there are still 'new' and 'med' songs to be picked from current
          return pickList(choicesTemp);
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('know');
        return;
      default:
        handleNetworkError("Picker coding error");
    }
  }

  function setCurrentKnowledge(currentKnowledgeArray, newArray, forSkip) {
    const updatedSet = { ...mutablePickerSet };
    updatedSet[currentKnowledgeArray] = newArray;
    //Added this forSkip code to deal with async nature of setting state
    if (forSkip) {
      if (updatedSet[knowledgeArrays[forSkip.oldList][0]].indexOf(forSkip.tune) === -1) {
        updatedSet[knowledgeArrays[forSkip.oldList][0]].push(forSkip.tune);
      }
    }
    dispatch({ type: 'SET_MUTABLE', payload: updatedSet });
  }

  function pickTune(actionObject, forSkip) {

    let current;
    let choice;
    let choicePosition;
    let updatedList;

    if (actionObject.action === 'NEW_TUNE') {

      current = (actionObject.knowledge === 'new') ?
        { list: mutablePickerSet.currentNew, name: 'currentNew' } :
        (actionObject.knowledge === 'med') ?
          { list: mutablePickerSet.currentMedium, name: 'currentMedium' } :
          { list: mutablePickerSet.currentKnow, name: 'currentKnow' };

      choicePosition = Math.floor(Math.random() * current.list.length);
      choice = current.list[choicePosition];

      updatedList = [...current.list];
      updatedList.splice(choicePosition, 1);

      setCurrentKnowledge(current.name, updatedList, forSkip);
      setTune(choice);
    } else if (actionObject.action === 'RESELECT') {
      choice = tune;
    }

    setTriggerListKey((old) => !old);
    return choice;
  }

  function pickKey() {

    let tempKeys = [...keys];

    if (tempKeys.length === 0) {
      tempKeys = ['C', 'D\u266D', 'D', 'E\u266D', 'E', 'F', 'F\u266F', 'G', 'A\u266D', 'A', 'B\u266D', 'B'];
    }

    const choicePosition = Math.floor(Math.random() * tempKeys.length);
    const choice = tempKeys[choicePosition];
    tempKeys.splice(choicePosition, 1);

    setKeys(tempKeys);
    setKey(choice);
  }

  function nextHandler() {
    pickTune({
      action: 'NEW_TUNE',
      knowledge: currentList
    });
    pickKey();
  }

  function skipHandler() {

    pickTune({
      action: 'NEW_TUNE',
      knowledge: currentList
    }, {
      oldList: allSongs[tune].knowledge,
      tune: tune,
    });
  }


  function raiseKnowledge() {
    changeKnowledge('raise');
  }

  function lowerKnowledge() {
    changeKnowledge('lower');
  }

  async function changeKnowledge(direction) {

    const oldKnowledge = allSongs[tune].knowledge;
    let newKnowledge;

    if (direction === 'raise') {
      if (oldKnowledge === 'know') {
        return;
      }
      newKnowledge = (oldKnowledge === 'new') ? 'med' : 'know';
    } else if (direction === 'lower') {
      if (oldKnowledge === 'new') {
        setShowMoveDownAndOut(true);
        return;
      }
      newKnowledge = (oldKnowledge === 'know') ? 'med' : 'new';
    }

    const userDocRef = doc(db, 'users', user.uid);
    const setDocRef = doc(userDocRef, 'sets', userDoc.pickerSet);

    try {
      const batch = writeBatch(db);
      batch.update(userDocRef, {
        [`songs.${tune}.knowledge`]: newKnowledge
      })

      const oldCurrentIndex = mutablePickerSet[knowledgeArrays[oldKnowledge][0]].indexOf(tune);
      const oldFullIndex = mutablePickerSet[knowledgeArrays[oldKnowledge][1]].indexOf(tune);

      if (oldCurrentIndex !== -1) {
        mutablePickerSet[knowledgeArrays[oldKnowledge][0]].splice(oldCurrentIndex, 1);
      }
      mutablePickerSet[knowledgeArrays[oldKnowledge][1]].splice(oldFullIndex, 1);
      mutablePickerSet[knowledgeArrays[newKnowledge][1]].push(tune);

      batch.set(setDocRef, mutablePickerSet);
      await batch.commit();

    } catch (error) {
      handleNetworkError(error.message);
    }

  }

  function resetPicker() {
    const updatedSet = { ...mutablePickerSet };
    updatedSet.currentNew = pickerSet.fullNew;
    updatedSet.currentMedium = pickerSet.fullMedium;
    updatedSet.currentKnow = pickerSet.fullKnow;

    dispatch({ type: 'RESET_PICKER', payload: updatedSet });
  }

  function newGig() {
    const updatedSet = { ...mutablePickerSet };
    updatedSet.currentNew = pickerSet.fullNew;
    updatedSet.currentMedium = pickerSet.fullMedium;

    dispatch({ type: 'RESET_PICKER', payload: updatedSet });
  }

  function editSongTitle() {
    setShowEditTitle(true);
  }

  function editSongKey() {
    setShowEditKey(true);
  }

  function removeSong() {
    setShowRemoveSong(true);
  }

  function deleteSong() {
    setShowDeleteSong(true);
  }

  useEffect(() => {
    if (tune !== '') {
      pickList(choices);
    }
  }, [triggerListKey]);

  const tuneLength = allSongs ? (allSongs[tune] ?
    allSongs[tune].title.length :
    21) : 21;

  const tuneFontSize =
    (tuneLength > 20) ? "4rem" :
      (tuneLength > 9) ? "4.6rem" :
        (tuneLength > 7) ? "5.3rem" :
          (tuneLength > 5) ? "6.5rem" :
            "7.5rem";

  const listColor = (allSongs && tune) ? ((allSongs[tune].knowledge === "know") ? EMERALD :
    (allSongs[tune].knowledge === "med") ? YELLOW :
      ORANGE) :
    'white';

  const libraryMenuItems = [
    { text: "Start New Gig", func: newGig },
    { text: "Edit Song Title", func: editSongTitle },
    { text: "Edit Song Key", func: editSongKey },
    { text: "Remove Song From Set", func: removeSong },
    { text: "Delete Song From Library", func: deleteSong },
    { text: "Reset Picker", func: resetPicker },
  ]

  if (loading || localLoading || !mutablePickerSet) {
    return (
      <Loading />
    )
  }

  if (showNoSongs) {
    return (
      <div className="showNoSongs">You don't have any songs yet.  Add some! </div>
    )
  }

  let displayedKey;

  if (allSongs && tune) {
    if (allSongs[tune].songKey === 'random') {
      displayedKey = formatKey(key);
    } else {
      displayedKey = formatKey(allSongs[tune].songKey);
    }
  } else {
    displayedKey = null;
  }

  function formatKey(keyValue) {
    if (keyValue.length === 1) {
      return keyValue;
    } else {
      return (
        <>
          {`${keyValue[0]}`}
          <sup>{keyValue[1]}</sup>
        </>
      )
    }
  }

  function handleNotesClick() {
    setShowNotes(true);
  }

  return (
    <PickControllerStyled style={{ backgroundColor: listColor }}>
      <PickerInfo>
        <PickingFrom>
          <p>Picking from:</p>
          <Path heading={capitalize(userDoc.setNames[userDoc.pickerSet])} pathType="Set" setId={userDoc.pickerSet} forPicker />
        </PickingFrom>
        <PickerMenu className="picker-info-menu">
          <p>Menu</p>
          <LibraryMenu
            items={libraryMenuItems}
            color="#3d3d3d"
          />
        </PickerMenu>
      </PickerInfo>
      <TuneWrapper className="tune-wrapper">
        <p className="tune-name" style={{ fontSize: tuneFontSize }}>{allSongs[tune] && capitalize(allSongs[tune].title)}</p>
      </TuneWrapper>

      <p className="key">{displayedKey}</p>

      <NextButton className="next-button" onClick={nextHandler} >NEXT</NextButton>

      <SmallButtons className="small-buttons-wrapper">
        <button className="skip-button small-btn" onClick={skipHandler}>SKIP</button>
        <button className="raise-button small-btn" onClick={raiseKnowledge} >&uarr;</button>
        <button className="lower-button small-btn" onClick={lowerKnowledge}>&darr;</button>
      </SmallButtons>
      <NotesButton onClick={handleNotesClick} className="notes-button">notes</NotesButton>
      {showMoveDownAndOut &&
        <MoveDownAndOut
          setShowMoveDownAndOut={setShowMoveDownAndOut}
          songId={tune}
          title={allSongs[tune].title}
          setTune={setTune}
          knowledgeArrays={knowledgeArrays}
          setLocalLoading={setLocalLoading}
        />}
      {showEditTitle &&
        <EditTitle
          setShowEditTitle={setShowEditTitle}
          songId={tune}
          title={allSongs[tune].title}
        />}
      {showEditKey &&
        <EditKey
          setShowEditKey={setShowEditKey}
          songId={tune}
          songKey={allSongs[tune].songKey}
        />}
      {showDeleteSong &&
        <DeleteSong
          song={allSongs[tune]}
          knowledgeArrays={{
            know: ['currentKnow', 'fullKnow'],
            med: ['currentMedium', 'fullMedium'],
            new: ['currentNew', 'fullNew']
          }}
          setShowDeleteSong={setShowDeleteSong}
          forPicker
          initialPick={initialPick}
          setLocalLoading={setLocalLoading}
        />
      }
      {showRemoveSong &&
        <DeleteSong
          song={allSongs[tune]}
          knowledgeArrays={{
            know: ['currentKnow', 'fullKnow'],
            med: ['currentMedium', 'fullMedium'],
            new: ['currentNew', 'fullNew']
          }}
          setShowRemoveSong={setShowRemoveSong}
          forPicker
          removeOnly
          dispatch={dispatch}
          setLocalLoading={setLocalLoading}
        />
      }
      {showNotes &&
        <Notes
          setShowNotes={setShowNotes}
          notes={allSongs[tune].notes}
        />
      }
    </PickControllerStyled>
  )
}

export default PickController;