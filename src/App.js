import React, { useState, useEffect } from "react";
import fireb from "./firebaseConfig"
import Login from "./components/Login"
import Main from "./components/Main"
import './App.css';

import { ChatRoom } from "./components/ChatRoom"

import { Switch, Route } from "react-router-dom"


function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  }

  const handleLogin = () => {
    clearErrors();
    fireb.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          default: break;
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message)
            break;
        }
      })
  }

  const handleSignup = () => {
    clearErrors();
    fireb.auth().createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          default: break;
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message)
            break;
        }
      })
  }

  const handleLogout = () => {
    fireb.auth().signOut();
  }

  const authListener = () => {
    fireb.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user)
      } else {
        setUser("")
      }
    })
  }

  useEffect(() => {
    authListener();
  }, [])

  return (
    <Switch>
      <Route exact path="/">
        <div className="App">
          {user ? (<Main handleLogout={handleLogout}></Main>
          )
            :
            (<Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              emailError={emailError}
              passwordError={passwordError}
            />)}
        </div>
      </Route>

      <Route exact path="/chat/:chatname">
        <ChatRoom></ChatRoom>
      </Route>
    </Switch>
  );
}

export default App;
