import React from "react";
import loginImg from "../../login.png";
import { axiosWithAuth } from '../../utils/axiosWithAuth';


class Login extends React.Component {
    constructor(props)
    {
    super();
    this.state = {
        credentials: {
            username: '',
            password: ''
        },
        isFetching: false
    };
    }

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials, 
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        this.setState({
            isFetching: true
        });
        axiosWithAuth()
        .post('/login', this.state.credentials)
        .then(res =>{
            localStorage.setItem('token', res.data.token);
            this.props.history.push('/player-dashboard');
    })
        .catch(err => console.log(err));
    };
    render() {
        localStorage.clear()
        return (
        <div className="base-container">
        <div className="header"><h1>Welcome Back!</h1></div>
            <div className="content">
            <div className="image">
            <img src={loginImg} alt="treasure hunt"/>
            </div>
            <div className="form">
                <div className="form-group">
                
                <input type="text" name="username" placeholder="enter your username"
                value ={this.state.credentials.username} onChange={this.handleChange}/>
                </div>
                 <div className="form-group">
               
                <input type="password" name="password" placeholder="enter your password"
                value ={this.state.credentials.password} onChange={this.handleChange}/>
                </div>
                </div>
            </div>
            <div className="footer">
            <button type="submit" className="btn">Login</button>
                {this.state.isFetching && 'logging in'}
            </div>
            </div>
        )
    };
        }


    

export default Login;

