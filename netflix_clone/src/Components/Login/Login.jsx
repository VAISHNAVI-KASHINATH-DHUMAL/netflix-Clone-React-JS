//Importing files, package, firebase, hooks 
import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/logo.svg';
import { useFormik } from 'formik';
import { loginScheme } from '../schemas/index';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

//Assigned initial Values for validation
const initialValues = {
  email: "",
  password: "",
};

function Login() {
  //used useNavigate() hook for navigation
  const navigate = useNavigate();

  //Validation using formik npm package
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginScheme,
    validateOnChange: true,
    validateOnBlur: false,

    //Function for validation (formik and yup) and authentication (firebase)
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();

      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          console.log(userCredential.user.values);
          //Navigate to home page
          navigate('/home');
        })
        .catch((error) => {
          console.log(error.message);
          alert("Invalid email and password");
        });
    },
  });
  console.log(errors);

  //Forgot Password Reset Button 
  const handleReset = () => {
    navigate('/reset');
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/"><img src={Logo} alt="logo" className="width-5 height-5" /></Link>
      </nav>

      {/*Login Form */}
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <form id="loginForm" onSubmit={handleSubmit}>

          {/*Email*/}
          <div className="form-control">
            <input
              id="email"
              name="email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete='off'
              required />
            <label htmlFor="email">Email or phone number</label>
          </div>
          {errors.email && touched.email ? (
            <p className='form-error'>{errors.email}</p>
          ) : null}

          {/* Password */}
          <div className="form-control">
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete='off'
              required />
            <label htmlFor="password">Password</label>
          </div>
          {errors.password && touched.password ? (
            <p className='form-error'>{errors.password}</p>
          ) : null}

          <button type="submit">Sign In</button>
          <div className="form-help">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <p onClick={handleReset} style={{ color: '#600080', cursor: 'pointer' }}>Forgot Password ?</p>
          </div>
        </form>
        <p>New to Netflix? <Link to="/signup">Sign Up</Link></p>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're
          <Link to="/">Learn More.</Link>
        </small>
      </div>
    </>
  )
}

export default Login;
