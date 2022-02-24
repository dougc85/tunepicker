import './App.css';
import PickController from './components/PickController/PickController';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

function App() {


  const loggedIn = false;


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header loggedIn={loggedIn} />}>
          <Route path="/controller" element={<PickController />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </div>
  );
}

export default App;
