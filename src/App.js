import { React, useState, useEffect } from 'react';
import PickController from './components/PickController/PickController';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import FrontPage from './components/FrontPage/FrontPage';
import Library from './components/Library/Library';
import Set from './components/Library/Set/Set';
import Sets from './components/Library/Sets/Sets';
import TunesIWantToLearn from './components/TunesIWantToLearn/TunesIWantToLearn';
import AllSongs from './components/Library/AllSongs/AllSongs';
import Song from './components/Library/Song/Song';
import GlobalStyles from './GlobalStyles';
import Help from './components/Help/Help';
import Contact from './components/Contact/Contact';
import Settings from './components/Settings/Settings';


function App() {

  const [showAlreadyInLibrary, setShowAlreadyInLibrary] = useState(false);

  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<FrontPage />} />
          <Route path="/controller" element={<PickController />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/allsongs" element={<AllSongs />} />
          <Route path="/library/allsongs/:songId" element={<Song />} />
          <Route path="/library/sets" element={<Sets />} />
          <Route path="/library/sets/:setId/*" element={<Set setShowAlreadyInLibrary={setShowAlreadyInLibrary} showAlreadyInLibrary={showAlreadyInLibrary} />} />
          <Route path="/tunesiwanttolearn" element={<TunesIWantToLearn />} />
          <Route path="/help" element={<Help heading={"Help Center"} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
