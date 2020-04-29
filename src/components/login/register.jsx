import React from "react";
import loginImg from "../../login.png";


export class Register extends React.Component {
    constructor(props) {
        super(props);
  }
    render() {
        return <div className="base-container">
        <div className="header"><h1>Sign Up Here!</h1></div>
            <div className="content">
            <div className="image">
            <img src={loginImg} alt="treasure hunt"/>
            </div>
            <div className="form">
            <div className="form-group">
                
                <input type="email" name="email" placeholder="enter your email"/>
                </div>
                <div className="form-group">
                
                <input type="text" name="username" placeholder="enter username"/>
                </div>
                 <div className="form-group">
                
                <input type="password" name="password" placeholder="enter your password"/>
                </div>
                </div>
            </div>
            <div className="footer">
            <button type="button" className="btn">Register</button>
            
            </div>
            </div>
            
            
        }


    }



