/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function CampaignStatusDetail({ campaignStatus }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

  return (
    <>
      <div className="inProgressCampaigns">
        <div className="inProgressCampaign-card">
          <div className="campaignTrackerHeader">
            <div className="campaign-title">
              <h5>{campaignStatus.campaign.title}</h5>
            </div>
            <div className="campaignDetails">
              <h6>{new Intl.DateTimeFormat('en-US').format(new Date(campaignStatus.campaign.startDate))} - {new Intl.DateTimeFormat('en-US').format(new Date(campaignStatus.campaign.endDate))}</h6>
            </div>
            <div className="campaignStatus-actionButtons">
              <Link
                className="accountButton"
                style={{ textDecoration: 'none' }}
                to={`/campaignstatus/edit/${campaignStatus.id}`}>
                <img
                  className="accountBtn"
                  src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png"
                  alt="edit"
                />
              </Link>
            </div>
          </div>

          <div className="progressBar">

            {campaignStatus.isSold == true ?
              <div className="soldComplete">
                <span className="statusTag-complete">Sold</span>
              </div>
              :
              <div className="soldIncomplete">
                <span className="statusTag-incomplete">Sold</span>
              </div>}

            {campaignStatus.isApproved == true ?
              <div className="approvalComplete">
                <span className="statusTag-complete">Approved</span>
              </div>
              :
              <div className="approvalIncomplete">
                <span className="statusTag-incomplete">Approved</span>
              </div>}

            {campaignStatus.creativeSubmitted == true ?
              <div className="creativeComplete">
                <span className="statusTag-complete">Creative Submitted</span>
              </div>
              :
              <div className="creativeIncomplete">
                <span className="statusTag-incomplete">Creative Submitted</span>
              </div>}

            {campaignStatus.inProduction == true ?
              <div className="productionComplete">
                <span className="statusTag-complete">In Production</span>
              </div>
              :
              <div className="productionIncomplete">
                <span className="statusTag-incomplete">In Production</span>
              </div>}

            {campaignStatus.isScheduled == true ?
              <div className="schedulingComplete">
                <span className="statusTag-complete">Scheduled</span>
              </div>
              :
              <div className="schedulingIncomplete">
                <span className="statusTag-incomplete">Scheduled</span>
              </div>}

            {campaignStatus.isComplete == true ?
              <div className="campaignComplete">
                <span className="statusTag-complete">Campaign Complete</span>
              </div>
              :
              <div className="campaignIncomplete">
                <span className="statusTag-incomplete">Campaign Complete</span>
              </div>}

          </div>
        </div>
      </div>
    </>
  )

}