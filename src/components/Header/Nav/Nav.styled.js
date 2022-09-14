import styled from 'styled-components';

export const NavStyled = styled.nav`
  height: 270px;
  background-color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 220px;
  transform: translateY(100%);
  box-shadow: -2px 10px 10px rgba(0,0,0,.2);
  padding: 12px 0;
  z-index: 10;

  ul {
    list-style: none;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: content-box;

    ${({ singleNavAllowed }) => {
    if (singleNavAllowed) {
      return (
        `
            >li {
              pointer-events: none;
            }
            >li >a {
              pointer-events: none;
            }
            li:nth-child(${singleNavAllowed}) {
              pointer-events: auto;

              >a {
                pointer-events: none;
              }
            }
          `
      )
    }
  }}

    li {
      position: relative;
      cursor: pointer;

      a {
        :visited, :active, :link {
          text-decoration: none;
          color: black;
        }
      }
    }
    
    li:not(:last-child)::after {
      content: "";
      border-top: 1px solid rgb(190, 190, 190);
      width: 70%;
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

export const Screen = styled.div`
position: absolute;
height: 100vh;
width: 100vw;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.05);
z-index: -1;
`