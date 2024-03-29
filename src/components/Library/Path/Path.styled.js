import styled from 'styled-components';

export const PathStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 1.7rem;
  ${({ disable, allowSetButton }) => {
    if (allowSetButton) {
      return `
        >button:not(:nth-child(5)) {
          pointer-events: none;
        }
      `
    } else if (disable) {
      return `
        >button {
          pointer-events: none;
        }
      `
    }
  }}

  p {
    font-weight: bold;
    margin-left: 3px;
  }

  button {
    position: relative;
    display: block;
    background-color: ${props => {
    return props.forPicker ? 'rgba(0, 0, 0, 0)' : 'white'
  }};
    border: none;
    cursor: pointer;
  }

  .Path-icon {
    width: 2rem;
    display: block;

    &-book {
      width: 1.8rem;
      margin-left: 3px;

      &-music {
        margin-right: 1px;
      }
    }

    &-doc {
      margin-left: 5px;
    }

    &-music {
      margin-left: 5px;
    }
  }
  h2 {
    font-size: 1.7rem;
    margin-left: 6px;
    font-weight: normal;
  }
`