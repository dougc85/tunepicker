import React from "react";
import { MenuButtonStyled } from "./MenuButton.styled";

function MenuButton(props) {

  const { toggleNav, quickForward, navAccess, navMenuArrow } = props;

  function handleClick() {
    if (navAccess) {
      toggleNav();
      if (quickForward) {
        quickForward();
      }
    }
  }

  return (
    <MenuButtonStyled onClick={handleClick}>
      <span />
      <span />
      <span />
      {navMenuArrow ? navMenuArrow : null}
    </MenuButtonStyled>
  )
}

export default MenuButton;