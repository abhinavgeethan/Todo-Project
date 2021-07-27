export default function validateInfo(values) {
    let errors = {};
  
    if (!values.username.trim()) {
      errors.username = 'Username required';
    }else if (values.username.length>19) {
      errors.username = 'Username too long.';
    }
    
    if (!/^[A-Za-z]+/.test(values.name.trim())) {
      errors.name = 'Enter a valid name';
    }else if (values.name.length>900) {
      errors.name = 'Name too long.';
    }
  
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }else if (values.email.length>99){
      errors.email='Email id too long.'
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }else if (values.password.length>100){
      errors.password='Password too long.';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
    return errors;
  }