import React, { createContext,useEffect,useState } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Components/Home';
import { UserProfile } from './Components/UserProfile';
import { EditProfile } from './Components/EditProfile.js';
import LikedPosts from './Components/LikedPosts';
import SavedPosts from './Components/SavedPosts';
import UserFriends from './Components/UserFriends.js';
import LikedBy from './Components/LikedBy';
import Search from './Components/Search'
import { useLocation } from 'react-router-dom'
import ViewPost from './Components/ViewPost';
import axios from 'axios';
import AddPost from './Components/AddPost';
import Messenger from './Components/Messenger';


const App = () => {
  return (
    <>
      <BrowserRouter>
      {/* <user.Provider value={fetcheduser}> */}
        <Switch>
          <Route exact path='/' component={Login} ></Route>
          <Route path='/Signup' component={Signup}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/userProfile/:id" component={UserProfile}></Route>
          <Route path="/editProfile" component={EditProfile}></Route>
          <Route path="/likedPosts/:id"><LikedPosts /></Route>
          <Route path="/savedPosts/:id"><SavedPosts /></Route>
          <Route path="/userFriends/:id" component={UserFriends}></Route>
          <Route path="/likedBy/:postId"> <LikedBy /> </Route>
          <Route path="/searchProfile/:searchTerm">  <Search /> </Route>
          <Route path="/viewPost/:postId">  <ViewPost /> </Route>
          <Route path="/main/:id"><App/></Route>
          <Route path='/AddPost' component={AddPost}></Route>
          <Route path='/Messenger'> <Messenger /></Route>
          <Route path='/Messenger/:cid'><Messenger/></Route>

        </Switch>
        {/* </user.Provider> */}
      </BrowserRouter>
    </>
  );
}

export default App;
