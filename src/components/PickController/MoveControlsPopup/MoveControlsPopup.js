import React from "react";
import './MoveControlsPopup.scss';

function MoveControlsPopup() {
  return (
    <div className="MoveControlsPopup">
      <div className="popup-background"></div>
      <div className="level-change-popup">
        <p className="warning">
          Are you sure you want to move this song up to the 'know' level?
        </p>
        <div className="warning-buttons">
          <button className="cancel">Cancel</button>
          <button className="confirm">Confirm</button>
          <button className="okay">Okay</button>
        </div>
      </div>
    </div>
  )
}

export default MoveControlsPopup;