import React, { useState, useContext } from 'react';
import SubContext from '../../context/sub-context';
import AddButton from '../generics/AddButton.styled';
import ChangeEmail from './ChangeEmail/ChangeEmail';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import { SettingsStyled } from './Settings.styled';

function Settings() {

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const { user } = useContext(SubContext);

  function handleDeleteClick(e) {
    setShowDeleteAccount(true);
  }

  function handleEmailClick(e) {
    setShowChangeEmail(true);
  }

  return (
    <SettingsStyled>
      <h2>Settings</h2>
      <div>
        <div>
          <label>Email</label>
          <button onClick={handleEmailClick}>change</button>
        </div>

        <p>{user.email}</p>
      </div>
      <div>
        <div>
          <label>Password</label>
          <button>change</button>
        </div>
        <p>&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</p>
      </div>
      <AddButton onClick={handleDeleteClick}>Delete Your Account</AddButton>
      {showChangeEmail && <ChangeEmail setShowChangeEmail={setShowChangeEmail} oldEmail={user.email} />}
      {showDeleteAccount && <DeleteAccount setShowDeleteAccount={setShowDeleteAccount} />}
    </SettingsStyled>
  )
}

export default Settings;