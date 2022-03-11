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
        <h2 className="Library-sets-heading">Sets</h2>
        <ul className="Library-sets">
          {Object.keys(sets).map((setKey) => {
            const set = sets[setKey];
            return (
              <li onClick={() => { setCurrentLibSet(set.setName) }} className="Library-sets-set" key={set.setName}>
                <Link to={`/library/${set.setName}`}>{set.setName}</Link>
              </li>
            )
          }
          )}
        </ul>
      </div>
  )
}

export default Library;