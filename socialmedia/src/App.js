import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import Home from './Components/Home';
import NavbarHome from './Components/NavbarHome';
import { UserProfile } from './Components/UserProfile';  


function App() {
  return (
    <>
    <withRouter>
      <BrowserRouter>
        {/*<Navbar/> */}
        <Switch>
          <Route exact path='/' component={Login} ></Route>
          <Route path='/Signup' component={Signup}></Route>
          <Route path="/home" component = {Home}></Route>
          <Route path="/userProfile" component = {UserProfile}></Route>
        </Switch>
        {/* <NavbarHome /> */}
        {/* <Home /> */}
      </BrowserRouter>
      </withRouter>
    </>
  );
}

export default App;
