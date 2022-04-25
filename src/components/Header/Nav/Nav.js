import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { NavStyled } from './Nav.styled';

function Nav(props) {

  const { toggleNav } = props;

  function handleLogOut() {
    signOut(auth).then(() => {

    })
      .catch((err) => {
        console.log(err.message);
      })
  }

  return (
    <NavStyled>
      <ul>
        <li onClick={toggleNav}><Link to='/controller'>Picker</Link></li>
        <li onClick={toggleNav}><Link to='/library'>Library</Link></li>
        <li>Link 3</li>
        <li onClick={handleLogOut}>Log Out</li>
      </ul>
    </NavStyled>
  )
}

export default Nav;