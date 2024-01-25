//importing Yup npm package for condition of validation
import * as Yup from 'yup';

//signUpSchema for Registeration
export const signUpSchema = Yup.object({
    email : Yup.string().email().required("Please enter your email"),
    password : Yup.string().min(6).required("Please enter your password"),
});

//loginSchema for Login
export const loginScheme = Yup.object({
    email : Yup.string().email().required("Please enter your email"),
    password : Yup.string().min(6).required("Please enter your password")
});

//forgotPassSchema for forgot password
export const forgotPassScheme = Yup.object({
    email : Yup.string().email('Invalid email address').required("Please enter your email"),
});