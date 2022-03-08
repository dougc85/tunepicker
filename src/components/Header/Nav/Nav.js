import React from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

function Nav() {

  function handleLogOut() {
    signOut(auth).then(() => {

    })
      .catch((err) => {
        console.log(err.message);
      })
  }

  return (
    <nav className="Nav">
      <ul className="Nav-links">
        <li className="Nav-links-link item1"><Link to='/controller'>Picker</Link></li>
        <li className="Nav-links-link item2"><Link to='/library'>Library</Link></li>
        <li className="Nav-links-link item3">Link 3</li>
        <li className="Nav-links-link" onClick={handleLogOut}>Log Out</li>
      </ul>
    </nav>
  )
}

export default Nav;