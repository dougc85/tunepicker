import React from "react";
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import MenuButton from "./MenuButton/MenuButton";
import Nav from './Nav/Nav';
import { HeaderStyled, SiteContent } from "./Header.styled";

function Header(props) {

  const [showNav, setShowNav] = useState(false);
  const { quick } = props;

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
      <SiteContent>
        {quick ? props.children : <Outlet />}
      </SiteContent>

    </>
  )
}

export default Header;