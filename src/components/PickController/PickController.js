import React from "react";
import { useState, useEffect } from "react";
import './PickController.scss';
import MoveControlsPopup from "./MoveControlsPopup/MoveControlsPopup";
import Loading from "../Loading/Loading";

function PickController(props) {

  const { set, setSet, loading, allSongs } = props;

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
    if (set) {

      if (Object.keys(set.allSongs).length === 0) {
        setShowNoSongs(true);
        return;
      }
      if (set.currentNew.length !== 0) {
        setInitialList('new');
      } else if (set.currentMedium.length !== 0) {
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

    if (set.currentNew.length === 0 && set.currentMedium.length === 0) {

      if (set.currentKnow.length === 0) {
        if (set.fullKnow.length === 0) {
          const updatedSet = { ...set };
          updatedSet.currentNew = [...set.fullNew];
          updatedSet.currentMedium = [...set.fullMedium];
          setOldList(currentList);
          if (set.fullNew.length > 0) {
            setCurrentList('new');
          } else {
            setCurrentList('med');
          }
          setSet(updatedSet);
          return;
        }
        const updatedSet = { ...set };
        updatedSet.currentKnow = [...set.fullKnow];
        setOldList(currentList);
        setCurrentList('know');
        setSet(updatedSet);
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
        if (set.currentKnow.length === 0) {
          return pickList(choicesTemp);
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('new');
        return;
      case 'med':
        if (set.currentMedium.length === 0) {
          return pickList(choicesTemp);
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('med');
        return;
      case 'know':
        if (set.currentKnow.length === 0) {
          setChoices(choicesTemp);
          setOldList(currentList);
          setCurrentList('know');
          const updatedSet = { ...set };
          updatedSet.currentKnow = set.fullKnow;
          setSet(updatedSet);
          return;
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
    const updatedSet = { ...set };
    updatedSet[currentKnowledgeArray] = newArray;
    setSet(updatedSet);
  }

  function pickTune(listToPickFrom) {

    const current = (listToPickFrom === 'new') ?
      { list: set.currentNew, name: 'currentNew' } :
      (listToPickFrom === 'med') ?
        { list: set.currentMedium, name: 'currentMedium' } :
        { list: set.currentKnow, name: 'currentKnow' };
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

  useEffect(() => {

    if (tune !== '') {
      pickList(choices);
      pickKey();
    }
  }, [triggerListKey]);

  const tuneFontSize = (tune.length > 20) ? "4rem" :
    (tune.length > 9) ? "4.6rem" :
      (tune.length > 7) ? "5.3rem" :
        (tune.length > 5) ? "6.5rem" :
          "7.5rem";

  const listColor = (allSongs && tune) ? ((allSongs[tune].knowledge === "know") ? EMERALD :
    (allSongs[tune].knowledge === "med") ? YELLOW :
      ORANGE) :
    'white';

  return (
    (loading) ?
      <Loading /> :
      (showNoSongs) ?
        <div className="showNoSongs">You don't have any songs yet.  Add some! </div> :
        <div className="PickController" style={{ backgroundColor: listColor }}>
          <div className="tune-wrapper">
            <p className="tune-name" style={{ fontSize: tuneFontSize }}>{tune}</p>
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