import React from 'react';
import { Link } from 'react-router-dom';
import Path from './Path/Path';
import { LibraryStyled } from './Library.styled';

function Library(props) {

  const { setsArrow, quickForward } = props;

  return (
    <LibraryStyled disableAllSongs={quickForward ? true : false}>
      <Path heading="Library" pathType="Library" disable={quickForward ? true : false} />
      {quickForward ? (
        <p onClick={quickForward}>
          Sets
          {setsArrow ? setsArrow : null}
        </p>
      ) : (
        <Link to={'/library/sets'}>
          Sets
        </Link>
      )}

      <Link to={'/library/allsongs'}>All Songs</Link>
    </LibraryStyled>
    // <Loading />
  )
}

export default Library;