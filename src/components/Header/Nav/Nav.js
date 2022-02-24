import React from 'react';
import './Nav.scss';

function Nav() {
  return (
    <nav className="Nav">
      <ul className="Nav-links">
        <li className="Nav-links-link item1">Link 1</li>
        <li className="Nav-links-link item2">Link 2</li>
        <li className="Nav-links-link item3">Link 3</li>
      </ul>
    </nav>
  )
}

export default Nav;