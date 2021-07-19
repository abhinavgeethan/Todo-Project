import React from "react";
import { Route,Redirect } from "react-router";

function ProtectedRoute({auth,component: Component,...rest}){
    console.log(auth);
    return(
        <Route {...rest} render={props=>{
            console.log(auth);
            console.log(props.auth);
            if (auth){
                return <Component {...props}></Component>;
            }else{
                console.log("Redirected");
                return <Redirect to={{pathname:"/",state:{from: props.location}}}></Redirect>;
            }    
            }
        }></Route>
    );
}

export default ProtectedRoute