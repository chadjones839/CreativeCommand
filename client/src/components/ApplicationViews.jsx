/*eslint-disable*/
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import AccountList from "./accounts/AccountList"
import AccountDetail from "./accounts/AccountDetail"
import AccountAddForm from "./accounts/AccountAddForm"
import AccountEditForm from "./accounts/AccountEditForm"
import AccountDelete from "./accounts/AccountDelete"
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        {/* ACCOUNTS */}
        <Route exact path="/accounts">
          {isLoggedIn ? <AccountList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/account/:id">
          {isLoggedIn ? <AccountDetail /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/accounts/add">
          {isLoggedIn ? <AccountAddForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/account/edit/:id">
          {isLoggedIn ? <AccountEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/account/delete/:id">
          {isLoggedIn ? <AccountDelete /> : <Redirect to="/login" />}
        </Route> 

      </Switch>
    </main>

  )
}