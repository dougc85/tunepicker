import { React } from 'react';
import './Password.scss';

function Password(props) {

  const { id, handlePasswordChange, password, showPassword, toggleShowPassword } = props;

  return (
    <div className="Password">
      <input className="Password-input" onChange={handlePasswordChange} value={password} type={`${showPassword ? "text" : "password"}`} name="password-signup" id={id} />
      <svg onClick={toggleShowPassword} className="Password-eye" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
      </svg>
    </div>
  )
}

export default Password;