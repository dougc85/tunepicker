import styled from 'styled-components';
import React, { useState, useRef } from 'react';

const LibraryMenuStyled = styled.div`

  position: relative;

  button {
    border: none;
    background-color: inherit;
    display: flex;
    align-items: center;
    color: rgb(162, 162, 162);
    svg {
      height: 24px;
    }
  }

  ul {
    height: ${({ menuLength }) => `calc(${menuLength}*5rem)`};
    background-color: white;
    position: absolute;
    left: ${props => {
    return (props.repositionMenu ? '-14rem' : '-3rem')
  }};
    top: 3rem;
    width: 18rem;
    box-shadow: -2px 10px 10px rgba(0,0,0,.2);
    padding: 1.5rem .5rem;
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
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: #0000001f;
  z-index: 100;
`

function LibraryMenu(props) {

  const [showMenu, setShowMenu] = useState(false);
  const [repositionMenu, setRepositionMenu] = useState(false);
  const libMenuRef = useRef(null);

  function handleClick() {
    setShowMenu((old) => !old);
    if ((libMenuRef.current.getBoundingClientRect().x + 200) > window.innerWidth) {
      setRepositionMenu(true);
    }
  }

  return (
    <LibraryMenuStyled menuLength={props.items.length} repositionMenu={repositionMenu}>
      <button ref={libMenuRef}>
        <svg onClick={handleClick} viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z" />
        </svg>
      </button>
      {showMenu && (
        <>
          <Screen onClick={() => { setShowMenu(false) }} />
          <ul>
            {props.items.map(item => (
              <li key={item.text} onClick={() => {
                setShowMenu(false);
                item.func();
              }}>
                {item.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </LibraryMenuStyled>
  )
}

export default LibraryMenu;