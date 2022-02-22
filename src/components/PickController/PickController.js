import React from "react";
import './PickController.scss';
import MoveControlsPopup from "./MoveControlsPopup/MoveControlsPopup";
import tuneData from '../../data/tuneData';

function PickController() {

  const ORANGE = 'hsl(26, 100%, 67%)';
  const YELLOW = 'hsl(54, 98%, 66%)';
  const EMERALD = 'hsl(145, 63%, 50%)';

  let listColor = EMERALD;

  function nextHandler() {
    return;
  }

  return (
    <div className="PickController" style={{ backgroundColor: listColor }}>
      <div className="tune-wrapper">
        <p className="tune-name">{ }</p>
      </div>

      <p className="key">{ }</p>

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




// function nextHandler() {

  //   const newList = picker.chooseList();
  //   const newTune = picker.pickTune();
  //   const newKey = picker.pickKey();

  //   setList(newList);

  //   if (newTune.length > 20) {
  //     setTuneSize("4rem");
  //   } else if (newTune.length > 9) {
  //     setTuneSize("4.6rem");
  //   } else if (newTune.length > 7) {
  //     setTuneSize("5.3rem");
  //   } else if (newTune.length > 5) {
  //     setTuneSize("6.5rem");
  //   } else {
  //     setTuneSize("7.5rem");
  //   }

  //   setTuneName(newTune);
  //   setKey(newKey);
  // }