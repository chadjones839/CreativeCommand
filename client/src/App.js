import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { AccountProvider } from "./providers/AccountProvider";
import { ContactProvider } from "./providers/ContactsProvider";
import { CampaignProvider } from './providers/CampaignProvider';
import { CampaignStatusProvider } from './providers/CampaignStatusProvider';
import { ScheduleTypeProvider } from './providers/ScheduleTypeProvider';
import { PlatformProvider } from './providers/PlatformProvider';
import Navbar from "./components/Navbar";
import ApplicationViews from "./components/ApplicationViews";
import './styles/main.css';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <AccountProvider>
          <CampaignProvider>
            <ScheduleTypeProvider>
              <PlatformProvider>
                <CampaignStatusProvider>
                  <ContactProvider>

                    <Navbar />
                    <ApplicationViews />

                  </ContactProvider>
                </CampaignStatusProvider>
              </PlatformProvider>
            </ScheduleTypeProvider>
          </CampaignProvider>
        </AccountProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;
