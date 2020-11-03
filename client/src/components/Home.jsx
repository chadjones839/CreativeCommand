/*eslint-disable*/
import React, { useContext, useEffect } from "react";
import { AccountContext } from "./../providers/AccountProvider";
import { CampaignContext } from "./../providers/CampaignProvider";
import AccountPreview from "./accounts/AccountPreview"
import CampaignPreview from "./campaigns/CampaignPreview"
import { Link } from "react-router-dom";


export default function Home() {
  const { accounts, getAllAccounts } = useContext(AccountContext);
  const { campaigns, getAllCampaigns, revenue, pendingRevenue, getBookedRevenueBySalesId, getPendingRevenueBySalesId } = useContext(CampaignContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getAllAccounts();
    getAllCampaigns();
    getBookedRevenueBySalesId(sessionUser.id)
    getPendingRevenueBySalesId(sessionUser.id)
  }, []);

  console.log(revenue)

  function numberWithCommas(x) {
    if (!x) {
      return 0
    }
    else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  function combinedNumberWithCommas(x, y) {
    let z = x + y;  

    return z.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    
  }

  if (!revenue || !pendingRevenue) {
    return null
  }

  return (
    <>
      <main className="home-container">
        <div className="homeContainer-contents">

          <div className="home-contents">


          <h3 className="overviewTitle">OVERVIEW</h3>
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
                    <h5>${numberWithCommas(pendingRevenue.revenue)}</h5>
                  </div>
                  <div className="projection">
                    <h7>Projected</h7>
                    <h5>${combinedNumberWithCommas(revenue.revenue, pendingRevenue.revenue)}</h5>
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
                <h3 className="dashboardTitle">ACCOUNTS</h3>
                <div className="accountHeader-main">
                  <div className="addBtn">
                    <div className="mainBtn-container">
                      <Link 
                        style ={{textDecoration: "none"}}  
                        className="mainBtn" 
                        to="/accounts/add">
                          New Account
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="account-list">
                  {accounts.map(a =>
                    <AccountPreview key={a.id} account={a} />
                  )}
                </div>
              </section>

              <section className="campaign-container">
                <h3 className="dashboardTitle">CAMPAIGNS</h3>
                <div className="campaignHeader-main">
                  <div className="addBtn">
                    <div className="mainBtn-container">
                      <Link 
                        style={{textDecoration: "none"}} 
                        className="mainBtn" 
                        to="/campaigns/add">
                          Create Campaign
                        </Link>
                    </div>
                  </div>
                </div>
                <div className="campaignList">
                  {campaigns.map(c =>
                    <CampaignPreview key={c.id} campaign={c} />
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}