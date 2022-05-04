import React from "react";
import { useState, useEffect, useContext } from "react";
import SubContext from "../../context/sub-context";
import './PickController.scss';
import MoveControlsPopup from "./MoveControlsPopup/MoveControlsPopup";
import Loading from "../Loading/Loading";

function PickController() {

  const context = useContext(SubContext);
  const { pickerSet, setPickerSet, loading, userDoc } = context;
  const allSongs = (userDoc) ? userDoc.songs : undefined;

  const ORANGE = 'hsl(26, 100%, 67%)';
  const YELLOW = 'hsl(54, 98%, 66%)';
  const EMERALD = 'hsl(145, 63%, 50%)';

  // const [newList, setNewList] = useListModifier([...tuneData.newList]);
  // const [medList, setMedList] = useListModifier([...tuneData.medList]);
  // const [knowList, setKnowList] = useListModifier([...tuneData.knowList]);
  const [initialList, setInitialList] = useState('');
  const [currentList, setCurrentList] = useState('');
  const [oldList, setOldList] = useState('');
  const [choices, setChoices] = useState(['new', 'new', 'new', 'med', 'med', 'know']);
  const [keys, setKeys] = useState(['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']);
  const [key, setKey] = useState('');
  const [tune, setTune] = useState('');
  const [triggerListKey, setTriggerListKey] = useState(false);

  const [showNoSongs, setShowNoSongs] = useState(false);

  useEffect(() => {
    if (pickerSet) {

      if (Object.keys(pickerSet.allSongs).length === 0) {
        setShowNoSongs(true);
        return;
      }
      if (pickerSet.currentNew.length !== 0) {
        setInitialList('new');
      } else if (pickerSet.currentMedium.length !== 0) {
        setInitialList('med');
      } else {
        setInitialList('know');
      }
    }
  }, [loading]);

  useEffect(() => {
    if (initialList) {
      pickTune(initialList);
    }
  }, [initialList])

  function pickList(choices) {
    let choicesTemp = choices;

    if (pickerSet.currentNew.length === 0 && pickerSet.currentMedium.length === 0) {
      if (pickerSet.currentKnow.length === 0) {
        if (pickerSet.fullKnow.length === 0) {
          const updatedSet = { ...pickerSet };
          updatedSet.currentNew = [...pickerSet.fullNew];
          updatedSet.currentMedium = [...pickerSet.fullMedium];
          setOldList(currentList);
          if (pickerSet.fullNew.length > 0) {
            setCurrentList('new');
          } else {
            setCurrentList('med');
          }
          setPickerSet(updatedSet);
          return;
        }
        const updatedSet = { ...pickerSet };
        updatedSet.currentKnow = [...pickerSet.fullKnow];
        setOldList(currentList);
        setCurrentList('know');
        setPickerSet(updatedSet);
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
        if (pickerSet.currentNew.length === 0) {
          return pickList(choicesTemp);
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('new');
        return;
      case 'med':
        if (pickerSet.currentMedium.length === 0) {
          return pickList(choicesTemp);
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('med');
        return;
      case 'know':
        if (pickerSet.currentKnow.length === 0) {
          //If there are no songs marked 'know' but there are songs in the other knowledge categories
          if (pickerSet.fullKnow.length === 0) {
            return pickList(choicesTemp);
          }

          //If user is done with 'new' and 'med' and needs to recycle 'know'ç
          if (pickerSet.currentNew.length === 0 && pickerSet.currentMedium.length === 0) {
            setChoices(choicesTemp);
            setOldList(currentList);
            setCurrentList('know');
            const updatedSet = { ...pickerSet };
            updatedSet.currentKnow = pickerSet.fullKnow;
            setPickerSet(updatedSet);
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
    const updatedSet = { ...pickerSet };
    updatedSet[currentKnowledgeArray] = newArray;
    setPickerSet(updatedSet);
  }

  function pickTune(listToPickFrom) {

    const current = (listToPickFrom === 'new') ?
      { list: pickerSet.currentNew, name: 'currentNew' } :
      (listToPickFrom === 'med') ?
        { list: pickerSet.currentMedium, name: 'currentMedium' } :
        { list: pickerSet.currentKnow, name: 'currentKnow' };
    const choicePosition = Math.floor(Math.random() * current.list.length);
    const choice = current.list[choicePosition];

    const updatedList = [...current.list];
    updatedList.splice(choicePosition, 1);
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
    pickTune(currentList);
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

  if (loading) {
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