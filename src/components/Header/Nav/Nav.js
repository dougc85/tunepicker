import React, { useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { NavStyled, Screen } from './Nav.styled';
import { useNavigate } from 'react-router-dom';
import { navItems } from '../../../data/navItems';

function Nav(props) {

  const { toggleNav, singleNavAllowed, quickForward, libraryArrow } = props;

  const { handleNetworkError } = useContext(SubContext);

  const navigate = useNavigate();

  async function handleLogOut() {
    toggleNav();
    navigate('/welcome');
    try {
      await signOut(auth)
    }
    catch (error) {
      handleNetworkError(error.message);
    }
  }

  function quickStartClick() {
    quickForward();
    toggleNav();
  }

  return (
    <>
      <Screen onClick={quickForward ? null : toggleNav} />
      <NavStyled singleNavAllowed={singleNavAllowed}>
        {libraryArrow}
        <ul>
          {navItems.map((navItem, idx) => {
            if (singleNavAllowed === (idx + 1)) {
              return (
                <li onClick={quickStartClick} key={navItem.text}><p>{navItem.text}</p></li>
              )
            } else {
              return (
                <li onClick={toggleNav} key={navItem.text}><Link to={navItem.path}>{navItem.text}</Link></li>
              )
            }

          })}
          <li key={'Log Out'} onClick={handleLogOut}>Log Out</li>
        </ul>
      </NavStyled>
    </>
  )
}

export default Nav;