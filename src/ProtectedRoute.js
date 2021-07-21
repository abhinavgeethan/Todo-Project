import React from "react";
import { Route,Redirect } from "react-router";

function ProtectedRoute({auth,component: Component,logoutHandler,...rest}){
    console.log(auth);
    return(
        <Route {...rest} render={props=>{
            console.log("Next two in ProtecRoute")
            console.log(auth);
            console.log(props.auth);
            console.log(props);
            if (auth){
                return <Component {...props} auth={auth} logoutHandler={logoutHandler}></Component>;
            }else{
                console.log("Redirected");
                return <Redirect to={{pathname:"/",state:{from: props.location}}}></Redirect>;
            }    
            }
        }></Route>
    );
}

export default ProtectedRoute