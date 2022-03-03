import { React, useEffect, useState } from 'react';
import './App.css';
import PickController from './components/PickController/PickController';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import FrontPage from './components/FrontPage/FrontPage';

import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function App() {

  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const watchAuthState = () => {
      onAuthStateChanged(auth, currentUser => {
        console.log(currentUser);
        if (currentUser) {
          console.log(currentUser);
          setUser(currentUser);
          navigate('/');
        }
        else {
          navigate('/login');
        }
      })
    }
    watchAuthState();
  }, []);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header user={user} />}>
          <Route index element={<FrontPage user={user.email} />} />
          <Route path="/controller" element={<PickController />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </div>
  );
}

export default App;
