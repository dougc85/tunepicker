import { React, useState } from 'react';
import { EditConfirmStyled, EditButton, ConfirmButton } from './EditConfirmStyled';

function EditConfirm(props) {

  const {
    show,
    focusInput,
    field,
    disableEdit,
    setDisableEdit,
    saveData,
    knowledgeEditArrow,
    quickForward
  } = props;
  const [showConfirm, setShowConfirm] = useState(false);

  console.log(knowledgeEditArrow);

  function handleEditClick() {
    show(true);
    focusInput(field);
    setShowConfirm(true);
    setDisableEdit(true);
    if (quickForward) {
      quickForward();
    }
  }

  async function handleConfirmClick() {
    const possibleError = await saveData();
    if (possibleError) {
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
    <EditConfirmStyled >
      {!showConfirm &&
        <EditButton disableEdit={disableEdit} onClick={disableEdit ? empty : handleEditClick} >
          edit
          {knowledgeEditArrow ? knowledgeEditArrow : null}
        </EditButton>}
      {showConfirm && <ConfirmButton onTouchStart={empty} onClick={handleConfirmClick}>Confirm</ConfirmButton>}
    </EditConfirmStyled>
  )
}

export default EditConfirm;