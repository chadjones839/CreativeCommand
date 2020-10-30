/*eslint-disable*/
import React, { useContext, useEffect } from "react";
import { AccountContext } from "./../providers/AccountProvider";
import { CampaignContext } from "./../providers/CampaignProvider";
import AccountPreview from "./accounts/AccountPreview"
import CampaignPreview from "./campaigns/CampaignPreview"

export default function Home() {
  // const { accounts, getAllAccounts } = useContext(AccountContext);
  // const { campaigns, getAllCampaigns } = useContext(CampaignContext);
  // const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  // useEffect(() => {
  //   getAllAccounts();
  //   getAllCampaigns();
  // }, []);

  return (
    <>
      <main className="home-container">
        <div className="homeContainer-contents">

          <div className="home-contents">



            <section className="dashboard-container">
              <div className="dashboard-details">

                <div className="userDetails">
                  <div className="userImage">
                    {/* {!sessionUser.imageUrl ?  */}
                    <img className="userProfilePic" src="./userIcon.png" alt="user-image" /> 
                    {/* // :
                    //   <img className="userProfilePic" src={sessionUser.imageUrl} alt="user-image" />} */}
                  </div>
                  <h5 className="user-name">
                    Bill Brasky
                    {/* {sessionUser.firstName} {sessionUser.lastName} */}
                    </h5>
                </div>


                
              </div>
            </section>




            <div className="overview-container">
              <section className="account-container">
                <h3 className="dashboardTitle">Account Activity</h3>
                <div>
                  <div className="addBtn">
                    <a className="mainBtn" href="/accounts/add">+ New Account</a>
                  </div>
                </div>
                {/* {accounts.map(a =>
                  <AccountPreview key={a.id} account={a} />
                )} */}

              </section>

              <section className="campaign-container">
                <h3 className="dashboardTitle">Campaign Activity</h3>
                <div>
                  <div className="addBtn">
                    <a className="mainBtn" href="/campaigns/add">+ New Campaign</a>
                  </div>
                </div>
                {/* {campaigns.map(c =>
                  <CampaignPreview key={c.id} campaign={c} />
                )} */}
              </section>

              {/* <section className="campaignTracker-container">
        <h3 className="dashboardTitle">Campaign Tracker</h3>
        </section> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}