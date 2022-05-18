import styled from 'styled-components';
import React, { useState } from 'react';

const LibraryMenuStyled = styled.div`

  position: relative;

  button {
    border: none;
    background-color: white;
    display: flex;
    align-items: center;
    color: rgb(162, 162, 162);
  }

  ul {
    height: 15rem;
    background-color: white;
    position: absolute;
    left: -3rem;
    top: 3rem;
    width: 15rem;
    box-shadow: -2px 10px 10px rgba(0,0,0,.2);
    padding: 1.5rem .5rem;
    z-index: 10;
    list-style: none;
    font-size: 1.2rem;
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
      bottom: -.8rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

function LibraryMenu(props) {

  const [showMenu, setShowMenu] = useState(true);

  function handleClick() {
    setShowMenu((old) => !old);
  }

  return (
    <LibraryMenuStyled>
      <button>
        <svg onClick={handleClick} viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z" />
        </svg>
      </button>
      {showMenu && (
        <ul>
          {props.items.map(item => (
            <li key={item.text} onClick={() => {
              setShowMenu(false);
              item.func();
            }}>
              {item.text}
            </li>
          ))}
        </ul>)}
    </LibraryMenuStyled>
  )
}

export default LibraryMenu;