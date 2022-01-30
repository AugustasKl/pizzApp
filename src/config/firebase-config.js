import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDDjTL1GI_FBga1VjFhS20d5eiyvYiD_HU",
    authDomain: "reactproject-e302f.firebaseapp.com",
    databaseURL: "https://reactproject-e302f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "reactproject-e302f",
    storageBucket: "reactproject-e302f.appspot.com",
    messagingSenderId: "215055962911",
    appId: "1:215055962911:web:eb97640324eed7dbc7162a"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication= getAuth(app)
