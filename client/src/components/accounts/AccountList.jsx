/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../providers/AccountProvider";
import { CampaignContext } from "../../providers/CampaignProvider";
import AccountListPreview from "../accounts/AccountListPreview"
import AccountDetail from "../accounts/AccountDetail"
import CampaignPreview from "../campaigns/CampaignPreview"

export default function Home() {
  const { accounts, getAllAccounts } = useContext(AccountContext);
  const { campaigns, getAllCampaigns } = useContext(CampaignContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  const { account, setAccount } = useState({});

  useEffect(() => {
    getAllAccounts();
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
                  <AccountListPreview key={a.id} account={a} />
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