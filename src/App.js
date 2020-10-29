import React, {Component, Fragment} from 'react';
import { Switch, Route, Link } from "react-router-dom";
import './index.css';

import AuthTest from "./Components/Administrative/AuthTest";
import axiosInstance from "./Authentication/Api";
import Login from "./Components/User/Login/Login"
import Register from "./Components/User/Register/Register"

class App extends Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout() {
    try {
      const response = await axiosInstance.post('users/token/blacklist/', {
        "refresh_token": localStorage.getItem("refresh_token")
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      return response;
    }
    catch (e) {
      console.log(e);
    }
  };


  render() {
    return (
        <Fragment>
          <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/login/"}>Login</Link>
            <Link to={"/register/"}>Register</Link>
            <Link to={"/auth-test/"}>Auth Test</Link>
            <button onClick={this.handleLogout}>Logout</button>
          </nav>
          <main>
            <h1>PyroSource</h1>
            <Switch>
              <Route exact path={"/login/"} component={Login}/>
              <Route exact path={"/register/"} component={Register}/>
              <Route exact path={"/auth-test/"} component={AuthTest}/>
              <Route path={"/"} render={() => <div>Home</div>}/>
            </Switch>
          </main>
        </Fragment>
    );
  }
}

export default App;