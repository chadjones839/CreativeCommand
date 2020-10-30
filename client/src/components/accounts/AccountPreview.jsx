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
        <div className="accountCard">
          {!account.logo ? <div className="accountCard-left">
            <img className="companyLogo" src={defaultImg} alt="company-logo" />
          </div> :
            <div className="accountCard-left">
              <img className="companyLogo" src={account.logo} alt="company-logo" />
            </div>}
          <div className="accountCard-middle">
            <div className="accountActivity-details">
              <Link
                className="accountButton"
                style={{ textDecoration: 'none' }}
                to={`/account/${account.id}`}>
                <p className="accountCard-companyName">{account.company}</p>
              </Link>
            </div>
            <div className="accountActivity-identifiers">
              <p className="accountCard-details">Owned by <strong>{account.salesUser.fullName}</strong></p> <em>Created on {dateTime}</em>
            </div>
          </div>
          <div className="accountCard-right">
            <div className="accountButtons">
              <Link
                className="accountButton"
                style={{ textDecoration: 'none' }}
                to={`/account/edit/${account.id}`}>
                <img className="accountBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png" />
              </Link>
              <Link
                className="accountButton"
                style={{ textDecoration: 'none' }}
                to={`/account/delete/${account.id}`}>
                <img className="accountBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete" />
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