/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function AccountPreview({ account }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  const dateTime = new Intl.DateTimeFormat('en-US').format(new Date(account.dateCreated));
  const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

  if (sessionUser.id === account.salesUserId) {
    return (
      <>
        <div className="accountListCard">
          {!account.logo ? <div className="accountCard-left">
            <img className="companyListLogo" src={defaultImg} alt="company-logo" />
          </div> :
            <div className="accountListCard-left">
              <img className="companyListLogo" src={account.logo} alt="company-logo" />
            </div>}
          <div className="accountListCard-middle">
            <div className="accountActivity-details">
              <Link
                className="accountButton"
                style={{ textDecoration: 'none' }}
                to={`/leads/${account.id}`}>
                <p className="accountListCard-companyName">{account.company}</p>
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