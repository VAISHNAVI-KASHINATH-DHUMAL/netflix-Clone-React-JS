//Importing files, package, firebase, hooks
import React from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/logo.svg';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/index';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

//Assigned initial Values for validation
const initialValues = {
  email: "",
  password: "",
};

function SignUp() {
  //used useNavigate() hook for navigation
  const navigate = useNavigate();

  //Validation using formik npm package
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: false,

    //Function for validation (formik and yup) and authentication (firebase)
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();

      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          console.log("User created:", userCredential.user.values);
          //Navigate to home page
          navigate('/home');
        })
        .catch((error) => {
          console.error("Error during sign-up:", error.message);
        });
    },
  });
  console.log(errors);

  return (
    <>
      <nav className="navbar">
        <Link to="/"><img src={Logo} alt="logo" className="width-5 height-5" /></Link>
      </nav>

      {/*Registration Form */}
      <div className="form-wrapper">
        <h2>Create Account</h2>
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

          {/*Password*/}
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

          <button type="submit">Sign Up</button>
          <div className="form-help">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Link to="/">Need help?</Link>
          </div>
        </form>
        <p>Already have an account? <Link to="/">Login</Link></p>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're
          <Link to="/">Learn More.</Link>
        </small>
      </div>
    </>
  )
}

export default SignUp;
