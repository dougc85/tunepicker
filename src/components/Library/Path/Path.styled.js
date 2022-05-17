import styled from 'styled-components';

export const PathStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 1.7rem;

  p {
    font-weight: bold;
    margin-left: 3px;
  }

  button {
    display: block;
    background-color: white;
    border: none;
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