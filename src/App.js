import React from 'react';
import  {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      photo: '',                      
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handlesignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email,photoURL} =res.user;
      const signedInUser ={
        isSignedIn:true,
        name: displayName ,
        email: email,
        photo: photoURL,     
      }
      setUser(signedInUser);
console.log(displayName, email,photoURL);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }
  const handlesignOut = () => {
    firebase.auth().signOut()
    .then(res => {
     const signOutUser ={
       isSignedIn: false,
       name: '',
       email: '',
       photo: '',     
     } 
     setUser(signOutUser);
     console.log(res);
    })
    .catch(err => {

    })
    console.log('Sign out clicked');
  }
  return (
    <div className="App">
     { user.isSignedIn ? <button onClick={handlesignOut} >Sign Out</button> :
     <button onClick={handlesignIn} >Sign In</button>
     }
     {
       user.isSignedIn && <div> 
         <p>Welcome , {user.name}</p> 
     <p> Your email : {user.email}</p>
         <img src={user.photo} alt=""/>
         </div>
     }
    </div>
  );
}

export default App;
