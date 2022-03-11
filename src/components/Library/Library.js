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
        <div className="Library-path">
          <svg className="Library-path-icon-library" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z" />
          </svg>
          <p className="Library-path-heading">Library</p>
        </div>
        <Link to={'/library/sets'}>Sets</Link>
        <Link to={'/library/allsongs'}>All Songs</Link>
      </div>
  )
}

export default Library;