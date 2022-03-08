import { React, useEffect, useState } from 'react';
import './App.css';
import PickController from './components/PickController/PickController';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
  const [sets, setSets] = useState([]);
  const [currentLibSet, setCurrentLibSet] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubAuthChange = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        console.log(currentUser.uid);
        setUser(currentUser);
        const userRef = doc(db, 'users', currentUser.uid);
        navigate('/');
      }
      else {
        setUser('');
        navigate('/login');
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

      console.log('snapshot');
      const setsTemp = [];
      snapshot.docs.forEach((doc) => {
        setsTemp.push({ ...doc.data() });
      })
      console.log(setsTemp, 'setsTemp');
      setSets(setsTemp);
    })

    return () => {
      if (unsubscribeSets) {
        console.log('unsubscribe');
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
          <Route path="/library" element={<Library sets={sets} setCurrentLibSet={setCurrentLibSet} user={user} />} />
          <Route path="/library/:setName" element={<Set set={currentLibSet} />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>

    </div>
  );
}

export default App;
