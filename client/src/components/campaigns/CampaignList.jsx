/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { CampaignContext } from "../../providers/CampaignProvider";
import CampaignPreview from "../campaigns/CampaignPreview"

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
          <section className="userDetails">
            <div className="userImage">
              {!sessionUser.imageUrl ? <img className="userProfilePic" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490031/icons/profileNav_lord6y.png" alt="user-image" /> :
                <img className="userProfilePic" src={sessionUser.imageUrl} alt="user-image" />}
            </div>
            <p className="user-name">{sessionUser.firstName} {sessionUser.lastName}</p>
          </section>
          <div className="home-contents">
            <div className="overview-container">
              <section className="account-container">
                <h3 className="dashboardTitle">Campaigns</h3>
                <div>
                  <p>
                    <a className="mainBtn" href="/campaigns/add">+ New Campaign</a>
                  </p>
                </div>
                {campaigns.map(c =>
                  <CampaignPreview key={c.id} campaign={c} />
                )}

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