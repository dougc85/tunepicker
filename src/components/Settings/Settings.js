import React, { useState } from 'react';
import AddButton from '../generics/AddButton.styled';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import { SettingsStyled } from './Settings.styled';

function Settings() {

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  function handleDeleteClick(e) {
    setShowDeleteAccount(true);
  }

  return (
    <SettingsStyled>
      <h2>Settings</h2>
      <AddButton onClick={handleDeleteClick}>Delete Your Account</AddButton>
      <p>(more settings to come at a later date...)</p>
      {showDeleteAccount && <DeleteAccount setShowDeleteAccount={setShowDeleteAccount} />}
    </SettingsStyled>
  )
}

export default Settings;