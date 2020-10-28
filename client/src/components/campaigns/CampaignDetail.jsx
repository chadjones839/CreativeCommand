/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CampaignContext } from "../../providers/CampaignProvider";
import { CampaignStatusContext } from "../../providers/CampaignStatusProvider";
import CampaignStatusDetail from "../campaignstatus/CampaignStatusDetail";

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
    
  
    const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

    if (!campaign || 
        !campaign.account ||
        !campaignStatus || 
        !campaignStatus.campaign) {
        return null
    }


    return (
      <>
        <section className="accountDetail-container">
          <div className="accountDetailCard">
            { !campaign.account.logo ? 
            <div className="accountCard-left">
              <img className="companyLogo" src={defaultImg} alt="company-logo"/>
            </div> :
            <div className="accountCard-left">
              <img className="companyLogo" src={campaign.account.logo} alt="company-logo"/>
            </div> }
            <div className="accountCard-middle">
              <dl>
                <h3>{campaign.title}</h3>
                <dt><span className="tag">Create Date:</span> {new Intl.DateTimeFormat('en-US').format(new Date(campaign.createDate))}</dt>
                <dt><span className="tag">Sales Rep:</span> {campaign.account.salesUser.fullName}</dt>
                <dt><span className="tag">Rep manager:</span> {campaign.account.managerUser.fullName}</dt>
                <dt><span className="tag">Expected Revenue:</span> {campaign.revenue}</dt>
                <dt><span className="tag">Campaign Start Date:</span> {new Intl.DateTimeFormat('en-US').format(new Date(campaign.startDate))}</dt>
                <dt><span className="tag">Campaign End Date:</span> {new Intl.DateTimeFormat('en-US').format(new Date(campaign.endDate))}</dt>
                <dt><span className="tag">Schedule Type:</span> {campaign.scheduleType.name}</dt>
                <dt><span className="tag">Ad Channel:</span> {campaign.platform.name}</dt>
                <br/>
                <h5>Deliverables:</h5>
                <dt><span className="tag">Impressions:</span> {campaign.impressions}</dt>
                <dt><span className="tag">Audience:</span> {campaign.audience}</dt>

              </dl>
            </div>
            <div className="accountDetailsCard-right">
              <div className="accountDetailsButtons">
                <Link className="accountButton" style={{ textDecoration: 'none' }} to={`/campaign/edit/${campaign.id}`}>
                  <img className="accountBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png"/>
                </Link>
                <Link className="accountButton" style={{ textDecoration: 'none' }} to={`/campaign/delete/${campaign.id}`}>
                  <img className="accountBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete"/>
                </Link> 
              </div>
            </div>
          </div>
        </section>

        <section className="campaignStatus">
        <div className="inProgressCampaigns">
          <h3>Campaign Tracker</h3>
          <div className="inProgressCampaign-card">
            <h5>{campaignStatus.campaign.title}</h5>
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
        </section>
      </>
    )
}