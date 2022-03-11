import './Library.scss';
import { React } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

function Library(props) {

  const { sets, setCurrentLibSet, loading } = props;

  return (
    loading ?
      <Loading /> :
      <div className="Library">
        <Link to={'/library/sets'}>Sets</Link>
        <Link to={'/library/allsongs'}>All Songs</Link>
      </div>
  )
}

export default Library;