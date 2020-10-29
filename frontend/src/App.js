import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import TheContext from './TheContext';
import Home from "./components/Home"
import AddItems from "./components/AddItems"
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import actions from "./api/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";
import ShowList from "./components/ShowList"
import { NotificationContainer, NotificationManager } from 'react-notifications';


const App = () => {

  let [user, setUser] = useState(null)
  const [open, setOpen] = useState(false);
console.log(process.env)
  useEffect(() => {
    async function getUser() {
      let user = await actions.getUser();
      console.log('user is', user)
      setUser(user?.data)
    }
    getUser();
  }, [])

  const logOut = async () => {
    let res = await actions.logOut();
    setUser(null);
  };

  const history = useHistory();


  return (
    <TheContext.Provider value={{ history, user, setUser }}>
     <nav>
     <Link to = "/">
  <img src = "./CheckMateBlue.png"  className="checklogo"/>
  </Link>
</nav>

      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route
          exact
          path="/sign-up"
          render={(props) => <SignUp {...props} setUser={setUser} />}
        />
        <Route
          exact
          path="/log-in"
          render={(props) => <LogIn {...props} setUser={setUser} />}
        />
         <Route
          exact
          path="/see-list"
          render={(props) =><ShowList {...props} />}
        />
        <Route
          exact
          path="/profile"
          render={(props) => <Profile {...props} />}
        />
<Route
          exact
          path="/list/:listid"
          render={(props) => <AddItems {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
      {!user && <GoogleAuth setUser={setUser} />}
      {!user && <GoogleAuthLogin setUser={setUser} />}

      <NotificationContainer />

    </TheContext.Provider>

  )

}
export default App;
