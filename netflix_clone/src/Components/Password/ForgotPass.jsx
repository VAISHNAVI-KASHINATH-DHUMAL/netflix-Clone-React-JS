//Importing files, package, firebase, hooks
import React from 'react';
import './ForgotPass.css';
import { forgotPassScheme } from '../schemas/index';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/logo.svg';
import { useFormik } from 'formik';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

//Assigned initial Values for validation
const initialValues = {
    email: "",
};

function ForgotPass() {
    //used useNavigate() hook for navigation
    const navigate = useNavigate();

    //Validation using formik npm package
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: forgotPassScheme,
        validateOnChange: true,
        validateOnBlur: false,

        //Function for validation (formik and yup) and authentication (firebase)
        onSubmit: (values) => {

            sendPasswordResetEmail(auth, values.email)
                .then((data) => {
                    alert("Check your gmail");
                    //Navigate to login page
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error.message);
                    alert("Invalid email");
                });
        },
    });
    console.log(errors);

    return (
        <>
            <nav className="navbar">
                <Link to="/"><img src={Logo} alt="logo" className="width-5 height-5" /></Link>
            </nav>

            {/*Forgot Password*/}
            <div className="form-wrapper">
                <h2>Forgot Password</h2>
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

                    <button type="submit">Reset</button>
                    <div className="form-help">
                        <p style={{ color: '#600080', cursor: 'pointer' }}><Link to="/">Back to login</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPass;
