import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { AccountProvider } from "./providers/AccountProvider";
import { CampaignProvider } from './providers/CampaignProvider';
import Navbar from "./components/Navbar";
import ApplicationViews from "./components/ApplicationViews";
import './styles/main.css';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <AccountProvider>
          <CampaignProvider>

          <Navbar />
          <ApplicationViews />

          </CampaignProvider>
        </AccountProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;
