import './Sets.scss';
import { React } from 'react';
import { Link } from 'react-router-dom';

function Sets(props) {

  const { sets, setCurrentLibSet } = props;

  return (
    <div className="Sets">
      <ul className="Library-sets">
        {Object.keys(sets).map((setKey) => {
          const set = sets[setKey];
          return (
            <li onClick={() => { setCurrentLibSet(set.setName) }} className="Library-sets-set" key={set.setName}>
              <Link to={`/library/sets/${set.setName}`}>{set.setName}</Link>
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}

export default Sets;