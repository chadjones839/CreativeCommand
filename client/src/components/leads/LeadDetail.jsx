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
      <main className="leadContainer">
        <div className="lead__detail">
          <div className="leadHeader">
            <div className="leadHeader__title">
              <h3>Lead Details</h3>
            </div>
            <div className="leadSecondaryHeader">
              <button className="lead-backBtn">
                <strong>&#8592; Back</strong>
              </button>
              <hr className="spacerBar">
              </hr>
            </div>
          </div>
          <section className="leadContainer__left">
            <div className="leadDetails">
              <div className="leadDetails__contact">
                <dl className="leadDetails__contactInfo">
                  <dt>&#9734;</dt>
                  <dd><h3><strong>Jackie Welles</strong></h3></dd>
                  <dt>&#127970;</dt>
                  <dd>CMO, <strong>{account.company}</strong></dd>
                  <dt>&#9993;</dt>
                  <dd>jackie.welles@spacerschoice.com</dd>
                  <dt>&#128379;</dt>
                  <dd>202.345.2341</dd>
                  <dt>&#x1F4CD;</dt>
                  <dd>{account.city} {account.state}, {account.zipCode}
                  </dd>
                </dl>
              </div>
              <div className="leadDetails__quickInfo">
                <div className="leadDetails__leadScore">
                  <div className="leadScore">
                    57
                  </div>
                  <div className="leadCategory">
                    Lead Score
                  </div>
                </div>
                <div className="leadDetails__leadScore">
                  <div className="leadScore">
                    27
                  </div>
                  <div className="leadCategory">
                    Engaged
                  </div>
                </div>
                <div className="leadDetails__leadScore">
                  <div className="leadScore">
                    6/10
                  </div>
                  <div className="leadCategory">
                    Lead Quality
                  </div>
                </div>
              </div>
            </div>
            <div className="leadProperties">
              <div className="leadProperties__header">
                <h4>Lead Properties</h4>
              </div>
              <div className="leadProperties__details">
                <dl className="leadProperties__list">
                    <dt>Lead Owner</dt>
                    <dd>{account.salesUser.fullName}</dd>
                    <dt>Lead Type</dt>
                    <dd>Cold</dd>
                    <dt>Lead Source</dt>
                    <dd>AdAge</dd>
                    <dt>Lead Age</dt>
                    <dd>33 days</dd>
                    <dt>Industry</dt>
                    <dd>Junk Dealers</dd>
                  </dl>
              </div>
            </div>
            <div className="tags">

            </div>
          </section>
          <section className="leadContainer-right">

          </section>
        </div>
      </main>
    </>
  )
}