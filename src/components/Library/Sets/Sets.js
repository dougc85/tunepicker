import './Sets.scss';
import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sets(props) {

  const { sets, setCurrentLibSet } = props;
  const navigate = useNavigate();

  function handleAddButton() {

  }

  function handleClick(set) {
    setCurrentLibSet(set.setName)
    navigate(`/library/sets/${set.setName}`)
  }

  return (
    <div className="Sets">
      <div className="Sets-path">
        <svg className="Sets-path-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z" />
        </svg>
        <p className="Sets-path-divider">/</p>
        <svg className="Sets-path-icon Sets-path-icon-book" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z" />
        </svg>
        <p className="Sets-path-heading">Sets</p>
      </div>
      <ul className="Sets-sets">
        <div className="Sets-sets-header">
          <h2 className="Sets-sets-header-heading">Sets</h2>
          <button onClick={handleAddButton} className="Sets-sets-header-add">Add a Set</button>
        </div>
        {Object.keys(sets).map((setKey) => {
          const set = sets[setKey];
          return (
            <li onClick={() => { handleClick(set) }} className="Sets-sets-set" key={set.setName}>
              {set.setName}
            </li>
          )
        }
        )}
      </ul>
    </div >
  )
}

export default Sets;