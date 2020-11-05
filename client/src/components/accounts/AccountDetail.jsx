/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";
import { CampaignStatusContext } from "../../providers/CampaignStatusProvider";
import AccountCampaignStatus from "../campaignstatus/AccountCampaignStatus";


export default function AccountDetail() {
  const { account, getById } = useContext(AccountContext);
  const { campaignStatuses, getAllByCampaignAccountId } = useContext(CampaignStatusContext);
  const { id } = useParams()

  useEffect(() => {
    getById(id)
  }, []);

  useEffect(() => {
    getAllByCampaignAccountId(id)
  }, []);

  const needsSold = [];
  const needsApproval = [];
  const inProgress = [];
  const completed = [];

  const allInProgress = [];
  const allCompleted = [];

  const currentStatus = (arr) => {
    arr.forEach(item => {
      if (item.isSold === false) {
        needsSold.push(item);
        allInProgress.push(item);
      }
      else if (item.isSold === true && item.isApproved === false) {
        needsApproval.push(item);
        allInProgress.push(item);
      }
      else if (item.isSold === true && item.isApproved === true && item.isComplete === true) {
        completed.push(item)
        allCompleted.push(item);
      }
      else {
        inProgress.push(item);
        allInProgress.push(item);
      }
    })
  }
  
  currentStatus(campaignStatuses)

  let notSold = 0
  for(let i = 0; i < needsSold.length; i++){
    notSold++;
  }
  let notApproved = 0
  for(let i = 0; i < needsApproval.length; i++){
    notApproved++;
  }
  let progress = 0  
  for(let i = 0; i < inProgress.length; i++){
    progress++;
  }
  let complete = 0
  for(let i = 0; i < completed.length; i++){
    complete++;
  }


  const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

  if (!account || !campaignStatuses || !account.salesUser || !account.managerUser) {
    return null
  }

  return (
    <>
      <div className="accountDetail-header">
        <div className="accountDetailHeaderContent">
        {!account.logo ?
          <div className="accountDetail-top">
            <img className="companyLogo" src={defaultImg} alt="company-logo" />
            <div className="accountDetail-companyName">
              <p className="companyName-detail">{account.company}</p>
            </div>
          </div> :
          <div className="accountDetail-top">
            <img className="companyLogo" src={account.logo} alt="company-logo" />
            <div className="accountDetail-companyName">
              <h1 className="companyName-detail">{account.company}</h1>
            </div>
          </div>
        }   
          <div className="accountHeader-right"> 
            <div className="accountDetailButtons">
              <Link
                className="editButton"
                style={{ textDecoration: 'none' }}
                to={`/account/edit/${account.id}`}>
                  Edit
              </Link>
              
              <Link
                className="deleteButton"
                style={{ textDecoration: 'none' }}
                to={`/account/delete/${account.id}`}>
                  Delete
              </Link>
            </div>
          </div>  
        </div>
      </div>
      <section className="accountDetail-container">
        <div className="accountDetail-contents">
          
          <div className="accountDetail-middle">
            <div className="accountDetail-identifiers">
              <h4 className="accountTeam">Account Team</h4>
              <dl>
                <dt>Account Owner</dt>
                <dd>{account.salesUser.fullName}</dd>
                <dt>Manager Approvals</dt>
                <dd>{account.managerUser.fullName}</dd>
                <dt>Account Since</dt>
                <dd>{new Intl.DateTimeFormat('en-US').format(new Date(account.dateCreated))}</dd>
              </dl>
            </div>
            <div className="billingDetails">
              <dl>
              <h4 className="accountTeam">Billing Address</h4>
                <dd>{account.address} <br/> {account.city} {account.state}, {account.zipCode}</dd>
              </dl>
            </div>
            <div className="campaignStatuses">
              <h4 className="accountTeam">Campaigns</h4>
              <div className="statusContainer">
                <dl>
                  <dt>Needs Pitched</dt>
                  <dd className="statusQty-pitch">{notSold}</dd>
                  <dt>Approved</dt>
                  <dd className="statusQty approved">{progress}</dd>
                </dl>
                <dl>
                  <dt>Needs Sold</dt>
                  <dd className="statusQty sold">{notApproved}</dd>
                  <dt>Completed</dt>
                  <dd className="statusQty-complete">{complete}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="campaignStatusList">
        <div className="campaignStatusList-h3Container">
          <h3 className="campaignStatusList-h3">Campaigns In Progress</h3>
          <div className="addNewBtn">
            <div className="mainBtn-container">
              <Link 
                style={{textDecoration: "none"}} 
                className="mainBtn" 
                to={`/campaigns/new/account-${account.id}`}>
                  Create Campaign
              </Link>
            </div>
          </div>
        </div>
        <div className="campaignStatusList-wrapper">
          <div className="campaignStatusList-container">
            {allInProgress.length === 0 ?
            <h4 style={{textAlign: "center", border: "7px dashed #efefef", borderRadius: "10px", padding: "10px"}}>There are no active campaigns for this account<br/> <small>Create a new campaign by clicking the <strong>"Add New Campaign"</strong> button above.</small></h4>
            :
            allInProgress.map(c =>
              <AccountCampaignStatus key={c.id} campaignStatus={c} />
            )}
          </div>
        </div>
        <div className="campaignStatusList-h3Container">
          <h3 className="campaignStatusList-h3C">Completed Campaigns</h3>
        </div>
        <div className="campaignStatusList-wrapper">
          <div className="campaignStatusList-container">
            {allCompleted.length === 0 ?
            <h4 style={{textAlign: "center", border: "7px dashed #efefef", borderRadius: "10px", padding: "10px"}}>There are no completed campaigns for this account<br/> <small>When a campaign is completed it will display here.</small></h4>
            :
            allCompleted.map(c =>
              <AccountCampaignStatus key={c.id} campaignStatus={c} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}