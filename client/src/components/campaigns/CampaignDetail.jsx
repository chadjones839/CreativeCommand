/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CampaignContext } from "../../providers/CampaignProvider";
import { CampaignStatusContext } from "../../providers/CampaignStatusProvider";

export default function CampaignDetail() {
  const { campaign, getCampaignById } = useContext(CampaignContext);
  const { campaignStatus, getByCampaignId } = useContext(CampaignStatusContext);
  const { id } = useParams()


  useEffect(() => {
    getCampaignById(id)
  }, []);

  useEffect(() => {
    getByCampaignId(id)
  }, []);

  function numberWithCommas(x) {
    if (!x) {
      return 0
    }
    else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

  if (!campaign ||
    !campaign.account ||
    !campaignStatus ||
    !campaignStatus.campaign) {
    return null
  }


  return (
    <>
    <section className="campaignDetail-wrapper">
      <div className="campaignDetail-container">
        <div className="campaignDetailHeaderContent">
          <div className="campaignDetail-left">
            <h2 className="campaignTitle">{campaign.title}</h2>
          </div> 
          <div className="campaignDetail-right"> 
            <div className="campaignDetailButtons">
              <Link
                className="editButton"
                style={{ textDecoration: 'none' }}
                to={`/account/edit/${campaign.id}`}>
                  Edit
              </Link>
              
              <Link
                className="deleteButton"
                style={{ textDecoration: 'none' }}
                to={`/account/delete/${campaign.id}`}>
                  Delete
              </Link>
            </div>
          </div>    
        </div>
        
        <section className="campaignDetailProgressBar">
          <div className="campaignStatus-update">
            <Link
              className="editButton"
              style={{ textDecoration: 'none' }}
              to={`/campaignstatus/edit/${campaignStatus.id}`}>
              Update Status
            </Link>
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
        </section>
        

        <div className="campaignDetailCard">
          <div className="campaignDetailCard-middle">
            {!campaign.account.logo ?
            <div className="campaignClient">
              <img className="campaignCompanyLogo" src={defaultImg} alt="company-logo" />
              <div className="campaignClientName">
                <h3 className="campaignCompany">{campaign.account.company}</h3>
              </div>
            </div> :
            <div className="campaignClient">
              <img className="campaignCompanyLogo" src={campaign.account.logo} alt="company-logo" />
              <div className="campaignClientName">
                <h3 className="campaignCompany">{campaign.account.company}</h3>
              </div>
            </div>
            } 
            <div className="campaignDetails-content">
              <dl className="campaign-dl">
                <h2 className="campaignDetail-columnHeader">Campaign Details</h2>
                <dt>Create Date</dt>
                  <dd>{new Intl.DateTimeFormat('en-US').format(new Date(campaign.createDate))}</dd>
                <dt>Sales Rep</dt> 
                  <dd>{campaign.account.salesUser.fullName}</dd>
                <dt>Rep manager</dt> 
                  <dd>{campaign.account.managerUser.fullName}</dd>
              </dl>
              <div className="dlMiddle">
                <dl>
                  <h2 className="campaignDetail-columnHeader">Strategy</h2>
                  <dt>Expected Revenue</dt> 
                    <dd>${numberWithCommas(campaign.revenue)}</dd>
                  <dt>Campaign Start Date</dt> 
                    <dd>{new Intl.DateTimeFormat('en-US').format(new Date(campaign.startDate))}</dd>
                  <dt>Campaign End Date</dt>
                  <dd>{new Intl.DateTimeFormat('en-US').format(new Date(campaign.endDate))}</dd>
                  <dt>Schedule Type</dt> 
                  <dd>{campaign.scheduleType.name}</dd>
                  <dt>Ad Channel</dt> 
                  <dd>{campaign.platform.name}</dd>
                </dl>
              </div>
              <div className="dlRight">
                <dl>
                  <h2 className="campaignDetail-columnHeader">Deliverables</h2>
                  <dt>Impressions</dt> 
                  <dd>{campaign.impressions}</dd>
                  <dt>Audience</dt>
                  <dd>{campaign.audience}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  )
}