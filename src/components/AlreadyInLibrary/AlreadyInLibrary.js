import './AlreadyInLibrary.scss';
import { React } from 'react';

function AlreadyInLibrary(props) {

  const { songConsidered, set } = props;

  return (
    <div className="AlreadyInLibrary">
      {`${songConsidered} is already in your library!!!`}
      {`Would you like to add it to ${set.setName}???!`}
    </div>
  )
}

export default AlreadyInLibrary;