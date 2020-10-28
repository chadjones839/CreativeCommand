/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";
import { CampaignStatusContext } from "../../providers/CampaignStatusProvider";
import CampaignStatusDetail from "../campaignstatus/CampaignStatusDetail";


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
    
    const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

    if (!account || !campaignStatuses || !account.salesUser || !account.managerUser) {
        return null
    }

    return (
      <>
        <section className="accountDetail-container">
          <div className="accountDetailCard">
            { !account.logo ? 
            <div className="accountCard-left">
              <img className="companyLogo" src={defaultImg} alt="company-logo"/>
            </div> :
            <div className="accountCard-left">
              <img className="companyLogo" src={account.logo} alt="company-logo"/>
            </div> }
            <div className="accountCard-middle">
              <div className="accountActivity-details">
                <Link className="accountButton" style={{ textDecoration: 'none' }} to={`/account/details/`}>
                  <p className="accountCard-companyName">{account.company}</p>
                </Link> 
              </div>
              <div className="accountActivity-identifiers">
                <p className="accountCard-details">Owned by {account.salesUser.fullName}</p> <em>Created on {new Intl.DateTimeFormat('en-US').format(new Date(account.dateCreated))} </em>
              </div>
              <dl>
                <dt>{account.address}</dt>
                <dt>{account.city} {account.state}, {account.zipCode}</dt>
              </dl>
              <br/>
              <p>Manager: {account.managerUser.fullName}</p>
            </div>
            <div className="accountDetailsCard-right">
              <div className="accountDetailsButtons">
                <Link className="accountButton" style={{ textDecoration: 'none' }} to={`/account/edit/${account.id}`}>
                  <img className="accountBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png"/>
                </Link>
                <Link className="accountButton" style={{ textDecoration: 'none' }} to={`/account/delete/${account.id}`}>
                  <img className="accountBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete"/>
                </Link> 
              </div>
            </div>
          </div>
        </section>
        <section className="campaignStatusList">
          <div className="campaignStatus-wrapper">
            <div className="campaignStatus-container">
            <h3>Campaigns In Progress</h3>
              {campaignStatuses.map(c => 
                <CampaignStatusDetail key={c.id} campaignStatus={c} />
              )}
            </div>
          </div>
        </section>
      </>
    )
}