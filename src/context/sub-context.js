import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import {
  doc, onSnapshot, updateDoc
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
  const [userDoc, setUserDoc] = useState({
    songs: undefined,
    setNames: undefined,
    songNames: undefined,
    pickerSet: undefined,
    tunesIWantToLearn: undefined,
    notVerifiedToken: 0,
  });
  const [pickerSet, setPickerSet] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [newToken, setNewToken] = useState(0);

  useEffect(() => {

    const unsubAuthChange = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await getIdToken(currentUser);
        setNewToken(token);
        if (!currentUser.emailVerified) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          try {
            await updateDoc(userDocRef, {
              notVerifiedToken: token,
            })
          } catch (error) {
            console.log(error.message);
          }

        }
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
  }, []);

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
    if (!user.uid || !userDoc.pickerSet) {
      return;
    }
    const unsubscribeSetDoc = onSnapshot(doc(db, 'users', user.uid, 'sets', userDoc.pickerSet), (doc) => {
      setPickerSet({ ...doc.data(), id: userDoc.pickerSet });
    });

    return () => {
      if (unsubscribeSetDoc) {
        unsubscribeSetDoc();
      }
    }

  }, [user.uid, userDoc.pickerSet]);

  useEffect(() => {
    if (pickerSet) {
      setLoading(false);
    }
  }, [pickerSet]);

  const tokenVerified = (newToken === userDoc.notVerifiedToken || newToken === 0 || userDoc.notVerifiedToken === 0) ? false : true;

  return (
    <SubContext.Provider
      value={{
        user,
        userDoc,
        pickerSet,
        setPickerSet,
        loading,
      }}>
      {user && !loading && !tokenVerified && <VerifyEmail />}
      {props.children}
    </SubContext.Provider>
  )
}

export default SubContext;