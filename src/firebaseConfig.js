import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  // connectAuthEmulator,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAh1y9xGrzefm2XI6_Z9gmiZT85cuyzQQs",
  authDomain: "tunepicker-59159.firebaseapp.com",
  projectId: "tunepicker-59159",
  storageBucket: "tunepicker-59159.appspot.com",
  messagingSenderId: "575985420793",
  appId: "1:575985420793:web:11beb15eb6ea87ad99d528"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
//connectAuthEmulator(auth, "http://localhost:9099/");

export {
  firebaseApp,
  db,
  auth
};