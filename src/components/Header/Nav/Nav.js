import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { NavStyled, Screen } from './Nav.styled';
import { useNavigate } from 'react-router-dom';


function Nav(props) {

  const { toggleNav } = props;

  const navigate = useNavigate();

  async function handleLogOut() {
    toggleNav();
    navigate('/welcome');
    try {
      await signOut(auth)
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Screen onClick={toggleNav} />
      <NavStyled>
        <ul>
          <li onClick={toggleNav}><Link to='/controller'>Picker</Link></li>
          <li onClick={toggleNav}><Link to='/library'>Library</Link></li>
          <li onClick={toggleNav}><Link to='/tunesiwanttolearn'>Tunes To Learn</Link></li>
          <li onClick={toggleNav}><Link to='/help'>Help</Link></li>
          <li onClick={toggleNav}><Link to='/settings'>Settings</Link></li>
          <li onClick={toggleNav}><Link to='/contact'>Contact Us</Link></li>
          <li onClick={handleLogOut}>Log Out</li>
        </ul>
      </NavStyled>
    </>
  )
}

export default Nav;