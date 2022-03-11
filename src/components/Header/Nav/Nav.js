import React from 'react';
import './Nav.scss';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

function Nav(props) {

  const { toggleNav } = props;
  const navigate = useNavigate();

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
        <li className="Nav-links-link item1" onClick={toggleNav}><Link to='/controller'>Picker</Link></li>
        <li className="Nav-links-link item2" onClick={toggleNav}><Link to='/library'>Library</Link></li>
        <li className="Nav-links-link item3">Link 3</li>
        <li className="Nav-links-link" onClick={handleLogOut}>Log Out</li>
      </ul>
    </nav>
  )
}

export default Nav;