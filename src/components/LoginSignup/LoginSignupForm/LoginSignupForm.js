import { React, useState, useReducer, useContext } from 'react';
import SubContext from '../../../context/sub-context';
import { LoginSignupFormStyled, Inputs, EmailInput, SubmitContainer, ForgotContainer, EmailError, PasswordError } from './LoginSignupForm.styled';
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

  const { handleNetworkError } = useContext(SubContext);

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
      handleNetworkError(error.message);
    }
  }

  function showSignupError(error) {
    if (error.message === "Firebase: Error (auth/invalid-email).") {
      dispatch({ type: 'SET_ERROR', field: "signupError", payload: "Invalid Email", })
    } else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      dispatch({ type: 'SET_ERROR', field: "signupError", payload: 'Email Already In Use', })
    } else {
      handleNetworkError(error.message);
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
        } else {
          handleNetworkError(error.message);
        }
      }
      setPasswordResetLoading(false);
    }
  }

  return (
    <LoginSignupFormStyled className={`LoginSignupForm LoginSignupForm-${formType}`} style={formStyle}>
      <legend>{legend}</legend>
      <Inputs>
        <label htmlFor={`email-${formType}`}>email</label>
        <EmailInput autoComplete={formType === 'login' ? 'username' : null} onChange={handleChange} value={email} type="text" name={`${formType}-email`} data-field="email" id={`email-${formType}`} />
        {emailError && <EmailError>{emailError}</EmailError>}
        <div>
          <label htmlFor={`password-${formType}`}>password</label>
          {
            (formType === 'login') ?
              <ForgotContainer>
                <p className="LoginSignupForm-forgot" tabIndex="0" role="button" onClick={handleForgot}>forgot?</p>
                <div className="LoginSignupForm-forgot-loading">
                  {passwordResetLoading && <Loading embedded spinnerOnly size={1} />}
                </div>
              </ForgotContainer>
              : null
          }
        </div>
        <Password id={`password-${formType}`} formType={formType} handleChange={handleChange} password={password} showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
        {errorMessage && <PasswordError>{`*${errorMessage}`}</PasswordError>}
      </Inputs>
      <SubmitContainer formType={formType}>
        <button onClick={submit}>{submitMessage}</button>
        <div>
          {loading && <Loading embedded spinnerOnly size={2} />}
        </div>
      </SubmitContainer>
      <button className="LoginSignupForm-switch" id={`switch-from-${formType}`} onClick={switchAuth}>{switchMessage}</button>
      {showInstructions && <Instructions setShowInstructions={setShowInstructions} />}
      {showPasswordReset && <PasswordReset setShowPasswordReset={setShowPasswordReset} email={email} />}
    </LoginSignupFormStyled>
  )
}

export default LoginSignupForm;