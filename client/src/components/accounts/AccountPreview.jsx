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
              <p className="accountCard-details">Owned by <strong>{account.salesUser.fullName}</strong></p>
            </div>
            {/* <div className="accountLinks">
              <Link
                className="accountButton"
                style={{ textDecoration: 'none' }}
                to={`/account/edit/${account.id}`}>
                  Edit
              </Link>
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <Link
                className="accountButton"
                style={{ textDecoration: 'none' }}
                to={`/account/delete/${account.id}`}>
                  Delete
              </Link>
            </div> */}
          </div>
          <div className="accountCard-right">
          {/* <div className="account-createDate">
              <em className="accountCreated">Created {dateTime}</em>
            </div> */}
            <div className="accountButtons">
              <div className="accountLinks">
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
            {/* <div className="accountLinks">
              <Link
                className="accountButton"
                style={{ textDecoration: 'none' }}
                to={`/account/edit/${account.id}`}>
                  Edit
              </Link>
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <Link
                className="accountButton"
                style={{ textDecoration: 'none' }}
                to={`/account/delete/${account.id}`}>
                  Delete
              </Link>
            </div> */}
          </div>
        </div>
      </>
    )
  }
  else {
    return null
  }
}