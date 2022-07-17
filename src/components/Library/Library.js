import React from 'react';
import { Link } from 'react-router-dom';
import Path from './Path/Path';
import { LibraryStyled } from './Library.styled';
import Loading from '../Loading/Loading';

function Library() {

  return (
    // <LibraryStyled>
    //   <Path heading="Library" pathType="Library" />
    //   <Link to={'/library/sets'}>Sets</Link>
    //   <Link to={'/library/allsongs'}>All Songs</Link>
    // </LibraryStyled>
    <Loading />
  )
}

export default Library;