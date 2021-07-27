import React, {useState,useEffect} from "react";
import Modal from "react-responsive-modal";
import validate from "./ValidateInfo";
import './ModalStyle.css';
import './SignUpForm.css';
// import { Redirect } from "react-router-dom";
import {login} from "../auth";
import configData from "../config.json";

export const SignUpForm=(props)=>{
    const [openLogin, setOpenLogin] = useState(props.openLogin);
    const [openSignup, setOpenSignup] = useState(props.openSignup);
    const [isUser, setisUser] = useState(props.openLogin);
    // const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const onOpenModal = () => setOpen(true);
    const onCloseSignup = () => {
      setOpenSignup(false);
      props.closeSignup();
    };
    const onCloseLogin = () => {
      setOpenLogin(false);
      props.closeLogin();
    };

    console.log(props);

    function signup_submitForm(values) {
      // setIsSubmitted(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username": values.username,"password":values.password,"email":values.email,"name":values.name})
      };
      fetch(configData.SERVER_URL+'signup', requestOptions)
          .then(response=>response.json())
          .then(data => {
            console.log(data.signedup);
            if (data.signedup){
              setisUser(data.signedup);
              alert("Signed up succesfully!");
            }else if(data.error){
              console.error(data.error);
              console.error(data.message);
              alert(data.message);
              setOpenSignup(false);
              props.closeSignup();
            }
          })
          .catch(error=>{
            console.error("Server Unreachable");
            console.error(error);
          });
    }

    function login_submitForm(values) {
      console.log("Login Sequence");
      console.log(values);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username": values.username,"password":values.password})
      };
      fetch(configData.SERVER_URL+'login', requestOptions)
          .then(response=>response.json())
          .then(data => {
            console.log(data.loggedIn);
            console.log(data);
            if (data.loggedIn && data.access_token){
              login({"access_token":data.access_token});
              setIsLoggedIn(data.loggedIn);
              console.log(isLoggedIn);
              props.onLogin(data.loggedIn);
            }else if(data.error){
              alert(data.message);
              props.closeLogin();
              setOpenLogin(false);
            }
          })
          .catch(error=>{
            console.error("Server Unreachable");
            console.error(error);
          })
    }

    const FormSuccess = () => {
      return (
        <div className='form-content-right'>
          <h1 className='form-success'>We have received your request!</h1>
          {/* <img className='form-img-2' src='img/img-3.svg' alt='success-image' /> */}
        </div>
      );
    };

    const useForm = (callback, validate) => {
      const [values, setValues] = useState({
        username: '',
        name:'',
        email: '',
        password: '',
        password2: ''
      });
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
    
      const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
      };
    
      const handleSubmit = e => {
        e.preventDefault();
    
        setErrors(validate(values));
        setIsSubmitting(true);
      };
    
      useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            callback(values);
          }
        },
        [errors,isSubmitting,values,callback]
      );
    
      return { handleChange, handleSubmit, values, errors };
    };

    const useFormLogin = (callback, validate) => {
      console.log("usedFormLogin");
      const [values, setValues] = useState({
        username: '',
        password: '',
      });
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
    
      const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        // console.log("prevented default login");
        setErrors({});
        // console.log("Got here?");
        setIsSubmitting(true);
      };
    
      useEffect(
        () => {
          // console.log("Got till useEffect");
          if (isSubmitting) {
            console.log("Calling home");
            callback(values);
          }
        }
      );
    
      return { handleChange, handleSubmit, values, errors };
    };

    const FormSignup = ({ submitForm }) => {
      const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
      );
    
      return (
        <div className='form-content-right'>
          <form onSubmit={handleSubmit} className='form' noValidate>
            <h1>
              Create your account by filling out the information below.
            </h1>
            <div className='form-inputs'>
              <label className='form-label'>Username</label>
              <input
                className='form-input'
                type='text'
                name='username'
                placeholder='Enter your username'
                value={values.username}
                onChange={handleChange}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>
            <div className='form-inputs'>
              <label className='form-label'>Name</label>
              <input
                className='form-input'
                type='text'
                name='name'
                placeholder='Enter your name'
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className='form-inputs'>
              <label className='form-label'>Email</label>
              <input
                className='form-input'
                type='email'
                name='email'
                placeholder='Enter your email'
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className='form-inputs'>
              <label className='form-label'>Password</label>
              <input
                className='form-input'
                type='password'
                name='password'
                placeholder='Enter your password'
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className='form-inputs'>
              <label className='form-label'>Confirm Password</label>
              <input
                className='form-input'
                type='password'
                name='password2'
                placeholder='Confirm your password'
                value={values.password2}
                onChange={handleChange}
              />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>
            <button className='form-input-btn' type='submit'>
              Sign up
            </button>
            <span className='form-input-login'>
              Already have an account? Login<button onClick={()=>setisUser(true)} style={{backgroundColor:"transparent",border:"none",color:"#27cdff",cursor:"pointer"}}>here</button>
            </span>
          </form>
        </div>
      );
    };

    const FormLogin = ({ submitForm }) => {
      const { handleChange, handleSubmit, values, errors } = useFormLogin(
        submitForm,
        validate
      );
    
      return (
        <div className='form-content-right'>
          <form onSubmit={handleSubmit} className='form' noValidate>
            <h1>
              Welcome Back!
            </h1>
            <div className='form-inputs'>
              <label className='form-label'>Username</label>
              <input
                className='form-input'
                type='text'
                name='username'
                placeholder='Enter your username'
                value={values.username}
                onChange={handleChange}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>
            <div className='form-inputs'>
              <label className='form-label'>Password</label>
              <input
                className='form-input'
                type='password'
                name='password'
                placeholder='Enter your password'
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <button className='form-input-btn' type='submit'>
              Log In
            </button>
            <span className='form-input-login'>
              Don't have an account? Sign Up<button onClick={()=>setisUser(false)} style={{backgroundColor:"transparent",border:"none",color:"#27cdff",cursor:"pointer"}}>here</button>
            </span>
          </form>
        </div>
      );
    };

    return (
      <div>
        {/* <button className="button" onClick={onOpenModal}>Sign Up</button> */}
        <Modal open={openSignup} onClose={onCloseSignup} center>
          <div className='form-container'>
            {!isUser ? (<FormSignup submitForm={signup_submitForm} />) : (isUser ? (<FormLogin submitForm={login_submitForm} />) : (<FormSuccess />))}
          </div>
        </Modal>
        <Modal open={openLogin} onClose={onCloseLogin} center>
          <div className='form-container'>
            {(isUser ? (<FormLogin submitForm={login_submitForm} />) : (!isUser ? (<FormSignup submitForm={signup_submitForm} />) : (<FormSuccess />)))}
          </div>
        </Modal>
      </div>
    );
};