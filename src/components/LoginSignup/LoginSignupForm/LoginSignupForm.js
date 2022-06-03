import { React, useState, useReducer } from 'react';
import './LoginSignupForm.scss';
import Password from '../../Password/Password';
import { auth, db } from '../../../firebaseConfig';
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification
} from 'firebase/auth';
import {
  doc,
  collection,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

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
  isLoading: false,
  loginError: '',
  signupError: '',
}

function LoginSignupForm(props) {

  const { formType, formStyle, legend, submitMessage, switchAuth, switchMessage } = props;

  const [state, dispatch] = useReducer(loginSignupReducer, loginSignupInitialValues);


  /////   !!! Add Loading component when waiting for network responses   !!!!!!   /////

  const { email, password, isLoading, loginError, signupError } = state;

  const [showPassword, setShowPassword] = useState(false);

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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          songs: {},
          songNames: {},
          email: userCredential.user.email,
          tunesIWantToLearn: {},
        }
      );
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const setsRef = collection(userDocRef, 'sets');
      const defaultSet = {
        setName: "First Set",
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
          [newSetDoc.id]: "First Set",
        },
      });

      sendEmailVerification(auth.currentUser);

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

  const handleChange = (event) => {
    dispatch({
      type: 'HANDLE_INPUT',
      field: event.target.dataset.field,
      payload: event.target.value,
      form: formType,
    })
  }

  return (
    <form className={`LoginSignupForm LoginSignupForm-${formType}`} style={formStyle}>
      <legend className="LoginSignupForm-legend">{legend}</legend>
      <div className="LoginSignupForm-inputs">
        <label htmlFor={`email-${formType}`}>email</label>
        <input className="LoginSignupForm-email" autoComplete={formType === 'login' ? 'username' : null} onChange={handleChange} value={email} type="text" name={`${formType}-email`} data-field="email" id={`email-${formType}`} />
        <label htmlFor={`password-${formType}`}>password</label>
        <Password id={`password-${formType}`} formType={formType} handleChange={handleChange} password={password} showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
        {errorMessage && <p className="LoginSignupForm-error" >{`*${errorMessage}`}</p>}
      </div>
      <button onClick={submit} className={`LoginSignupForm-submit LoginSignupForm-submit-${formType}`}>{submitMessage}</button>
      <button className="LoginSignupForm-switch" id={`switch-from-${formType}`} onClick={switchAuth}>{switchMessage}</button>
    </form>
  )
}

export default LoginSignupForm;