import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Home = lazy(() => import("./pages/homepage/Home"));
const Profle = lazy(() => import("./pages/profile/Profile"));
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/signup/signup"));
const Messanger = lazy(() => import("./pages/messanger/Messanger"));

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path="/" exact component={user ? Home : Signup} />
            <Route
              path="/profile/:username"
              exact
              component={user ? Profle : Signup}
            />
            <Route path="/Login" exact component={!user ? Login : Home} />
            <Route path="/Signup" exact component={!user ? Signup : Home} />
            <Route
              path="/Messanger"
              exact
              component={!user ? Signup : Messanger}
            />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
