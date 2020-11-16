/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { CampaignContext } from "../../providers/CampaignProvider";
import CampaignListPreview from "../campaigns/CampaignListPreview"

export default function Home() {
  const { campaigns, getAllCampaigns } = useContext(CampaignContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  const { campaign, setCampaign } = useState({});

  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <>
      <main className="home-container">
        <div className="homeContainer-contents">
          <div className="home-contents">
            <div className="overview-container">
              <section className="campaignList-container">
                <h3 className="dashboardListTitle">Campaigns</h3>
                <div className="mainBtn-listContainer">
                  <p>
                    <a className="mainBtn" href="/campaigns/add">+ New Campaign</a>
                  </p>
                </div>
                <div className="campaignListItems">
                {campaigns.map(c =>
                  <CampaignListPreview key={c.id} campaign={c} />
                )}
                </div>
              </section>

              <section className="accountDetail-container">

              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}