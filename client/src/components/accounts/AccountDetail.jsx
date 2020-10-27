/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";

export default function AccountDetail() {
    const { account, getById } = useContext(AccountContext);
    const { id } = useParams()
    
    
    useEffect(() => {
        getById(id)
    }, []);
    
    const defaultImg = "https://res.cloudinary.com/dhduglm4j/image/upload/v1603478435/icons/defaultCompanyIcon_bqlwsn.jpg"

    if (!account || !account.salesUser || !account.managerUser) {
        return null
    }

    return (
        <>
            <div className="accountCard">
                { !account.logo ? <div className="accountCard-left">
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
                  <p>{account.address}</p>
                  <p>{account.city}</p>
                  <p>{account.state}</p>
                  <p>{account.zipCode}</p>
                  <br/>
                  <p>Manager: {account.managerUser.fullName}</p>
                </div>
                <div className="accountCard-right">
                  <div className="accountButtons">
                    <Link className="accountButton" style={{ textDecoration: 'none' }} to={`/account/edit/${account.id}`}>
                      <img className="accountBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png"/>
                    </Link>
                    <Link className="accountButton" style={{ textDecoration: 'none' }} to={`/account/delete/${account.id}`}>
                      <img className="accountBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete"/>
                    </Link> 
                  </div>
                </div>
              </div>
        </>
    )
}