import styled from 'styled-components';

export const NavStyled = styled.nav`
  height: 150px;
  background-color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70%;
  transform: translateY(100%);
  box-shadow: -2px 10px 10px rgba(0,0,0,.2);
  padding: 1.5rem 0;
  z-index: 10;

  ul {
    list-style: none;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: content-box;

    li {
      position: relative;

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
      bottom: -.8rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`