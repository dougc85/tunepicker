import { React, useState, useReducer } from 'react';
import './LoginSignupForm.scss';
import Password from '../../Password/Password';
import { auth, db } from '../../../firebaseConfig';
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail
} from 'firebase/auth';
import {
  doc,
  collection,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import Loading from '../../Loading/Loading';
import Instructions from './Instructions/Instructions';
import PasswordReset from './PasswordReset/PasswordReset';

const loginSignupReducer = (state, action) => {
  if (action.type === 'HANDLE_INPUT') {
    return {
      ...state,
      [action.field]: action.payload,
      [`${action.form}Error`]: '',
    }
  }
  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      [action.field]: action.payload,
    }
  }
}

const loginSignupInitialValues = {
  email: '',
  password: '',
  loginError: '',
  signupError: '',
}

function LoginSignupForm(props) {

  const { formType, formStyle, legend, submitMessage, switchAuth, switchMessage } = props;

  const [state, dispatch] = useReducer(loginSignupReducer, loginSignupInitialValues);

  const { email, password, loginError, signupError } = state;

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);

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
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    } catch (error) {
      setLoading(false);
      showLoginError(error);
    }
  }

  function showLoginError(error) {
    if (error.message === "Firebase: Error (auth/wrong-password).") {
      dispatch({ type: 'SET_ERROR', field: "loginError", payload: "Invalid Password", })
    } else if (error.message === "Firebase: Error (auth/user-not-found).")
      dispatch({ type: 'SET_ERROR', field: "loginError", payload: "User Not Found", })
    else {
      dispatch({ type: 'SET_ERROR', field: "loginError", payload: error.message, })
    }
  }

  function showSignupError(error) {
    if (error.message === "Firebase: Error (auth/invalid-email).") {
      dispatch({ type: 'SET_ERROR', field: "signupError", payload: "Invalid Email", })
    } else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      dispatch({ type: 'SET_ERROR', field: "signupError", payload: 'Email Already In Use', })
    } else {
      dispatch({ type: 'SET_ERROR', field: "signupError", payload: error.message, })
    }
  }

  async function submitSignup(e) {
    e.preventDefault();
    if (password.length < 6) {
      dispatch({ type: 'SET_ERROR', field: "signupError", payload: 'Password min of 6 characters', })
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          songs: {},
          songNames: {},
          email: userCredential.user.email,
          tunesIWantToLearn: {},
          loginToPicker: false,
        },
        { merge: true },
      );
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const setsRef = collection(userDocRef, 'sets');
      const defaultSet = {
        setName: "first set",
        fullKnow: [],
        currentKnow: [],
        fullNew: [],
        currentNew: [],
        fullMedium: [],
        currentMedium: [],
        allSongs: {},
      };
      const newSetDoc = await addDoc(
        setsRef,
        defaultSet,
      );
      await updateDoc(userDocRef, {
        pickerSet: newSetDoc.id,
        setNames: {
          [newSetDoc.id]: "first set",
        },
      });

      sendEmailVerification(auth.currentUser);

    }
    catch (error) {
      console.log(error.message);
      setLoading(false);
      showSignupError(error);
    }
  }

  const submit =
    (formType === 'login') ?
      submitLogin :
      submitSignup;

  const handleChange = (event) => {
    setEmailError('');

    dispatch({
      type: 'HANDLE_INPUT',
      field: event.target.dataset.field,
      payload: event.target.value,
      form: formType,
    })
  }

  async function handleForgot(e) {
    e.preventDefault();

    if (!email) {
      setShowInstructions(true);
    } else {
      try {
        if (email.includes('@')) {
          setPasswordResetLoading(true);
          await sendPasswordResetEmail(auth, email);
          setShowPasswordReset(true);
        } else {
          throw new Error('Invalid Email');
        }
      }
      catch (error) {
        if (error.message === "Firebase: Error (auth/invalid-email)." || error.message === "Invalid Email") {
          setEmailError('Invalid Email');
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          setEmailError('Email Not Found')
        }
      }
      setPasswordResetLoading(false);
    }
  }

  return (
    <form className={`LoginSignupForm LoginSignupForm-${formType}`} style={formStyle}>
      <legend className="LoginSignupForm-legend">{legend}</legend>
      <div className="LoginSignupForm-inputs">
        <label htmlFor={`email-${formType}`}>email</label>
        <input className="LoginSignupForm-email" autoComplete={formType === 'login' ? 'username' : null} onChange={handleChange} value={email} type="text" name={`${formType}-email`} data-field="email" id={`email-${formType}`} />
        {emailError && <p>{emailError}</p>}
        <div>
          <label htmlFor={`password-${formType}`}>password</label>
          {
            (formType === 'login') ?
              <div className={"LoginSignupForm-forgot-container"}>
                <button className="LoginSignupForm-forgot" onClick={handleForgot}>forgot?</button>
                <div>
                  {passwordResetLoading && <Loading embedded spinnerOnly size={1} />}
                </div>
              </div>
              : null
          }
        </div>
        <Password id={`password-${formType}`} formType={formType} handleChange={handleChange} password={password} showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
        {errorMessage && <p className="LoginSignupForm-error" >{`*${errorMessage}`}</p>}
      </div>
      <div className="LoginSignupForm-submit-container">
        <button onClick={submit} className={`LoginSignupForm-submit LoginSignupForm-submit-${formType}`}>{submitMessage}</button>
        <div className={'LoginSignupForm-submit-loading'}>
          {loading && <Loading embedded spinnerOnly size={2} />}
        </div>
      </div>
      <button className="LoginSignupForm-switch" id={`switch-from-${formType}`} onClick={switchAuth}>{switchMessage}</button>
      {showInstructions && <Instructions setShowInstructions={setShowInstructions} />}
      {showPasswordReset && <PasswordReset setShowPasswordReset={setShowPasswordReset} email={email} />}
    </form>
  )
}

export default LoginSignupForm;