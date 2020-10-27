/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function AccountPreview({ campaign }) {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"));
    
    const dateTime = new Intl.DateTimeFormat('en-US').format(new Date(campaign.createDate));
    const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

    return (
      <>
        <div className="campaignCard">
        { !campaign.account.logo ? <div className="accountCard-left">
              <img className="companyLogo" src={defaultImg} alt="company-logo"/>
            </div> :
            <div className="accountCard-left">
              <img className="companyLogo" src={campaign.account.logo} alt="company-logo"/>
            </div> }
            <div className="campaignCard-middle">
              <div className="campaignActivity-details">
                <Link className="campaignButton" style={{ textDecoration: 'none' }} to={`/campaign/details/`}>
                  <p className="campaignCard-campaignName">{campaign.title}</p>
                </Link> 
              </div>
              <div className="campaignActivity-identifiers">
                <p className="campaignCard-details">Developed for <span className="campaign-company">{campaign.account.company}</span></p> <em>Created on {dateTime}</em>
              </div>
            </div>
            <div className="campaignCard-right">
              <div className="campaignButtons">
                <Link 
                  className="campaignButton" 
                  style={{ textDecoration: 'none' }} 
                  to={`/campaign/edit/${campaign.id}`}>
                    <img className="campaignBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png"/>
                </Link>
                <Link 
                  className="campaignButton" 
                  style={{ textDecoration: 'none' }} 
                  to={`/campaign/delete/${campaign.id}`}>
                    <img className="campaignBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete"/>
                </Link> 
              </div>
            </div>
          </div>
      </>
    )

}