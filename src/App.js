import React from 'react';
import  {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);

function App() {
  const [newUser ,setNewUser] =useState(false);
  const [user, setUser] = useState(
    {
      isSignedIn: false,
    
      name: '',
      email: '',
      password:'',
      photo: '', 
      error: '',  
      success: false,                   
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
  const handleSubmit = (e) => 
  {
   if (newUser && user.email && user.password)
       {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          const newUserInfo={...user};
          newUserInfo.error='';
          newUserInfo.success=true;
          setUser(newUserInfo);
          console.log(res);
        })
        .catch(error => {
          // Handle Errors here.
          const newUserInfo={...user};
          newUserInfo.error =error.message;
          newUserInfo.success=false;
          setUser(newUserInfo);
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // console.log(errorCode, errorMessage);
          // ...
        });
       }
       if (!newUser && user.email && user.password)
       {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          const newUserInfo={...user};
          newUserInfo.error='';
          newUserInfo.success=true;
          setUser(newUserInfo);
          console.log(res);
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          const newUserInfo={...user};
          newUserInfo.error =error.message;
          newUserInfo.success=false;
          setUser(newUserInfo);
          // ...
        });
       }
        e.preventDefault();

  }
  const handleBlur = (e) => {
// console.log(e.target.value, e.target.name);
let isFiledValid =  true;
if(e.target.name === 'email')
{
  isFiledValid = /\S+@\S+\.\S+/.test(e.target.value);
// console.log(isEmailValid);
}

if(e.target.name === 'password')
{
  const isPasswordValid =e.target.value.length > 6;
  const passwordHasNumber =/\d{1}/.test(e.target.value);
  isFiledValid =isPasswordValid && passwordHasNumber;
 }


if(isFiledValid)
{
   const newUserInfo = {...user};
   newUserInfo[e.target.name] = e.target.value;
   setUser(newUserInfo);
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
     
     <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
     <label htmlFor="newUser">new user sinup</label>
     {/* <p>Name : {user.name}</p>
     <p>Email : {user.email}</p>
     <p>password : {user.password}</p> */}

     <form onSubmit={handleSubmit}>

     {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder=" Enter Your Name "/>}
     <br/>
     <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required/>
     <br/>
     <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" id="" required/>
     <br/>
     <input type="submit" value="Submit"/>

     </form>
    <p style={{color: 'red'}}>{user.error}</p>
   {user.success &&  <p style={{color: 'green'}}>user {newUser ? 'created' : 'Loged in'} successfully</p>
}
    </div>
  );
}

export default App;
