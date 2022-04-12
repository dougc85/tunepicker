import { React, useState } from 'react';
import './LoginSignup.scss';
import useFormInput from '../../hooks/useFormInput';
import { auth } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword
} from 'firebase/auth';
import Password from '../Password/Password';

function LoginSignup(props) {

  const { authStyle, loginStyle, setLoginStyle, signupStyle, setSignupStyle, initial } = props;

  const [email, handleEmailChange] = useFormInput('');
  const [password, handlePasswordChange] = useFormInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginShowing = { left: "50%", transform: "translateX(-50%)" };
  const loginHiding = { left: 0, transform: "translateX(-150%)" };
  const signupShowing = { right: "50%", transform: "translateX(50%)" };
  const signupHiding = { right: "0", transform: "translateX(150%)" };

  function switchAuth(e) {
    e.preventDefault();

    if (e.target.id === 'switch-to-login') {
      setLoginStyle(loginShowing);
      setSignupStyle(signupHiding);
    } else if (e.target.id === 'switch-to-signup') {
      setLoginStyle(loginHiding);
      setSignupStyle(signupShowing);
    }
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
    <form action="" className="LoginSignup" style={authStyle}>
      <div className="LoginSignup-login LoginSignup-container" style={loginStyle}>
        <legend className="LoginSignup-legend">Log In</legend>
        <div className="LoginSignup-inputs">
          <label htmlFor="email-welcome">email</label>
          <input className="LoginSignup-email" onChange={handleEmailChange} value={email} type="text" name="email-welcome" id="email-welcome" />
          <label htmlFor="password-welcome">password</label>
          <Password id="password-welcome" handlePasswordChange={handlePasswordChange} password={password} showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <button onClick={handleSubmit} className="LoginSignup-submit">Submit</button>
        <button className="LoginSignup-switch" id="switch-to-signup" onClick={switchAuth}>Need to create an account?</button>
      </div>
      <div className="LoginSignup-signup LoginSignup-container" style={signupStyle}>
        <legend className="LoginSignup-legend">Sign Up</legend>
        <div className="LoginSignup-inputs">
          <label htmlFor="email-welcome">email</label>
          <input className="LoginSignup-email" onChange={handleEmailChange} value={email} type="text" name="email-welcome" id="email-welcome" />
          <label htmlFor="password-welcome">password</label>
          <Password id="password-welcome" handlePasswordChange={handlePasswordChange} password={password} showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <button onClick={handleSubmit} className="LoginSignup-submit">Submit</button>
        <button id="switch-to-login" className="LoginSignup-switch" onClick={switchAuth}>Already have an account?</button>
      </div>
    </form>
  )
}

export default LoginSignup;