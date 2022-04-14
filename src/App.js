import { React, useEffect, useState } from 'react';
import './App.css';
import PickController from './components/PickController/PickController';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import FrontPage from './components/FrontPage/FrontPage';
import Library from './components/Library/Library';
import Set from './components/Library/Set/Set';
import Sets from './components/Library/Sets/Sets';
import AllSongs from './components/Library/AllSongs/AllSongs';
import Song from './components/Library/Song/Song';

import { db, auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, onSnapshot,
} from 'firebase/firestore';


function App() {

  const [user, setUser] = useState('');
  const [userDoc, setUserDoc] = useState(undefined);
  const [pickerSet, setPickerSet] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(undefined);
  const [showAlreadyInLibrary, setShowAlreadyInLibrary] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const unsubAuthChange = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
        if (location.pathname === '/welcome' || location.pathname === '/signup') {
          navigate('/');
        }
        else {
          navigate(location.pathname);
        }
      }
      else {
        setUser('');
        if (location.pathname !== '/signup') {
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
    if (!userDoc) {
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



  async function getSongData(id) {
    const userFirebase = await getDoc(doc(db, 'users', user.uid));
    const userData = userFirebase.data();
    setCurrentSong(userData.songs[id]);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header user={user} />}>
          <Route index element={<FrontPage user={user.email} />} />
          <Route path="/controller" element={<PickController set={pickerSet} />} />
          <Route path="/library" element={<Library user={user} loading={loading} />} />
          <Route path="/library/allsongs" element={<AllSongs user={user} setCurrentSong={setCurrentSong} allSongs={userDoc && userDoc.songs} />} />
          <Route path="/library/allsongs/:songId" element={<Song song={currentSong} loading={loading} getSongData={getSongData} setNames={userDoc && userDoc.setNames} user={user} setCurrentSong={setCurrentSong} allSongs={userDoc && userDoc.songs} />} />
          <Route path="/library/sets" element={<Sets loading={loading} setNames={userDoc && userDoc.setNames} user={user} />} />
          <Route path="/library/sets/:setId/*" element={<Set setNames={userDoc && userDoc.setNames} songNames={userDoc && userDoc.songNames} allSongs={userDoc && userDoc.songs} user={user} loading={loading} currentSong={currentSong} getSongData={getSongData} setShowAlreadyInLibrary={setShowAlreadyInLibrary} showAlreadyInLibrary={showAlreadyInLibrary} setCurrentSong={setCurrentSong} />} />
        </Route>
        <Route path="/welcome" element={<Welcome setUser={setUser} />} />
      </Routes>

    </div>
  );
}

export default App;
