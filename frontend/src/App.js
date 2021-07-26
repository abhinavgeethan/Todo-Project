import './App.css';
import TodoList from './components/TodoList';
import React, {useState} from "react";
import { HomePage } from './components/homePage';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {useAuth} from "./auth/index.js";

export default function App() {
  // Change to FALSE PLEASE
  const [isLoggedIn,setIsLoggedIn]=useState(useAuth());
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
            <ProtectedRoute auth={isLoggedIn} logoutHandler={logoutHandler} path="/app" component={TodoList}></ProtectedRoute>
            <Route path="/" exact render={(props)=><HomePage {...props} auth={isLoggedIn} loginHandler={loginHandler}></HomePage>}></Route>
          </Switch>
      </Router>
    </div>
  );
}
