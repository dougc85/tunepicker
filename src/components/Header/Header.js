import React from "react";
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import MenuButton from "./MenuButton/MenuButton";
import Nav from './Nav/Nav';
import { HeaderStyled } from "./Header.styled";

function Header() {

  const [showNav, setShowNav] = useState(false);

  function toggleNav() {
    setShowNav((current) => !current);
  }

  return (
    <>
      <HeaderStyled>
        <h1>tunePicker</h1>
        {showNav && <Nav toggleNav={toggleNav} />}
        <MenuButton toggleNav={toggleNav} />
      </HeaderStyled>
      <Outlet />
    </>
  )
}

export default Header;