import './App.css';
import TodoList from './components/TodoList';
import {SignUpForm} from './components/SignUpForm';
import React, {useState,useEffect} from "react";

function App() {
  const [openLogin,setOpenLogin]=useState(false);
  const onOpenLogin = () => setOpenLogin(true);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const onLogIn = (login=false) => setIsLoggedIn(login);
  const [openSignup,setOpenSignup]=useState(false);
  const onOpenSignup = () => {
    setOpenSignup(true);
    console.log("Done");
  };
  return (
    <div className="App">
      {(!isLoggedIn)?(
        <div className="hero-page">
          <div className="hero-left">
            <div className="text-left-align">
              <span className="hero-text hero-title">Todo WebApp</span>
              <span className="hero-text">Genskill Project by Abhinav</span>
            </div>
          </div>
          <div className="hero-right">
            <h1 style={{color:"rgb(39, 176, 255)"}}>Welcome!</h1>
            <div className="main-buttons">
              <button className="main-button"onClick={onOpenLogin}>Log In</button>
              <button className="main-button"onClick={onOpenSignup}>Sign Up</button>
            </div>
            <div className="link-buttons">
              <button>Github</button>
              <button>Netlify</button>
            </div>
          </div>
        </div>
      ):
      (<TodoList></TodoList>)}
      {(openLogin||openSignup)?(<SignUpForm openSignup={openSignup} openLogin={openLogin} onLogin={onLogIn}></SignUpForm>):null}
    </div>
  );
}

export default App;
