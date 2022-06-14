import React, { useContext, useState, useEffect } from 'react';
import SubContext from '../../context/sub-context';
import { Checkbox, Separator } from './FrontPage.styled';
import Loading from '../Loading/Loading';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Help from '../Help/Help';

function FrontPage(props) {

  const navigate = useNavigate();

  const context = useContext(SubContext);
  const { loading, user, userDoc } = context;

  const { email, uid } = user;
  const [skipWelcome, setSkipWelcome] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (userDoc.loginToPicker) {
      navigate('/controller');
    }
  }, [userDoc.loginToPicker])



  function handleCheckboxChange(e) {
    const checked = e.target.checked;

    const userDocRef = doc(db, 'users', uid);
    setSkipWelcome(checked);
    if (checked) {
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
      updateDoc(userDocRef, {
        loginToPicker: true,
      })
    } else {
      updateDoc(userDocRef, {
        loginToPicker: false,
      })
    }

  }

  if (loading || !user) {
    return (
      <Loading />
    )
  }

  const heading = `Welcome, ${email[0].toUpperCase().concat(email.slice(1, email.indexOf('@')))}!`;

  return (
    <>
      <Help heading={heading} />
      <Separator />
      <Checkbox>
        <input id={'login-to-picker'} checked={skipWelcome} onChange={handleCheckboxChange} type="checkbox"></input>
        {!showConfirmation && <label htmlFor={`login-to-picker`} >On login, skip Welcome page and direct me to Picker</label>}
        {showConfirmation && <p>Your preference has been saved.</p>}
      </Checkbox>


    </>
  )
}

export default FrontPage