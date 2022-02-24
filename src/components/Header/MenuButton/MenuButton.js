import React from "react";
import './MenuButton.scss';

function MenuButton(props) {
  return (
    <div className="MenuButton" onClick={props.toggleNav}>
      <div className="MenuButton-line"></div>
      <div className="MenuButton-line"></div>
      <div className="MenuButton-line"></div>
    </div>
  )
}

export default MenuButton;