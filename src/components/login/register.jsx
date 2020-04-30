import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import loginImg from "../../login.png";


const Register = ({ values, errors, touched, status, ...props}) => {
    console.log("props", props)
    const [player, setPlayer] = useState([]);

    useEffect(() => {
        status && setPlayer(player => [...player, status]);
}, [status]);
   
        return (
             <div className="base-container">
        <div className="header"><h1>Sign Up Here!</h1></div>
            <div className="content">
            <div className="image">
            <img src={loginImg} alt="treasure hunt"/>
            </div>
            <Form className="form">       
                
                <Field className="field username form-group"
                
                 type="text" name="username" placeholder="enter username"
                />
                {touched.username && errors.username && (<p className="errors">{errors.username}</p>)} 
                 <Field className="form-group field password" 
               type="password" name="password1" placeholder="enter your password"
                />
           
                {touched.password1 && errors.password1 && (<p className="errors">{errors.password1}</p>)} 
                <Field className="form-group field password" 
               type="password" name="password2" placeholder="confirm your password"
                />
                
                {touched.password2 && errors.password2 && (<p className="errors">{errors.password2}</p>)} 
                
            
            <div className="footer">
            <button type="submit" className="btn">Register</button>
            
            </div>
            </Form>
            </div>
            </div>
            
        );
};
const FormikRegistration = withFormik({
    mapPropsToValues({ username,  password1, password2, name}) {
        return{
           
            username: username || "",
            password1: password1 || "",
            password2: password2 || "",
        };
    },

    validationSchema: yup.object().shape({
        username: yup
            .string()
            .required("Username is required"),
        password1: yup
            .string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters.")
            .max(20, "Password must not exceed 20 characters."),   
        password2: yup
            .string()
            .required("Please confirm your password")
            .min(6, "Password must be at least 6 characters.")
            .max(20, "Password must not exceed 20 characters.")       
    }),

    handleSubmit(values, { props }) {
        axios
            .post("https://mud-game2.herokuapp.com/api/registration", values)
            .then(
                props.history.push(
                    "/login"
                )
            )
            .catch(err => console.log(err.response));
    }
})(Register);   
        


export default FormikRegistration   



