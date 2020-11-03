/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function CampaignStatusDetail({ campaignStatus }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  // const getCurrentDate = new Intl.DateTimeFormat('en-US').format(new Date())
  const currentDate = new Date().getTime();
  // const getStartDate = new Intl.DateTimeFormat('en-US').format(new Date(campaignStatus.campaign.startDate))
  const startDate = new Date(campaignStatus.campaign.startDate).getTime()


  console.log("Start Date: ", startDate)
  console.log("Current Date: ", currentDate)
  const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"


  return (
    <>
      <div className="campaignStatusCard">
        <div className="campaignStatusCard-content">
          <div className="campaignStatus-header">
            <div className="accountCampaignStatus-title">
              <Link
                className="campaignCard-campaignName"
                style={{ textDecoration: 'none' }}
                to={`/campaign/edit/${campaignStatus.campaignId}`}>
                  {campaignStatus.campaign.title}
              </Link>
            </div>
            <div className="campaignFlight">
              <div className="campaignFlight-container">
                {startDate < currentDate && campaignStatus.isScheduled !== true ?
                <div className="toolTip">*Requires Attention
                  <span className="toolTipText">The current start date for this campaign has passed. Update the campaign to a later start date, or delete it.</span>
                </div> : null}
                <h6>{new Intl.DateTimeFormat('en-US').format(new Date(campaignStatus.campaign.startDate))} &mdash; {new Intl.DateTimeFormat('en-US').format(new Date(campaignStatus.campaign.endDate))}</h6>
              </div>
            </div>
            <div className="campaignStatusList-editBtn">
              {campaignStatus.isComplete == true ?
              <Link
                className="editButton"
                style={{ textDecoration: 'none' }}
                to={`/campaignstatus/edit/${campaignStatus.id}`}>
                  View Status
              </Link>
              :
              <Link
                className="editButton"
                style={{ textDecoration: 'none' }}
                to={`/campaignstatus/edit/${campaignStatus.id}`}>
                  Edit Status
              </Link>}
            </div>
          </div>

          <div className="progressBar">

          {campaignStatus.isSold == true ?
              <div className="soldComplete">
                <span className="campaignStatusTag-complete">Sold</span>
              </div>
              :
              <div className="soldIncomplete currentStatus">
                <span className="campaignStatusTag-incomplete">Sold</span>
              </div>}

            {campaignStatus.isApproved == true ?
              <div className="approvalComplete">
                <span className="campaignStatusTag-complete">Approved</span>
              </div>
              :
              campaignStatus.isSold == true ?
              <div className="currentStatus">
                <span className="campaignStatusTag-incomplete">Approved</span>
              </div> :
              <div className="approvalIncomplete">
                <span className="campaignStatusTag-incomplete">Approved</span>
              </div>
            }

            {campaignStatus.creativeSubmitted == true ?
              <div className="creativeComplete">
                <span className="campaignStatusTag-complete">Creative Submitted</span>
              </div>
              :
              campaignStatus.isSold == true && campaignStatus.isApproved == true ?
              <div className="currentStatus">
                <span className="campaignStatusTag-incomplete">Creative Submitted</span>
              </div> :
              <div className="creativeIncomplete">
                <span className="campaignStatusTag-incomplete">Creative Submitted</span>
              </div>
            }

            {campaignStatus.inProduction == true ?
              <div className="productionComplete">
                <span className="campaignStatusTag-complete">In Production</span>
              </div>
              :
              campaignStatus.isSold == true && 
              campaignStatus.isApproved == true &&
              campaignStatus.creativeSubmitted == true ?
              <div className="productionIncomplete currentStatus">
                <span className="campaignStatusTag-incomplete">In Production</span>
              </div> :
              <div className="productionIncomplete">
                <span className="campaignStatusTag-incomplete">In Production</span>
              </div>
              }

            {campaignStatus.isScheduled == true ?
              <div className="schedulingComplete">
                <span className="campaignStatusTag-complete">Scheduled</span>
              </div>
              :
              campaignStatus.isSold == true && 
              campaignStatus.isApproved == true &&
              campaignStatus.creativeSubmitted == true &&
              campaignStatus.inProduction == true ?
              <div className="currentStatus">
                <span className="campaignStatusTag-incomplete">Scheduled</span>
              </div> :
              <div className="schedulingIncomplete">
                <span className="campaignStatusTag-incomplete">Scheduled</span>
              </div>
            }

            {campaignStatus.isComplete == true ?
              <div className="campaignComplete">
                <span className="campaignStatusTag-complete">Complete</span>
              </div>
              :
              campaignStatus.isSold == true && 
              campaignStatus.isApproved == true &&
              campaignStatus.creativeSubmitted == true &&
              campaignStatus.inProduction == true &&
              campaignStatus.isScheduled == true ?
              <div className="currentStatus">
                <span className="campaignStatusTag-incomplete">Complete</span>
              </div> :
              <div className="campaignIncomplete">
                <span className="campaignStatusTag-incomplete">Complete</span>
              </div>
              }
          </div>
        </div>
      </div>
    </>
  )
}