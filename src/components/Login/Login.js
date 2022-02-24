import React from "react";
import './Login.scss';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="Login">
      <h1 className="Login-title">tunePicker</h1>
      <form action="" className="Login-form">
        <legend className="Login-form-legend">Log In:</legend>
        <label for="email-login">email</label>
        <input type="text" name="email-login" id="email-login" className="Login-form-email" />
        <label for="password-login">password</label>
        <input type="text" name="password-login" id="password-login" className="Login-form-password" />
      </form>
      <Link className="Login-signup" to="/signup" >Click here to sign up</Link>
    </div>

  )
}

export default Login;