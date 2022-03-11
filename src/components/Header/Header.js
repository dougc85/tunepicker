import React from "react";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import './Header.scss';
import MenuButton from "./MenuButton/MenuButton";
import Nav from './Nav/Nav';

function Header(props) {

  const [showNav, setShowNav] = useState(false);
  const { user } = props;
  const navigate = useNavigate();

  function toggleNav() {
    setShowNav((current) => !current);
  }

  return (
    <div className="Header-container">
      <header className="Header">
        <h1 className="app-name">tunePicker</h1>
        {showNav && <Nav toggleNav={toggleNav} />}
        <MenuButton toggleNav={toggleNav} />
      </header>
      <Outlet />
    </div>

  )
}

export default Header;