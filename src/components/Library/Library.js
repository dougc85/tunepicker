import './Library.scss';
import { React } from 'react';
import { Link } from 'react-router-dom';

function Library(props) {
  console.log(props.sets);
  return (
    <div className="Library">
      <h2 className="Library-sets-heading">Sets</h2>
      <ul className="Library-sets">
        {props.sets.map((set) => (
          <li onClick={() => { props.setCurrentLibSet(set) }} className="Library-sets-set" key={set.setName}>
            <Link to={`/library/${set.setName}`}>{set.setName}</Link>
          </li>
        )
        )}
      </ul>
    </div>
  )
}

export default Library;