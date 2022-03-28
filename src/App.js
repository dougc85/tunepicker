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
import Sets from './components/Library/Sets/Sets';
import AllSongs from './components/Library/AllSongs/AllSongs';
import Song from './components/Library/Song/Song';

import { db, auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection, doc, getDocs, getDoc, onSnapshot,
} from 'firebase/firestore';


function App() {

  const [user, setUser] = useState('');
  const [sets, setSets] = useState(undefined);
  const [userDoc, setUserDoc] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState({});
  const [showAlreadyInLibrary, setShowAlreadyInLibrary] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const unsubAuthChange = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
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
  }, [location.pathname, navigate]);

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
    })

    return () => {
      if (unsubscribeSets) {
        unsubscribeSets();
      }
    }
  }, [user]);

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
    if (sets) {
      setLoading(false)
    }
  }, [sets]);

  async function getSongData(title) {
    const userFirebase = await getDoc(doc(db, 'users', user.uid));
    const userData = userFirebase.data();
    setCurrentSong({ ...userData.songs[title], title });
  }



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header user={user} />}>
          <Route index element={<FrontPage user={user.email} />} />
          <Route path="/controller" element={<PickController />} />
          <Route path="/library" element={<Library sets={sets} user={user} loading={loading} />} />
          <Route path="/library/allsongs" element={<AllSongs user={user} setCurrentSong={setCurrentSong} />} />
          <Route path="/library/allsongs/:songTitle" element={<Song song={currentSong} loading={loading} getSongData={getSongData} sets={sets} user={user} setCurrentSong={setCurrentSong} />} />
          <Route path="/library/sets" element={<Sets loading={loading} setNames={userDoc && userDoc.setNames} user={user} />} />
          <Route path="/library/sets/:setName" element={<Set sets={sets} user={user} loading={loading} setShowAlreadyInLibrary={setShowAlreadyInLibrary} showAlreadyInLibrary={showAlreadyInLibrary} setCurrentSong={setCurrentSong} />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>

    </div>
  );
}

export default App;
