import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, onSnapshot,
} from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';

const defaultContext = {
  user: undefined,
  setUser: undefined,
  userDoc: undefined,
  pickerSet: undefined,
  setPickerSet: undefined,
  loading: undefined,
}

const SubContext = React.createContext(defaultContext);

export const SubContextProvider = (props) => {

  const [user, setUser] = useState('');
  const [userDoc, setUserDoc] = useState(undefined);
  const [pickerSet, setPickerSet] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const unsubAuthChange = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
        if (location.pathname === '/welcome') {
          navigate('/');
        }
        else {
          navigate(location.pathname);
        }
      }
      else {
        setUser('');
        if (location.pathname !== '/welcome') {
          navigate('/welcome');
        }
      }
    })

    return () => {
      unsubAuthChange();
    }
  }, [location.pathname, navigate]);

  useEffect(() => {

    if (!user) {
      return;
    }
    const unsubscribeUserDoc = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      setUserDoc({ ...doc.data(), uid: doc.id });
    })

    return () => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
      }
    }
  }, [user]);

  useEffect(() => {
    if (!userDoc || !user.uid || !userDoc.defaultSet) {
      return;
    }
    const unsubscribeSetDoc = onSnapshot(doc(db, 'users', user.uid, 'sets', userDoc.defaultSet), (doc) => {
      setPickerSet({ ...doc.data(), id: userDoc.defaultSet });
    });

    return () => {
      if (unsubscribeSetDoc) {
        unsubscribeSetDoc();
      }
    }

  }, [userDoc, user.uid]);

  useEffect(() => {
    if (pickerSet) {
      setLoading(false);
    }
  }, [pickerSet]);

  return (
    <SubContext.Provider
      value={{
        user,
        userDoc,
        pickerSet,
        setPickerSet,
        loading,
      }}>
      {user && !user.emailVerified && <VerifyEmail />}
      {props.children}
    </SubContext.Provider>
  )
}

export default SubContext;