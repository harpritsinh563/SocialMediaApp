import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import Home from './Components/Home';
import NavbarHome from './Components/NavbarHome';
import { UserProfile } from './Components/UserProfile';  
import { EditProfile } from './Components/EditProfile.js';
import  ViewPosts  from './Components/ViewPosts';
import  UserFriends from './Components/UserFriends.js';
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} ></Route>
          <Route path='/Signup' component={Signup}></Route>
          <Route path="/home" component = {Home}></Route>
          <Route path="/userProfile" component = {UserProfile}></Route>
          <Route path="/editProfile" component = {EditProfile}></Route>
          <Route path="/viewPosts" component = {ViewPosts}></Route>
          <Route path="/userFriends" component = {UserFriends}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
