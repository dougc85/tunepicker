import './Set.scss';
import { React } from 'react';
import { useParams } from 'react-router-dom';

function Set(props) {

  const { set } = props;

  const params = useParams();

  return (
    <div className="Set">
      <h2 className="Set-heading">{set.setName}</h2>
    </div>
  )
}

export default Set;