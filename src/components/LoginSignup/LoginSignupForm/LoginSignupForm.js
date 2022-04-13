import { React, useState, useEffect } from 'react';
import './LoginSignupForm.scss';
import useFormInput from '../../../hooks/useFormInput';
import Password from '../../Password/Password';
import { auth, db } from '../../../firebaseConfig';
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  doc,
  collection,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

function LoginSignupForm(props) {

  const { formType, formStyle, legend, submitMessage, switchAuth, setUser, switchMessage } = props;

  const [email, handleEmailChange] = useFormInput('');
  const [password, handlePasswordChange] = useFormInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  useEffect(() => {
    if (loginError) {
      setLoginError('');
    }
    if (signupError) {
      setSignupError('')
    }
  }, [email, password])

  const errorMessage =
    (formType === 'login') ?
      loginError :
      signupError;


  function toggleShowPassword(e) {
    setShowPassword((old) => !old);
  }

  async function submitLogin(e) {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      showLoginError(error);
    }
  }

  function showLoginError(error) {
    if (error.message === "Firebase: Error (auth/wrong-password).") {
      setLoginError('Invalid Password');
    } else if (error.message === "Firebase: Error (auth/user-not-found).")
      setLoginError('User Not Found');
    else {
      setLoginError(error.message);
    }
  }

  function showSignupError(error) {
    console.log(error.message, 'error message');
    if (error.message === "Firebase: Error (auth/invalid-email).") {
      setSignupError('Invalid Email');
    } else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      setSignupError('Email Already In Use');
    }
  }

  async function submitSignup(e) {
    e.preventDefault();
    if (password.length < 6) {
      setSignupError('Password min of 6 characters');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          songs: {},
          email: userCredential.user.email,
        }
      );
      const userDoc = doc(db, 'users', userCredential.user.uid);
      const setsRef = collection(userDoc, 'sets');
      const defaultSet = {
        setName: "First Set",
        fullKnow: [],
        currentKnow: [],
        fullNew: [],
        currentNew: [],
        fullMedium: [],
        currentMedium: [],
        allSongs: [],
      };
      const newSetDoc = await addDoc(
        setsRef,
        defaultSet,
      );
      await updateDoc(userDoc, {
        defaultSet: newSetDoc.id,
        setNames: {
          [newSetDoc.id]: "First Set",
        },
      });

      setUser(userCredential.user);
    }
    catch (error) {
      console.log(error);
      showSignupError(error);
    }
  }

  const submit =
    (formType === 'login') ?
      submitLogin :
      submitSignup;

  return (
    <div className={`LoginSignupForm LoginSignupForm-${formType}`} style={formStyle}>
      <legend className="LoginSignupForm-legend">{legend}</legend>
      <div className="LoginSignupForm-inputs">
        <label htmlFor={`email-welcome-${formType}`}>email</label>
        <input className="LoginSignupForm-email" onChange={handleEmailChange} value={email} type="text" name="email-welcome" id={`email-welcome-${formType}`} />
        <label htmlFor={`password-welcome-${formType}`}>password</label>
        <Password id={`password-welcome-${formType}`} handlePasswordChange={handlePasswordChange} password={password} showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
        {errorMessage && <p className="LoginSignupForm-error" >{`*${errorMessage}`}</p>}
      </div>
      <button onClick={submit} className={`LoginSignupForm-submit LoginSignupForm-submit-${formType}`}>{submitMessage}</button>
      <button className="LoginSignupForm-switch" id={`switch-from-${formType}`} onClick={switchAuth}>{switchMessage}</button>
    </div>
  )
}

export default LoginSignupForm;