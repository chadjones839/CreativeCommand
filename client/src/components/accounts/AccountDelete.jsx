/*eslint-disable*/
import React, { useEffect, useContext } from "react";
import { AccountContext } from "../../providers/AccountProvider";
import { useHistory, useParams, Link } from "react-router-dom";

export default function DeleteAccount() {

  const { account, deleteAccount, getById } = useContext(AccountContext);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getById(id)
  }, [id])

  const deleteAct = () => {
    deleteAccount(id)
      .then(() => history.push("/"));
  }

  if (!account) {
    return null;
  }

  return (
    <>
      <div className="deleteContainer">
        <div className="deleteAccount">
          <h4> Delete <span className="deleteConfirm-companyName">{account.company}</span>?</h4>
          <div className="actionButtons">
            <div className="actionBtns">
              <div className="form-group">
                <input
                  type="submit"
                  onClick={deleteAct}
                  value="Confirm"
                  className="mainBtn" />
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to={`/`}>
                  Cancel
          </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}