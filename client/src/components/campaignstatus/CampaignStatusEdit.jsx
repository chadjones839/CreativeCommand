/*eslint-disable*/
import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useParams } from "react-router-dom";
import { CampaignStatusContext } from "../../providers/CampaignStatusProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function CampaignStatusEditForm() {
  const history = useHistory();
  const { id } = useParams();
  const { campaignStatus, getCampaignStatusById, updateCampaignStatus } = useContext(CampaignStatusContext);

  const [editedCampaignStatus, setEditedCampaignStatus] = useState({
    id: campaignStatus.id,
    campaignId: campaignStatus.campaignId,
    isSold: "",
    isApproved: "",
    creativeSubmitted: "",
    inProduction: "",
    isScheduled: "",
    isComplete: ""
  });

  useEffect(() => {
    getCampaignStatusById(id)
  }, [id])

  useEffect(() => {
    setEditedCampaignStatus(campaignStatus)
  }, [campaignStatus])

  const handleFieldChange = (e) => {
    const stateToChange = { ...editedCampaignStatus };
    stateToChange[e.target.id] = e.target.value;
    setEditedCampaignStatus(stateToChange);
  }

  const saveChanges = (e) => {
    e.preventDefault();

    // SOLD

    if (editedCampaignStatus.isApproved === "true") {
      editedCampaignStatus.isSold = true;
    }
    else if (editedCampaignStatus.isApproved === "false") {
      editedCampaignStatus.isSold = false;
    }
    else if (!editedCampaignStatus.isSold) {
      editedCampaignStatus.isSold = campaignStatus.isSold;
    }

    // APPROVED
    if (editedCampaignStatus.isApproved === "true") {
      editedCampaignStatus.isApproved = true;
    }
    else if (editedCampaignStatus.isApproved === "false") {
      editedCampaignStatus.isApproved = false;
    }
    else if (!editedCampaignStatus.isApproved) {
      editedCampaignStatus.isApproved = campaignStatus.isApproved;
    }

    // CREATIVE
    if (editedCampaignStatus.creativeSubmitted === "true") {
      editedCampaignStatus.creativeSubmitted = true;
    }
    else if (editedCampaignStatus.creativeSubmitted === "false") {
      editedCampaignStatus.creativeSubmitted = false;
    }
    else if (!editedCampaignStatus.creativeSubmitted) {
      editedCampaignStatus.creativeSubmitted = campaignStatus.isApproved;
    }

    // PRODUCTION
    if (editedCampaignStatus.inProduction === "true") {
      editedCampaignStatus.inProduction = true;
    }
    else if (editedCampaignStatus.inProduction === "false") {
      editedCampaignStatus.inProduction = false;
    }
    else if (!editedCampaignStatus.inProduction) {
      editedCampaignStatus.inProduction = campaignStatus.inProduction;
    }

    // SCHEDULED
    if (editedCampaignStatus.isScheduled === "true") {
      editedCampaignStatus.isScheduled = true;
    }
    else if (editedCampaignStatus.isScheduled === "false") {
      editedCampaignStatus.isScheduled = false;
    }
    else if (!editedCampaignStatus.isScheduled) {
      editedCampaignStatus.isScheduled = campaignStatus.isScheduled;
    }

    // COMPLETE
    if (editedCampaignStatus.isComplete === "true") {
      editedCampaignStatus.isComplete = true;
    }
    else if (editedCampaignStatus.isComplete === "false") {
      editedCampaignStatus.isComplete = false;
    }
    else if (!editedCampaignStatus.isComplete) {
      editedCampaignStatus.isComplete = campaignStatus.isComplete;
    }

    updateCampaignStatus({
      id: editedCampaignStatus.id,
      campaignId: editedCampaignStatus.campaignId,
      isSold: editedCampaignStatus.isSold,
      isApproved: editedCampaignStatus.isApproved,
      creativeSubmitted: editedCampaignStatus.creativeSubmitted,
      inProduction: editedCampaignStatus.inProduction,
      isScheduled: editedCampaignStatus.isScheduled,
      isComplete: editedCampaignStatus.isComplete
    });

    updateCampaignStatus(editedCampaignStatus.id, editedCampaignStatus)
      .then(() => {
        history.push(`/campaign/${campaignStatus.campaignId}`)
      })
  };

  if (!editedCampaignStatus || !campaignStatus.campaign) {
    return null
  }

  return (
    <>
      <div className="editStatusHeader">
        <h2>{campaignStatus.campaign.title}</h2>
      </div>
      <Form className="login-form" onSubmit={saveChanges}>
        <fieldset className="loginFields">
          <FormGroup>
            <Input
              id="campaignStatusId"
              type="hidden"
              name="campaignStatusId"
              value={editedCampaignStatus.id} />
            <Input
              id="campaignId"
              type="hidden"
              name="campaignId"
              defaultValue={editedCampaignStatus.campaignId} />
          </FormGroup>
          <FormGroup>
            <Label for="sold">Sold: </Label>
            {campaignStatus.isSold == true ?
              <h6>Completed</h6> :
              <Input
                id="sold"
                type="select"
                name="sold"
                defaultValue={editedCampaignStatus.isSold}
                onChange={handleFieldChange}>
                <option selected value="false">Not Completed</option>
                <option value="true">Completed</option>
              </Input>}
          </FormGroup>

          <FormGroup>
            <Label for="isApproved">Approved</Label>
            {campaignStatus.isApproved == true ?
              <h6>Completed</h6> :
              <Input
                id="isApproved"
                type="select"
                name="isApproved"
                defaultValue={editedCampaignStatus.isApproved}
                onChange={handleFieldChange}>
                <option selected value="false">Not Completed</option>
                <option value="true">Completed</option>
              </Input>}
          </FormGroup>

          <FormGroup>
            <Label for="creativeSubmitted">Creative Submitted</Label>
            {campaignStatus.creativeSubmitted == true ?
              <h6>Completed</h6> :
              <Input
                id="creativeSubmitted"
                type="select"
                name="creativeSubmitted"
                defaultValue={editedCampaignStatus.creativeSubmitted}
                onChange={handleFieldChange}>
                <option selected value="false">Not Completed</option>
                <option value="true">Completed</option>
              </Input>}
          </FormGroup>

          <FormGroup>
            <Label for="inProduction">In Production</Label>
            {campaignStatus.inProduction == true ?
              <h6>Completed</h6> :
              <Input
                id="inProduction"
                type="select"
                name="inProduction"
                defaultValue={editedCampaignStatus.inProduction}
                onChange={handleFieldChange}>
                <option selected value="false">Not Completed</option>
                <option value="true">Completed</option>
              </Input>}
          </FormGroup>

          <FormGroup>
            <Label for="isScheduled">Scheduled</Label>
            {campaignStatus.isScheduled == true ?
              <h6>Completed</h6> :
              <Input
                id="isScheduled"
                type="select"
                name="isScheduled"
                defaultValue={editedCampaignStatus.isScheduled}
                onChange={handleFieldChange}>
                <option selected value="false">Not Completed</option>
                <option value="true">Completed</option>
              </Input>}
          </FormGroup>

          <FormGroup>
            <Label for="isComplete">Campaign Complete</Label>
            {campaignStatus.isComplete == true ?
              <h6>Completed</h6> :
              <Input
                id="isComplete"
                type="select"
                name="isComplete"
                defaultValue={editedCampaignStatus.isComplete}
                onChange={handleFieldChange}>
                <option selected value="false">Not Completed</option>
                <option value="true">Completed</option>
              </Input>}
          </FormGroup>

          <div className="loginBtn">
            <FormGroup>
              <Button>Save Changes</Button>
            </FormGroup>
          </div>
        </fieldset>
      </Form>
    </>
  );
}