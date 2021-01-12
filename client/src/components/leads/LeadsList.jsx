/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../providers/AccountProvider";
import { CampaignContext } from "../../providers/CampaignProvider";
import LeadsListPreview from "../leads/LeadsListPreview"


export default function Home() {
  const { accounts, getAllLeads } = useContext(AccountContext);
  const { campaigns, getAllCampaigns } = useContext(CampaignContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  const { account, setAccount } = useState({});

  useEffect(() => {
    getAllLeads();
    getAllCampaigns();
  }, []);

  return (
    <>
      <main className="home-container">
        <div className="homeContainer-contents">
          <div className="home-contents">
            <div className="overview-container">
              <section className="accountList-container">
                <h3 className="dashboardListTitle">Accounts</h3>
                <div className="mainBtn-listContainer">
                  <p>
                    <a className="mainBtn" href="/accounts/add">+ New Account</a>
                  </p>
                </div>
                <div className="accountsListItems">
                {accounts.map(a =>
                  <LeadsListPreview key={a.id} account={a} />
                )}
                </div>
              </section>

              <section className="accountDetail-container">
                {/* {<AccountDetail />} */}
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}