import React,{useState} from "react";
import "./homePage.css";
import {SignUpForm} from './SignUpForm';
import { Redirect } from "react-router-dom";
import GHLogo from "../GitHub-Mark-120px-plus.png";

export const HomePage=(props)=>{
    const [openLogin,setOpenLogin]=useState(false);
    const onOpenLogin = () => setOpenLogin(true);
    const [openSignup,setOpenSignup]=useState(false);
    const onOpenSignup = () => {
        setOpenSignup(true);
        console.log("Done");
    };
    console.log(props);
    const onLogIn = (login) => {
        if (login){
            props.loginHandler(login);
            props.history.push("/app");
        }
        console.log("Changed LoggedIn state");
        // console.log(isLoggedIn);
      }
    if (props.auth[0]){
        console.log(props.auth[0]);
        return(<Redirect to="/app"></Redirect>);
    }else{
        return(
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
                    {/* <div className="link-buttons"> */}
                        {/* <button style={{display:"flex",alignItems:"center",justifyContent:"center",border:"none",fontSize:"1vw", color:"#00000099",backgroundColor:"transparent",cursor:"pointer"}}onClick={()=>{window.open("https://github.com/abhinavgeethan/Todo-Project")}}> */}
                            {/* <img src={GHLogo} width="10%"></img> */}
                            {/* <span>GitHub Repository</span> */}
                        {/* </button> */}
                        {/* <button>Netlify</button> */}
                    {/* </div> */}
                </div>
                {(openLogin||openSignup)?(<SignUpForm openSignup={openSignup} openLogin={openLogin} closeLogin={()=>{setOpenLogin(false)}} closeSignup={()=>{setOpenSignup(false)}} onLogin={onLogIn}></SignUpForm>):null}
            </div>
        );
    }
}