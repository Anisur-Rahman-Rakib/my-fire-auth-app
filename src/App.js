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
  const handleSubmit = () => {

  }
  const handleBlur = (e) => {
// console.log(e.target.value, e.target.name);
if(e.target.name === 'email'){
const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
console.log(isEmailValid);
}

if(e.target.name === 'password'){
  const isPasswordValid =e.target.value.length > 6;
  const passwordHasNumber =/\d{1}/.test(e.target.value);
  console.log(isPasswordValid && passwordHasNumber);
}
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
      
     <h1>Our Own Authentication</h1>
     <form onSubmit={handleSubmit}>
     <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required/>
     <br/>
     <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" id="" required/>
     <br/>
     <input type="submit" value="Submit"/>

     </form>

    </div>
  );
}

export default App;
