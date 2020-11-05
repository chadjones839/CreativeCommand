/*eslint-disable*/
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
//ACCOUNT IMPORTS
import AccountList from "./accounts/AccountList"
import AccountDetail from "./accounts/AccountDetail"
import AccountAddForm from "./accounts/AccountAddForm"
import AccountEditForm from "./accounts/AccountEditForm"
import AccountDelete from "./accounts/AccountDelete"
//CAMPAIGN IMPORTS
import CampaignList from "./campaigns/CampaignList"
import CampaignDetail from "./campaigns/CampaignDetail"
import CampaignAddForm from "./campaigns/CampaignAddForm"
import CampaignAccountAddForm from "./campaigns/CampaignAccountAddForm"
import CampaignEditForm from "./campaigns/CampaignEditForm"
import CampaignDelete from "./campaigns/CampaignDelete"
//CAMPAIGN STATUS IMPORTS
import CampaignStatusEdit from "./campaignstatus/CampaignStatusEdit"


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>

        <Route path="/" exact>
          {isLoggedIn ? 
          <Home /> : <Redirect to="/login" />}
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

        {/* CAMPAIGNS */}
        <Route exact path="/campaigns">
          {isLoggedIn ? <CampaignList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/campaign/:id">
          {isLoggedIn ? <CampaignDetail /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/campaigns/add">
          {isLoggedIn ? <CampaignAddForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/campaigns/new/account-:id">
          {isLoggedIn ? <CampaignAccountAddForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/campaign/edit/:id">
          {isLoggedIn ? <CampaignEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/campaign/delete/:id">
          {isLoggedIn ? <CampaignDelete /> : <Redirect to="/login" />}
        </Route>

        {/* CAMPAIGN STATUSES */}
        <Route exact path="/campaignstatus/edit/:id">
          {isLoggedIn ? <CampaignStatusEdit /> : <Redirect to="/login" />}
        </Route>

      </Switch>
    </main>

  )
}