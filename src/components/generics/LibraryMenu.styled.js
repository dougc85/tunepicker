import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import Header from '../Header/Header';

const LibraryMenuStyled = styled.div`

  position: relative;

  button {
    border: none;
    background-color: inherit;
    display: flex;
    align-items: center;
    color: ${props => {
    return props.color ? props.color : 'rgb(162, 162, 162)';
  }};

    >svg {
      height: 24px;
      cursor: pointer;
    }
  }

  ul {
    height: ${({ menuLength, allSongs }) => {
    if (allSongs) {
      return '7.7rem';
    } else {
      return `calc(${menuLength}*5rem)`;
    }
  }};

    background-color: white;
    position: absolute;
    left: ${props => {
    return (props.repositionMenu ? props.repositionMenu : '-3rem')
  }};
    top: 8px;
    width: 18rem;
    box-shadow: -2px 10px 10px rgba(0,0,0,.2);
    padding: 1.5rem 1rem;
    z-index: 150;
    list-style: none;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: content-box;
    border-radius: 5px;

    li {
      position: relative;
      cursor: pointer;
    }
    
    li:not(:last-child)::after {
      content: "";
      border-top: 1px solid rgb(190, 190, 190);
      width: 70%;
      position: absolute;
      bottom: -1.6rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const Screen = styled.div`
  position: fixed;
  min-height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: #0000001f;
  z-index: 100;
`

const MenuWrapper = styled.div`
  position: relative;
  `

function LibraryMenu(props) {

  const {
    items,
    color,
    allSongs,
    children,
    quickForward,
    quick,
    addSongArrow,
    addMultipleArrow,
    setAsPickerArrow,
    newGigArrow,
    disableLibMenu,
    libMenuForward,
    disableLibMenuScreen,
  } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [repositionMenu, setRepositionMenu] = useState(false);
  const libMenuRef = useRef(null);

  function handleClick() {

    if (disableLibMenu) {
      return;
    }
    setShowMenu((old) => !old);
    if ((libMenuRef.current.getBoundingClientRect().x + 50) > window.innerWidth || (quick > 25)) {
      setRepositionMenu('-15.8rem');
    } else if ((libMenuRef.current.getBoundingClientRect().x + 200) > window.innerWidth) {
      setRepositionMenu('-14rem');
    }
    if (libMenuForward) {
      quickForward();
    }
  }

  function handleScreenClick() {
    if (disableLibMenuScreen) {
      return;
    }
    setShowMenu(false)
  }

  return (
    <>
      <LibraryMenuStyled menuLength={items.length} allSongs={allSongs} repositionMenu={repositionMenu} color={color ? color : null}>

        <button ref={libMenuRef}>
          <svg onClick={handleClick} viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z" />
          </svg>
        </button>
        {children}
        {showMenu && (
          <>
            <Header hideLibMenu={true} />
            <Screen onClick={handleScreenClick} />
            <MenuWrapper>
              <ul>
                {items.map(item => {
                  if (addSongArrow || addMultipleArrow || setAsPickerArrow || newGigArrow) {
                    if (addSongArrow && item.text === 'Add New Song') {
                      return (
                        <li key={item.text} onClick={() => {
                          setShowMenu(false);
                          item.func();
                          quickForward();
                        }}>
                          {item.text}
                          {addSongArrow}
                        </li>
                      )
                    } else if (addMultipleArrow && item.text === 'Add Multiple New Songs') {
                      return (
                        <li key={item.text} onClick={() => {
                          setShowMenu(false);
                          item.func();
                          quickForward();
                        }}>
                          {item.text}
                          {addMultipleArrow}
                        </li>
                      )
                    } else if (setAsPickerArrow && item.text === 'Set As PickerSet') {
                      return (
                        <li key={item.text} onClick={() => {
                          setShowMenu(false);
                          item.func();
                          quickForward();
                        }}>
                          {item.text}
                          {setAsPickerArrow}
                        </li>
                      )
                    } else if (newGigArrow && item.text === 'Start New Gig') {
                      return (
                        <li key={item.text} onClick={() => {
                          setShowMenu(false);
                          item.func();
                          quickForward();
                        }}>
                          {item.text}
                          {newGigArrow}
                        </li>
                      )
                    } else {
                      return (
                        <li key={item.text}>{item.text}</li>
                      )
                    }
                  } else {
                    return (
                      <li key={item.text} onClick={() => {
                        setShowMenu(false);
                        item.func();
                      }}>
                        {item.text}
                      </li>
                    )
                  }
                })}
              </ul>
            </MenuWrapper>
          </>
        )}
      </LibraryMenuStyled>
    </>

  )
}

export default LibraryMenu;