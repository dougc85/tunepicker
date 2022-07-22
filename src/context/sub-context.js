import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import {
  doc, onSnapshot, setDoc
} from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import ErrorModal from '../components/generics/ErrorModal/ErrorModal';

const defaultContext = {
  user: undefined,
  setUser: undefined,
  userDoc: undefined,
  loading: undefined,
  setLoading: undefined,
  handleNetworkError: undefined,
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
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleNetworkError(message) {
    setErrorMessage(message);
    setShowErrorModal(true);
  }

  useEffect(() => {
    let unsubAuthChange;

    try {
      unsubAuthChange = onAuthStateChanged(auth, async (currentUser) => {
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
    }
    catch (error) {
      console.log(error.message);
    }


    return () => {
      unsubAuthChange();
    }
  }, []);

  useEffect(() => {

    if (!user) {
      return;
    }

    let unsubscribeUserDoc;

    try {
      unsubscribeUserDoc = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        setUserDoc({ ...doc.data(), uid: doc.id });
      })
    } catch (error) {
      console.log(error.message);
    }


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
        setLoading,
        handleNetworkError,
      }}>
      {user && !loading && !tokenVerified && <VerifyEmail />}
      {showErrorModal && <ErrorModal handleOutsideClick={() => { setShowErrorModal(false) }} message={errorMessage} />}
      {props.children}
    </SubContext.Provider>
  )
}

export default SubContext;