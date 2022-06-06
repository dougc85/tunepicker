import React from "react";
import { useState, useEffect, useContext, useReducer } from "react";
import SubContext from "../../context/sub-context";
import './PickController.scss';
import MoveControlsPopup from "./MoveControlsPopup/MoveControlsPopup";
import Loading from "../Loading/Loading";
import { onSnapshot, doc, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebaseConfig'

const pickerReducer = (state, action) => {
  if (action.type === 'SET_PICKERS') {
    return {
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
}

const pickerInitialValues = {
  pickerSet: undefined,
  mutablePickerSet: undefined,
}

function PickController() {

  const context = useContext(SubContext);
  const { user, loading, setLoading, userDoc } = context;
  const allSongs = userDoc.songs;


  const ORANGE = 'hsl(26, 100%, 67%)';
  const YELLOW = 'hsl(54, 98%, 66%)';
  const EMERALD = 'hsl(145, 63%, 50%)';

  // const [newList, setNewList] = useListModifier([...tuneData.newList]);
  // const [medList, setMedList] = useListModifier([...tuneData.medList]);
  // const [knowList, setKnowList] = useListModifier([...tuneData.knowList]);


  const [currentList, setCurrentList] = useState('');
  const [oldList, setOldList] = useState('');
  const [choices, setChoices] = useState(['new', 'new', 'new', 'med', 'med', 'know']);
  const [keys, setKeys] = useState(['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']);
  const [key, setKey] = useState('');
  const [tune, setTune] = useState('');
  const [triggerListKey, setTriggerListKey] = useState(false);
  const [showNoSongs, setShowNoSongs] = useState(false);

  const [state, dispatch] = useReducer(pickerReducer, pickerInitialValues);
  const { pickerSet, mutablePickerSet } = state;

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


        //!!!!DO THIS!!!!!!
        //Reload the already picked tune into the picker and dispatch to alter the mutablePickerSet appropriately
        //!!!!!Don't forget, when making changes to the database, update the USERDOC FIRST, THEN the set doc


      } else if (pickerSet.currentNew.length !== 0) {
        pickTune({
          action: 'NEW_TUNE',
          knowledge: 'new'
        });
      } else if (pickerSet.currentMedium.length !== 0) {
        pickTune({
          action: 'NEW_TUNE',
          knowledge: 'med'
        });
      } else {
        pickTune({
          action: 'NEW_TUNE',
          knowledge: 'know'
        });
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

  function setCurrentKnowledge(currentKnowledgeArray, newArray) {
    const updatedSet = { ...mutablePickerSet };
    updatedSet[currentKnowledgeArray] = newArray;
    dispatch({ type: 'SET_MUTABLE', payload: updatedSet });
  }

  function pickTune(actionObject) {

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
    } else if (actionObject.action === 'RESELECT') {
      choice = tune;  //This is a song ID




    }

    setCurrentKnowledge(current.name, updatedList);
    setTune(choice);
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

  function capitalizeTitle(title) {
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

  return (
    <div className="PickController" style={{ backgroundColor: listColor }}>
      <div className="tune-wrapper">
        <p className="tune-name" style={{ fontSize: tuneFontSize }}>{allSongs[tune] && capitalizeTitle(allSongs[tune].title)}</p>
      </div>

      <p className="key">{key}</p>

      <button className="next-button" onClick={nextHandler} >NEXT</button>

      <div className="small-buttons-wrapper">
        <button className="skip-button small-btn">SKIP</button>
        <button className="raise-button small-btn">&uarr;</button>
        <button className="lower-button small-btn">&darr;</button>
      </div>
      <MoveControlsPopup />
    </div>
  )
}

export default PickController;