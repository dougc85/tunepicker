import React from "react";
import { useState } from 'react';
import Password from '../Password/Password';
import './Signup.scss';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  doc,
  collection,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import useFormInput from "../../hooks/useFormInput";

function Signup(props) {

  const [email, handleEmailChange, resetEmail] = useFormInput('');
  const [password, handlePasswordChange, resetPassword] = useFormInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function toggleShowPassword(e) {
    setShowPassword((old) => !old);
  }

  async function handleSubmit(e) {
    e.preventDefault();
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
        pickerSet: newSetDoc.id,
        setNames: {
          [newSetDoc.id]: "First Set",
        },
      });

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
        <input onChange={handleEmailChange} value={email} type="text" name="email-signup" id="email-signup" className="Signup-form-email" />
        <label htmlFor="password-signup">password</label>
        <Password id="password-signup" handlePasswordChange={handlePasswordChange} password={password} showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
        {errorMessage && <p>{errorMessage}</p>}
        <button onClick={handleSubmit} className="Signup-submit">Submit</button>
      </form>
    </div>
  )
}

export default Signup;