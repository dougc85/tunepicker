import { React, useState, useContext } from 'react';
import PickController from './components/PickController/PickController';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import FrontPage from './components/FrontPage/FrontPage';
import Library from './components/Library/Library';
import Set from './components/Library/Set/Set';
import Sets from './components/Library/Sets/Sets';
import AllSongs from './components/Library/AllSongs/AllSongs';
import Song from './components/Library/Song/Song';
import { db } from './firebaseConfig';
import SubContext from './context/sub-context';
import {
  doc, getDoc
} from 'firebase/firestore';
import GlobalStyles from './GlobalStyles';


function App() {

  const [currentSong, setCurrentSong] = useState(undefined);
  const [showAlreadyInLibrary, setShowAlreadyInLibrary] = useState(false);

  const context = useContext(SubContext);
  const { user, setUser, userDoc, loading } = context;


  async function getSongData(id) {
    const userFirebase = await getDoc(doc(db, 'users', user.uid));
    const userData = userFirebase.data();
    setCurrentSong(userData.songs[id]);
  }

  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<FrontPage />} />
          <Route path="/controller" element={<PickController />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/allsongs" element={<AllSongs setCurrentSong={setCurrentSong} />} />
          <Route path="/library/allsongs/:songId" element={<Song song={currentSong} getSongData={getSongData} setCurrentSong={setCurrentSong} />} />
          <Route path="/library/sets" element={<Sets />} />
          <Route path="/library/sets/:setId/*" element={<Set currentSong={currentSong} getSongData={getSongData} setShowAlreadyInLibrary={setShowAlreadyInLibrary} showAlreadyInLibrary={showAlreadyInLibrary} setCurrentSong={setCurrentSong} />} />
        </Route>
        <Route path="/welcome" element={<Welcome setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
