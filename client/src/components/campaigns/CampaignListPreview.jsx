/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function AccountPreview({ campaign }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  const startDate = new Date(campaign.startDate).getTime();
  const displayStartDate = new Intl.DateTimeFormat('en-US').format(new Date(campaign.startDate))
  const todaysDate = new Date().getTime();
  const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

  

  if (sessionUser.id === campaign.account.salesUserId) {
  return (
    <>
      <div className="campaignListCard">
          {!campaign.account.logo ? <div className="accountCard-left">
            <img className="campaignListLogo" src={defaultImg} alt="company-logo" />
          </div> :
            <div className="campaignListCard-left">
              <img className="companyListLogo" src={campaign.account.logo} alt="company-logo" />
            </div>}
          <div className="campaignListCard-middle">
            <div className="campaignActivity-details">
              <Link
                className="campaignButton"
                style={{ textDecoration: 'none' }}
                to={`/campaign/${campaign.id}`}>
                <p className="campaignListCard-title">{campaign.title}</p>
              </Link>
            </div>
            { startDate - 259200000 <= todaysDate  ?
            <div className="campaignList-startDate">
              Start Date: <span className="startsSoon">{displayStartDate}</span>
            </div>
            :
            <div className="campaignList-startDate">
              Start Date: {displayStartDate}
            </div>
            }
          </div> 
        </div>
    </>
  )
  }
  else {
    return null
  }

}