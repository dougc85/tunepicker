import { React, useEffect, useState } from 'react';
import './App.css';
import PickController from './components/PickController/PickController';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import FrontPage from './components/FrontPage/FrontPage';

import { db, auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection, doc, getDocs,
} from 'firebase/firestore';

function App() {

  const [user, setUser] = useState('');
  const [sets, setSets] = useState([]);
  const [setsRef, setSetsRef] = useState({});
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
        setSetsRef({});
        navigate('/login');
      }
    })

    return () => {
      unsubAuthChange();
    }
  }, []);

  useEffect(() => {
    async function initializeData() {
      try {
        const colRef = collection(db, `users/${user.uid}/sets`);
        setSetsRef(colRef);
        const setsSnapshot = await getDocs(colRef);
        const setsTemp = [];
        console.log(setsSnapshot.docs);
        setsSnapshot.docs.forEach((doc) => {
          setsTemp.push({ ...doc.data() });
        });
        setSets(setsTemp);
      }
      catch (error) {
        console.log(error);
      }
    }

    initializeData();

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
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup setSetsRef={setSetsRef} setSets={setSets} />} />
      </Routes>

    </div>
  );
}

export default App;
