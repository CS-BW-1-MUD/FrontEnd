import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import loginImg from "../../login.png";


const Login = ({ values, errors, touched, status, ...props}) => {
    console.log("props", props)
    const [player, setPlayer] = useState([]);

    useEffect(() => {
        status && setPlayer(player => [...player, status]);
}, []);
   
        return (
             <div className="base-container">
        <div className="header"><h1>Login Here!</h1></div>
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
                {touched.password && errors.password && (<p className="errors">{errors.password}</p>)} 
               
            
            <div className="footer">
            <button type="submit" className="btn">Login</button>
            
            </div>
            </Form>
            </div>
            </div>
            
        );
};
const FormikLogin = withFormik({
    mapPropsToValues({ username,  password}) {
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
            .max(20, "Password must not exceed 20 characters."),
        
    }),

    handleSubmit(values, { props }) {
        const params = {
            username: values.username,
            password: values.password
          };

        axios
            .post("https://lambda-mud-test.herokuapp.com/api/login/", params)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                props.history.push(
                    "/home"
                )
                })
            .catch(err => console.log(err.response));
    }
})(Login);   
        


export default FormikLogin   
