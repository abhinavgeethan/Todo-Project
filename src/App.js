import './App.css';
import TodoList from './components/TodoList';
import React, {useState,useEffect} from "react";
import { HomePage } from './components/homePage';
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  function loginHandler(bool_val){
    setIsLoggedIn(bool_val);
    console.log("Main Log In");
  }
  function logoutHandler(bool_val){
    setIsLoggedIn(!bool_val);
    console.log("Main Log Out");
  }

  return (
    <div className="App">
      <Router>
          <Switch>
            <ProtectedRoute auth={isLoggedIn} path="/app" component={TodoList}></ProtectedRoute>
            <Route path="/" exact render={(props)=><HomePage {...props} loginHandler={loginHandler}></HomePage>}></Route>
          </Switch>
      </Router>
    </div>
  );
}
