/*eslint-disable*/
import React, { useContext, useEffect } from "react";
import { AccountContext } from "./../providers/AccountProvider";
import { CampaignContext } from "./../providers/CampaignProvider";
import AccountPreview from "./accounts/AccountPreview"
import CampaignPreview from "./campaigns/CampaignPreview"

export default function Home() {
  const { accounts, getAllAccounts } = useContext(AccountContext);
  const { campaigns, getAllCampaigns, revenue, getBookedRevenueBySalesId } = useContext(CampaignContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getAllAccounts();
    getAllCampaigns();
    getBookedRevenueBySalesId(sessionUser.id)
  }, []);

  console.log(revenue)

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!revenue) {
    return null
  }

  return (
    <>
      <main className="home-container">
        <div className="homeContainer-contents">

          <div className="home-contents">



            <section className="dashboard-container">
              <div className="dashboard-details">

                <div className="userDetails">
                  <div className="userContainer">
                    <div className="userImage">
                      {!sessionUser.imageUrl ? 
                      <img className="userProfilePic" src="./userIcon.png" alt="user-image" /> 
                      :
                      <img className="userProfilePic" src={sessionUser.imageUrl} alt="user-image" />}
                    </div>
                    <h5 className="user-name">
                      {sessionUser.firstName} {sessionUser.lastName}
                      </h5>
                    </div>
                </div>
                
                <div className="revenueDetails">
                  <div className="booked">
                    <h7>Booked</h7>
                    <h5>${numberWithCommas(revenue.revenue)}</h5>
                  </div>
                  <div className="pipeline">
                    <h7>Pending</h7>
                    <h5>$2,454,533</h5>
                  </div>
                  <div className="projection">
                    <h7>Projected</h7>
                    <h5>$3,774,533</h5>
                  </div>
                </div>

                <div className="budgetDetails">
                  <div className="budget">
                    <h7>Annual Budget</h7>
                    <h5>$5,774,533</h5>
                  </div>
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