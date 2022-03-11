import React from "react";
import { useState, useEffect } from "react";
import useListModifier from '../../hooks/useListModifier';
import './PickController.scss';
import MoveControlsPopup from "./MoveControlsPopup/MoveControlsPopup";
import tuneData from '../../data/tuneData';

function PickController() {

  const ORANGE = 'hsl(26, 100%, 67%)';
  const YELLOW = 'hsl(54, 98%, 66%)';
  const EMERALD = 'hsl(145, 63%, 50%)';

  //States needed by picker
  const fullKnow = tuneData.fullKnow;
  const [newList, setNewList] = useListModifier([...tuneData.newList]);
  const [medList, setMedList] = useListModifier([...tuneData.medList]);
  const [knowList, setKnowList] = useListModifier([...tuneData.knowList]);
  const [currentList, setCurrentList] = useState("new");
  const [oldList, setOldList] = useState('');
  const [choices, setChoices] = useState(['new', 'new', 'new', 'new', 'med', 'med', 'know']);
  const [keys, setKeys] = useState(['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']);
  const [key, setKey] = useState('');
  const [tune, setTune] = useState('');

  function resetKnowList() {
    setKnowList([...fullKnow]);
  }

  function pickList(choices) {
    console.log('here in pick list');

    let choicesTemp = choices;

    if (newList.length === 0 && medList.length === 0) {

      if (knowList.length === 0) {
        resetKnowList();
        window.localStorage.setItem('tuneStorageKnow', JSON.stringify(fullKnow));
      }
      setOldList(currentList);
      setCurrentList('know');
      return 'know';
    }

    //Reset choices if necessary
    if (choicesTemp.length === 0) {
      choicesTemp = ['new', 'new', 'new', 'new', 'med', 'med', 'know'];
    }

    const choicePosition = Math.floor(Math.random() * choicesTemp.length);
    const choice = choicesTemp[choicePosition];
    choicesTemp.splice(choicePosition, 1);

    switch (choice) {
      case 'new':
        if (newList.length === 0) {
          return pickList(choicesTemp);
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('new');
        return 'new';
      case 'med':
        if (medList.length === 0) {
          return pickList(choicesTemp);
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('med');
        return 'med';
      case 'know':
        if (knowList.length === 0) {
          resetKnowList();
        }
        setChoices(choicesTemp);
        setOldList(currentList);
        setCurrentList('know');
        return 'know';
      default:
        console.log('error');
    }
  }

  function pickTune() {

    const current = (currentList === 'new') ?
      { list: newList, set: setNewList } :
      (currentList === 'med') ?
        { list: medList, set: setMedList } :
        { list: knowList, set: setKnowList };
    const choicePosition = Math.floor(Math.random() * current.list.length);
    const choice = current.list[choicePosition];

    const updatedList = [...current.list];
    updatedList.splice(choicePosition, 1);
    current.set(updatedList);
    setTune(choice);

    return choice;
  }

  useEffect(() => {
    pickTune();
  }, []);


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
    pickTune();
  }

  useEffect(() => {
    if (tune !== '') {
      console.log('after tune');
      pickList(choices);
      pickKey();
    }
  }, [tune]);

  const tuneFontSize = (tune.length > 20) ? "4rem" :
    (tune.length > 9) ? "4.6rem" :
      (tune.length > 7) ? "5.3rem" :
        (tune.length > 5) ? "6.5rem" :
          "7.5rem";

  console.log(oldList);
  const listColor = (oldList === "know") ? EMERALD :
    (oldList === "med") ? YELLOW :
      ORANGE;

  return (
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