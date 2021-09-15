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

const App = () => {

  // console.log(window.location.pathname)
  // const user = createContext();
  // const location = useLocation();
  // console.log(location)
  // // const path = location.pathname.split('/')[1];
  // // const path2 = location.pathname.split('/')[2];
  // // console.log(path)
  // // console.log(path2)
  // const [fetcheduser, setfetcheduser] = useState({})
  // // useEffect(() => {
  // //   const fetchuser = async () => {
  // //     // if (path == "main") {
  // //     //   const fetched = await axios.get('/user/' + path2);
  // //     //   // console.log(fetched);
  // //     //   setfetcheduser(fetched.data)
  // //     //   user = fetched.data
  // //     //   console.log(fetcheduser)
  // //     // }
  // //   }
  // //   fetchuser()
  // // }, [])



  return (
    <>
      <BrowserRouter>
      {/* <user.Provider value={fetcheduser}> */}
        <Switch>
          <Route exact path='/' component={Login} ></Route>
          <Route path='/Signup' component={Signup}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/userProfile" component={UserProfile}></Route>
          <Route path="/editProfile" component={EditProfile}></Route>
          <Route path="/likedPosts/:id"><LikedPosts /></Route>
          <Route path="/savedPosts/:id"><SavedPosts /></Route>
          <Route path="/userFriends" component={UserFriends}></Route>
          <Route path="/likedBy/:postId"> <LikedBy /> </Route>
          <Route path="/searchProfile/:searchTerm">  <Search /> </Route>
          <Route path="/viewPost/:postId">  <ViewPost /> </Route>
          <Route path="/main/:id"><App/></Route>
        </Switch>
        {/* </user.Provider> */}
      </BrowserRouter>
    </>
  );
}

export default App;
