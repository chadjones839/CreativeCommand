/*eslint-disable*/
import React, { useEffect, useContext } from "react";
import { CampaignContext } from "../../providers/CampaignProvider";
import { useHistory, useParams, Link } from "react-router-dom";

export default function DeletePostPage() {

  const { campaign, deleteCampaign, getCampaignById } = useContext(CampaignContext);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getCampaignById(id)
  }, [id])

  const deleteConfirm = () => {
    deleteCampaign(id)
      .then(() => history.push("/"));
  }

  if (!campaign) {
    return null;
  }

  return (
    <>
      <div className="deleteContainer">
        <div className="deleteAccount">
          <h4> Delete <span className="deleteConfirm-companyName">{campaign.title}</span>?</h4>
          <div className="actionButtons">
            <div className="actionBtns">
              <div className="btnGroup">
                <input
                  type="submit"
                  onClick={deleteConfirm}
                  value="Confirm"
                  className="mainBtn" />
                <br/>
                <Link 
                  style={{textDecoration: "none"}}
                  className="cancelBtn"
                  to={`/`}>
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