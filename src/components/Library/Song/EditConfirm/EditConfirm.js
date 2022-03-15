import './EditConfirm.scss';
import { React } from 'react';

function EditConfirm(props) {

  const { show } = props;

  return (
    <div className="EditConfirm">
      <button onClick={show} className="EditConfirm-edit">edit</button>
    </div>
  )
}

export default EditConfirm;