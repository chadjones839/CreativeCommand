/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function AccountPreview({ campaign }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  const dateTime = new Intl.DateTimeFormat('en-US').format(new Date(campaign.createDate));
  const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

  if (sessionUser.id === campaign.account.salesUserId) {
  return (
    <>
      <div className="campaignCard">
        {!campaign.account.logo ? <div className="campaignCard-left">
          <img className="companyLogo" src={defaultImg} alt="company-logo" />
        </div> :
          <div className="accountCard-left">
            <img className="companyLogo" src={campaign.account.logo} alt="company-logo" />
          </div>}
        <div className="campaignCard-middle">
          <div className="campaignActivity-details">
            <Link className="campaignButton" style={{ textDecoration: 'none' }} to={`/campaign/${campaign.id}`}>
              <p className="campaignCard-campaignName">{campaign.title}</p>
            </Link>
          </div>
          <div className="campaignActivity-identifiers">
            <p className="campaignCard-details">Client: <span className="campaign-company">{campaign.account.company}</span></p> 
          </div>
        </div>
        <div className="campaignCard-right">
          <div className="campaignButtons">
            <Link
              className="editButton"
              style={{ textDecoration: 'none' }}
              to={`/campaign/edit/${campaign.id}`}>
                Edit
            </Link>
            <Link
              className="deleteButton"
              style={{ textDecoration: 'none' }}
              to={`/campaign/delete/${campaign.id}`}>
                Delete
            </Link>
          </div>
        </div>
      </div>
    </>
  )
  }
  else {
    return null
  }

}