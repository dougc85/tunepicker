import React from "react";
import { MenuButtonStyled } from "./MenuButton.styled";

function MenuButton(props) {
  return (
    <MenuButtonStyled onClick={props.toggleNav}>
      <span />
      <span />
      <span />
    </MenuButtonStyled>
  )
}

export default MenuButton;