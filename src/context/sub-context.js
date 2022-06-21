import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import {
  doc, onSnapshot, updateDoc, setDoc
} from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';

const defaultContext = {
  user: undefined,
  setUser: undefined,
  userDoc: undefined,
  loading: undefined,
  setLoading: undefined,
}

const SubContext = React.createContext(defaultContext);

export const SubContextProvider = (props) => {

  const [user, setUser] = useState('');
  const [userDoc, setUserDoc] = useState({
    songs: undefined,
    setNames: undefined,
    songNames: undefined,
    tunesIWantToLearn: undefined,
    notVerifiedToken: 0,
    pickerSet: undefined,
    loginToPicker: undefined,
  });

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
            await setDoc(userDocRef, {
              notVerifiedToken: token,
            }, { merge: true })
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
      console.log(doc.data());
      setUserDoc({ ...doc.data(), uid: doc.id });
    })

    return () => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
      }
    }
  }, [user]);

  useEffect(() => {
    if (userDoc.songs) {
      setLoading(false);
    }
  }, [userDoc.songs]);

  const tokenVerified = (newToken === userDoc.notVerifiedToken || newToken === 0 || userDoc.notVerifiedToken === undefined || userDoc.notVerifiedToken === 0) ? false : true;

  return (
    <SubContext.Provider
      value={{
        user,
        userDoc,
        loading,
        setLoading
      }}>
      {user && !loading && !tokenVerified && <VerifyEmail />}
      {props.children}
    </SubContext.Provider>
  )
}

export default SubContext;