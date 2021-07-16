import React, {useState,useEffect} from "react";
import Modal from "react-responsive-modal";
import validate from "./ValidateInfo";
import './ModalStyle.css';
import './SignUpForm.css';

export const SignUpForm=()=>{
    const [open, setOpen] = useState(false);
    const [isUser, setisUser] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const onLogin=()=>{};
    const onSignUp=()=>{};
    function submitForm() {
      setIsSubmitted(true);
    }

    const FormSuccess = () => {
      return (
        <div className='form-content-right'>
          <h1 className='form-success'>We have received your request!</h1>
          <img className='form-img-2' src='img/img-3.svg' alt='success-image' />
        </div>
      );
    };

    const useForm = (callback, validate) => {
      const [values, setValues] = useState({
        username: '',
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
            callback();
          }
        },
        [errors]
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
              Get started with us today! Create your account by filling out the
              information below.
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
            <button className='form-input-btn' type='submit' onClick={onSignUp}>
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
      const { handleChange, handleSubmit, values, errors } = useForm(
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
            <button className='form-input-btn' type='submit' onClick={onLogin}>
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
        <button className="button" onClick={onOpenModal}>Sign Up</button>
        <Modal open={open} onClose={onCloseModal} center>
          <div className='form-container'>
            {!isSubmitted && !isUser ? (<FormSignup submitForm={submitForm} />) : (!isSubmitted && isUser ? (<FormLogin submitForm={submitForm} />) : (<FormSuccess />))}
          </div>
        </Modal>
      </div>
    );
};