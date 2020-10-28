import React, { useContext, useEffect } from "react";
import { AccountContext } from "./../providers/AccountProvider";
import { CampaignContext } from "./../providers/CampaignProvider";
import AccountPreview from "./accounts/AccountPreview"
import CampaignPreview from "./campaigns/CampaignPreview"

export default function Home() {
  const { accounts, getAllAccounts } = useContext(AccountContext);
  const { campaigns, getAllCampaigns } = useContext(CampaignContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getAllAccounts();
    getAllCampaigns();
  }, []);

  return (
    <>
      <main className="home-container">
        <div className="homeContainer-contents">
          <section className="userDetails">
            <div className="userImage">
              {!sessionUser.imageUrl ? <img className="userProfilePic" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490031/icons/profileNav_lord6y.png" alt="user-image" /> :
                <img className="userProfilePic" src={sessionUser.imageUrl} alt="user-image" />}
            </div>
            <p className="user-name">{sessionUser.firstName} {sessionUser.lastName}</p>
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
                <div>
                  <div className="addBtn">
                    <a className="mainBtn" href="/accounts/add">+ New Account</a>
                  </div>
                </div>
                {accounts.map(a =>
                  <AccountPreview key={a.id} account={a} />
                )}

              </section>

              <section className="campaign-container">
                <h3 className="dashboardTitle">Campaign Activity</h3>
                <div>
                  <div className="addBtn">
                    <a className="mainBtn" href="/campaigns/add">+ New Campaign</a>
                  </div>
                </div>
                {campaigns.map(c =>
                  <CampaignPreview key={c.id} campaign={c} />
                )}
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