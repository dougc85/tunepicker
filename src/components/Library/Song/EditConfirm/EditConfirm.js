import './EditConfirm.scss';
import { React } from 'react';

function EditConfirm(props) {

  const { show, focusInput, field } = props;

  function handleClick() {
    show(true);
    focusInput(field);
  }
  return (
    <div className="EditConfirm">
      <button onClick={handleClick} className="EditConfirm-edit">edit</button>
    </div>
  )
}

export default EditConfirm;