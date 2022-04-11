import React from "react";
import { useState } from "react";
import './Login.scss';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword
} from 'firebase/auth';
import useFormInput from "../../hooks/useFormInput";
import Password from "../Password/Password";

function Login() {

  const [email, handleEmailChange] = useFormInput('');
  const [password, handlePasswordChange] = useFormInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function toggleShowPassword(e) {
    setShowPassword((old) => !old);
  }

  function showLoginError(error) {
    if (error.message === "Firebase: Error (auth/wrong-password).") {
      setErrorMessage('Invalid Password');
    } else {
      setErrorMessage(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      showLoginError(error);
    }
  }

  return (
    <div className="Login">
      <h1 className="Login-title">tunePicker</h1>
      <form action="" className="Login-form">
        <legend className="Login-form-legend">Log In:</legend>
        <label htmlFor="email-login">email</label>
        <input onChange={handleEmailChange} value={email} type="text" name="email-login" id="email-login" className="Login-form-email" />
        <label htmlFor="password-login">password</label>
        <Password id="password-login" handlePasswordChange={handlePasswordChange} password={password} showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
        {errorMessage && <p>{errorMessage}</p>}
        <button onClick={handleSubmit} className="Login-submit">Click Here to Log In</button>
      </form>
      <Link className="Login-signup" to="/signup" >Click here to sign up</Link>
    </div>

  )
}

export default Login;