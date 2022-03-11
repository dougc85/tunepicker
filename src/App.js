import { React, useEffect, useState } from 'react';
import './App.css';
import PickController from './components/PickController/PickController';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import FrontPage from './components/FrontPage/FrontPage';
import Library from './components/Library/Library';
import Set from './components/Library/Set/Set';

import { db, auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection, doc, getDocs, getDoc, onSnapshot,
} from 'firebase/firestore';

function App() {

  const [user, setUser] = useState('');
  const [sets, setSets] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentLibSet, setCurrentLibSet] = useState({});
  const [showAlreadyInLibrary, setShowAlreadyInLibrary] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubAuthChange = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, 'users', currentUser.uid);
        if (location.pathname === '/login' || location.pathname === '/signup') {
          navigate('/');
        }
        else {
          navigate(location.pathname);
        }
      }
      else {
        setUser('');
        if (location.pathname !== '/signup') {
          navigate('/login');
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
    const unsubscribeSets = onSnapshot(collection(doc(db, 'users', user.uid), 'sets'), (snapshot) => {

      const setsTemp = {};
      snapshot.docs.forEach((doc) => {
        const setTemp = doc.data();
        setsTemp[setTemp.setName] = { ...setTemp };
      })
      setSets(setsTemp);
      setLoading(false);
    })

    return () => {
      if (unsubscribeSets) {
        unsubscribeSets();
      }
    }
  }, [user]);

  useEffect(() => {
    console.log(sets);
  }, [sets]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header user={user} />}>
          <Route index element={<FrontPage user={user.email} />} />
          <Route path="/controller" element={<PickController />} />
          <Route path="/library" element={<Library sets={sets} setCurrentLibSet={setCurrentLibSet} user={user} loading={loading} />} />
          <Route path="/library/:setName" element={<Set sets={sets} user={user} loading={loading} setShowAlreadyInLibrary={setShowAlreadyInLibrary} showAlreadyInLibrary={showAlreadyInLibrary} />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>

    </div>
  );
}

export default App;
