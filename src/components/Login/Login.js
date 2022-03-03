import React from "react";
import { useState } from "react";
import './Login.scss';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword
} from 'firebase/auth';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function changePasswordHandler(e) {
    setPassword(e.target.value)
  }

  function changeEmailHandler(e) {
    setEmail(e.target.value)
  }

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
        <input onChange={changeEmailHandler} value={email} type="text" name="email-login" id="email-login" className="Login-form-email" />
        <label htmlFor="password-login">password</label>
        <input onChange={changePasswordHandler} value={password} type={`${showPassword ? "text" : "password"}`} name="password-login" id="password-login" className="Login-form-password" />
        <label htmlFor="show-password-login">Show Password</label>
        <input onChange={toggleShowPassword} type="checkbox" id="show-password-login" className="Login-form-checkbox"></input>
        {errorMessage && <p>{errorMessage}</p>}
        <button onClick={handleSubmit} className="Login-submit">Click Here to Log In</button>
      </form>
      <Link className="Login-signup" to="/signup" >Click here to sign up</Link>
    </div>

  )
}

export default Login;