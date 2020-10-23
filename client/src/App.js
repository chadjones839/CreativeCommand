import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import { AccountProvider } from "./providers/AccountProvider";
import Navbar from "./components/Navbar";
import ApplicationViews from "./components/ApplicationViews";
import './styles/main.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <AccountProvider>

          <Navbar />
          <ApplicationViews />

        </AccountProvider>
      </UserProvider>
    </Router >
  );
}

export default App;
