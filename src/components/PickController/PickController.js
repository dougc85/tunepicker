import React from "react";
import { useState, useEffect, useContext, useReducer, useRef } from "react";
import SubContext from "../../context/sub-context";
import './PickController.scss';
import MoveControlsPopup from "./MoveControlsPopup/MoveControlsPopup";
import Loading from "../Loading/Loading";
import { onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'
import LibraryMenu from '../generics/LibraryMenu.styled';
import MoveDownAndOut from "./MoveDownAndOut/MoveDownAndOut";

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
  const { user, loading, setLoading, userDoc } = context;
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
  const [keys, setKeys] = useState(['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']);
  const [key, setKey] = useState('');
  const [triggerListKey, setTriggerListKey] = useState(false);
  const [showNoSongs, setShowNoSongs] = useState(false);
  const [showMoveDownAndOut, setShowMoveDownAndOut] = useState(false);

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
      setDoc(setDocRef, mutableRef.current);
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
    const unsubscribeSetDoc = onSnapshot(doc(db, 'users', user.uid, 'sets', userDoc.pickerSet), (firebaseDoc) => {

      const newPickerSet = { ...firebaseDoc.data(), id: userDoc.pickerSet };
      dispatch({ type: 'SET_PICKERS', payload: newPickerSet });
    });

    return () => {
      if (unsubscribeSetDoc) {
        unsubscribeSetDoc();
      }
    }

  }, [user.uid, userDoc.pickerSet]);

  useEffect(() => {
    if (!loading && pickerSet) {

      if (Object.keys(pickerSet.allSongs).length === 0) {
        setShowNoSongs(true);
        return;
      }

      if (tune) {
        pickTune({
          action: 'RESELECT',
        })
        return;


        //!!!!DO THIS!!!!!!
        //Reload the already picked tune into the picker and dispatch to alter the mutablePickerSet appropriately
        //!!!!!Don't forget, when making changes to the database, update the USERDOC FIRST, THEN the set doc


      }



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
    }
  }, [loading, pickerSet]);

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
        console.log('error');
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
      tempKeys = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];
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

  function changeKnowledge(direction) {

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

    updateDoc(userDocRef, {
      [`songs.${tune}.knowledge`]: newKnowledge
    })

    const oldCurrentIndex = mutablePickerSet[knowledgeArrays[oldKnowledge][0]].indexOf(tune);
    const oldFullIndex = mutablePickerSet[knowledgeArrays[oldKnowledge][1]].indexOf(tune);

    if (oldCurrentIndex !== -1) {
      mutablePickerSet[knowledgeArrays[oldKnowledge][0]].splice(oldCurrentIndex, 1);
    }
    mutablePickerSet[knowledgeArrays[oldKnowledge][1]].splice(oldFullIndex, 1);
    mutablePickerSet[knowledgeArrays[newKnowledge][1]].push(tune);

    setDoc(setDocRef, mutablePickerSet);
  }

  function resetPicker() {
    const updatedSet = { ...mutablePickerSet };
    updatedSet.currentNew = pickerSet.fullNew;
    updatedSet.currentMedium = pickerSet.fullMedium;
    updatedSet.currentKnow = pickerSet.fullKnow;

    dispatch({ type: 'RESET_PICKER', payload: updatedSet });
  }

  function capitalize(title) {
    return title.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');
  }

  useEffect(() => {
    if (tune !== '') {
      pickList(choices);
      pickKey();
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
    { text: "Reset Picker", func: resetPicker },
  ]

  if (loading || !mutablePickerSet) {
    return (
      <Loading />
    )
  }

  if (showNoSongs) {
    return (
      <div className="showNoSongs">You don't have any songs yet.  Add some! </div>
    )
  }

  const displayedKey = (allSongs && tune) ?
    (allSongs[tune].songKey === 'random' ? key : allSongs[tune].songKey) :
    null;

  return (
    <div className="PickController" style={{ backgroundColor: listColor }}>
      <div className="picker-info">
        <p>Picking from:</p>
        <p>{userDoc.setNames[userDoc.pickerSet]}</p>
        <LibraryMenu
          items={libraryMenuItems}
        />
      </div>

      <div className="tune-wrapper">
        <p className="tune-name" style={{ fontSize: tuneFontSize }}>{allSongs[tune] && capitalize(allSongs[tune].title)}</p>
      </div>

      <p className="key">{displayedKey}</p>

      <button className="next-button" onClick={nextHandler} >NEXT</button>

      <div className="small-buttons-wrapper">
        <button className="skip-button small-btn" onClick={skipHandler}>SKIP</button>
        <button className="raise-button small-btn" onClick={raiseKnowledge} >&uarr;</button>
        <button className="lower-button small-btn" onClick={lowerKnowledge}>&darr;</button>
      </div>
      {showMoveDownAndOut &&
        <MoveDownAndOut
          setShowMoveDownAndOut={setShowMoveDownAndOut}
          songId={tune}
          title={allSongs[tune].title}
          setTune={setTune}
          capitalize={capitalize}
          knowledgeArrays={knowledgeArrays} />}
      <MoveControlsPopup />
    </div>
  )
}

export default PickController;