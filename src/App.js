import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './components/login/PrivateRoute';
import Home from "./components/login/Home";
import Login from "./components/login/login";
import Register  from "./components/login/register";
import "./App.scss";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
      credentials: {
        username: '',
        password: '',
      },
    };
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLoginActive } = this.state;

    if (isLoginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLoginActive: !prevState.isLoginActive }));
  }
 
  render() {
    const { isLoginActive } = this.state;
    const current = isLoginActive ? "Register" : "Login";
    const currentActive = isLoginActive ? "login" : "register";
    return (
      
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLoginActive && (
              <Login containerRef={ref => (this.current = ref)} />
            )}
            {!isLoginActive && (
              <Register containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
          <Router>
          <Switch>
          <PrivateRoute path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Register}/>
          </Switch>
          </Router>
        </div>
      </div>
      
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
