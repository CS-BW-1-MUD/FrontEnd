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
               type="password" name="password" placeholder="enter your password"
                />
                <p className="text">*Password must be at least 6 characters.</p>
                {touched.password && errors.password && (<p className="errors">{errors.password}</p>)} 
                
            
            <div className="footer">
            <button type="submit" className="btn">Register</button>
            
            </div>
            </Form>
            </div>
            </div>
            
        );
};
const FormikRegistration = withFormik({
    mapPropsToValues({ username,  password, passwordVerify, name}) {
        return{
           
            username: username || "",
            password: password || ""
        };
    },

    validationSchema: yup.object().shape({
        username: yup
            .string()
            .required("Username is required"),
        password: yup
            .string()
            .required("Password is required")
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



