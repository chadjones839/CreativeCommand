import React, { useContext, useEffect } from "react";
import { AccountContext } from "./../providers/AccountProvider";
import AccountPreview from "./accounts/AccountPreview"

export default function Home() {
  const { accounts, getAllAccounts } = useContext(AccountContext);

    
    useEffect(() => {
        getAllAccounts();
    }, []);

  return (
   <>
    <main className="home-container">
      <div className="homeContainer-contents">
        <section className="userDetails">
          User Details
        </section>
        <div className="home-contents">
          <div className="dashboard-container">
            <section className="dashboard-details">
              Overview Container
            </section>
          </div>
            <div className="overview-container">
            <section className="account-container">
              <h3 className="dashboardTitle">Account Activity</h3>

              {accounts.map(a =>
                <AccountPreview key={a.id} account={a} />
              )}

            </section>

            <section className="campaign-container">
              <h3 className="dashboardTitle">Campaign Activity</h3>
            </section>

            <section className="campaignTracker-container">
              <h3 className="dashboardTitle">Campaign Tracker</h3>
            </section>
          </div>
        </div>
      </div>
    </main>
   </>
  );
}