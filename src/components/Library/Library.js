import { React } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Path from './Path/Path';
import { LibraryStyled } from './Library.styled';

function Library(props) {

  const { loading } = props;

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <LibraryStyled>
      <Path heading="Library" pathType="Library" />
      <Link to={'/library/sets'}>Sets</Link>
      <Link to={'/library/allsongs'}>All Songs</Link>
    </LibraryStyled>
  )
}

export default Library;