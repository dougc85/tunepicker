import React from "react";
import { useState } from 'react';
import './Signup.scss';
import { auth } from '../../firebaseConfig';
import { db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  doc,
  collection,
  addDoc,
  setDoc,
} from 'firebase/firestore';

function Signup(props) {

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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          defaultSet: "Tunes I Know",
          songs: {},
          email: userCredential.user.email,
        }
      );
      const userDoc = doc(db, 'users', userCredential.user.uid);
      const setsRef = collection(userDoc, 'sets');
      const defaultSet = {
        setName: "Tunes I Know",
        fullKnow: [],
        currentKnow: [],
        fullNew: [],
        currentNew: [],
        fullMedium: [],
        currentMedium: [],
        allSongs: [],
      };
      const tunesIKnowSetRef = await addDoc(setsRef, defaultSet);
      props.setUser(userCredential.user);
    }
    catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }

  }

  return (
    <div className="Signup">
      <h1 className="Signup-title">tunePicker</h1>
      <form action="" className="Signup-form">
        <legend className="Signup-form-legend">Sign up:</legend>
        <label htmlFor="email-signup">email</label>
        <input onChange={changeEmailHandler} value={email} type="text" name="email-signup" id="email-signup" className="Signup-form-email" />
        <label htmlFor="password-signup">password</label>
        <input onChange={changePasswordHandler} value={password} type={`${showPassword ? "text" : "password"}`} name="password-signup" id="password-signup" className="Signup-form-password" />
        <label htmlFor="show-password-signup">Show Password</label>
        <input onChange={toggleShowPassword} type="checkbox" id="show-password-signup" className="Signup-form-checkbox"></input>
        {errorMessage && <p>{errorMessage}</p>}
        <button onClick={handleSubmit} className="Signup-submit">Submit</button>
      </form>
    </div>
  )
}

export default Signup;