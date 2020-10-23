import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import Navbar from "./components/Navbar";
import ApplicationViews from "./components/ApplicationViews";
import './styles/main.css';

function App() {
  return (
    <Router>
      <UserProvider>

        <Navbar />
        <ApplicationViews />

      </UserProvider>
    </Router >
  );
}

export default App;
