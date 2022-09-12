import React from "react";
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import MenuButton from "./MenuButton/MenuButton";
import Nav from './Nav/Nav';
import { HeaderStyled, SiteContent } from "./Header.styled";

function Header(props) {

  const [showNav, setShowNav] = useState(false);
  const {
    hideLibMenu,
    quick,
    quickForward,
    navAccess,
    navMenuArrow,
    libraryArrow,
    pickerArrow,
    singleNavAllowed,
    tunesToLearnArrow,
  } = props;

  function toggleNav() {
    setShowNav((current) => !current);
  }

  return (
    <>
      <HeaderStyled hideLibMenu={hideLibMenu}>
        <div>
          <h1>tunePicker</h1>
          {showNav &&
            <Nav
              toggleNav={toggleNav}
              singleNavAllowed={singleNavAllowed}
              quickForward={(quickForward && !navMenuArrow) ? quickForward : undefined}
              libraryArrow={libraryArrow}
              pickerArrow={pickerArrow}
              tunesToLearnArrow={tunesToLearnArrow}
            />}
          <MenuButton
            navAccess={navAccess}
            toggleNav={toggleNav}
            quickForward={(navMenuArrow ? quickForward : undefined)}
            navMenuArrow={navMenuArrow} />
        </div>
      </HeaderStyled>
      {!hideLibMenu &&
        <SiteContent>
          {quick ? props.children : <Outlet />}
        </SiteContent>
      }
    </>
  )
}

export default Header;