import './EditConfirm.scss';
import { React, useState } from 'react';

function EditConfirm(props) {

  const { show, focusInput, field, disableEdit, setDisableEdit, saveData } = props;
  const [showConfirm, setShowConfirm] = useState(false);


  function handleEditClick() {
    show(true);
    focusInput(field);
    setShowConfirm(true);
    setDisableEdit(true);
  }

  async function handleConfirmClick() {
    const possibleError = await saveData();
    console.log(possibleError);
    if (possibleError) {
      console.log('inside error');
      return;
    }
    setShowConfirm(false);
    focusInput('');
    show(false);
    setDisableEdit(false);

  }

  function empty() {

  }

  return (
    <div className="EditConfirm">
      {!showConfirm && <button style={disableEdit ? { color: 'rgb(173, 173, 173)', borderColor: 'rgb(173, 173, 173)' } : {}} onClick={disableEdit ? empty : handleEditClick} className="EditConfirm-edit">edit</button>}
      {showConfirm && <button className="EditConfirm-confirm" onTouchStart={empty} onClick={handleConfirmClick}>Confirm</button>}
    </div>
  )
}

export default EditConfirm;