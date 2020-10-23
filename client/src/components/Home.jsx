import React from "react";

export default function Hello() {
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
              <div className="accountCard">
                
              </div>
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