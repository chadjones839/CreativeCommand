/*eslint-disable*/
import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useParams } from "react-router-dom";
import { CampaignStatusContext } from "../../providers/CampaignStatusProvider";

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

  console.log("before:", campaignStatus)
  useEffect(() => {
    getCampaignStatusById(id)
  }, [id])

  useEffect(() => {
    setEditedCampaignStatus(campaignStatus)
  }, [campaignStatus])
  console.log("after:", campaignStatus)

  const handleFieldChange = (e) => {
    const stateToChange = { ...editedCampaignStatus };
    stateToChange[e.target.id] = e.target.value;
    setEditedCampaignStatus(stateToChange);
  }

  const saveChanges = (e) => {
    e.preventDefault();

    updateCampaignStatus({
      id: campaignStatus.id,
      campaignId: campaignStatus.campaignId,
      isSold: editedCampaignStatus.isSold,
      isApproved: editedCampaignStatus.isApproved,
      creativeSubmitted: editedCampaignStatus.creativeSubmitted,
      inProduction: editedCampaignStatus.inProduction,
      isScheduled: editedCampaignStatus.isScheduled,
      isComplete: editedCampaignStatus.isComplete
    });

    // SOLD
    if (editedCampaignStatus.isSold === "true") {
      editedCampaignStatus.isSold = true;
    }
    else if (editedCampaignStatus.isSold === "false") {
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


    if (
      editedCampaignStatus.isSold == false && 
      (editedCampaignStatus.isApproved == true ||
        editedCampaignStatus.creativeSubmitted == true || 
        editedCampaignStatus.inProduction == true || 
        editedCampaignStatus.isScheduled == true || 
        editedCampaignStatus.isComplete == true)) {
      alert("Campaign must be sold before completing later steps")
    }
    else if (
      editedCampaignStatus.isSold == true && 
      editedCampaignStatus.isApproved == false && 
      (editedCampaignStatus.creativeSubmitted == true || 
        editedCampaignStatus.inProduction == true || 
        editedCampaignStatus.isScheduled == true || 
        editedCampaignStatus.isComplete == true)) {
      alert("Campaign must be approved before completing later steps")
    }
    else if (
      editedCampaignStatus.isSold == true && 
      editedCampaignStatus.isApproved == true && 
      editedCampaignStatus.creativeSubmitted == false && 
      (editedCampaignStatus.inProduction == true || 
        editedCampaignStatus.isScheduled == true || 
        editedCampaignStatus.isComplete == true)) {
      alert("Creative must be submitted before completing later steps")
    }
    else if (
      editedCampaignStatus.isSold == true && 
      editedCampaignStatus.isApproved == true && 
      editedCampaignStatus.creativeSubmitted == true && 
      editedCampaignStatus.inProduction == false && 
      (editedCampaignStatus.isScheduled == true || 
        editedCampaignStatus.isComplete == true)) {
      alert("Campaign must clear production before completing later steps")
    }
    else if (
      editedCampaignStatus.isSold == true && 
      editedCampaignStatus.isApproved == true && 
      editedCampaignStatus.creativeSubmitted == true && 
      editedCampaignStatus.inProduction == true && 
      editedCampaignStatus.isScheduled == false && 
      editedCampaignStatus.isComplete == true) {
      alert("Campaign must be scheduled before completing")
    }
    else {
      updateCampaignStatus(campaignStatus.id, editedCampaignStatus)
      .then(() => {
        history.push(`/campaign/${campaignStatus.campaignId}`)
      })
    }
  };

  if (!editedCampaignStatus || !campaignStatus.campaign) {
    return null
  }
  // else if (editedCampaignStatus.id === id) {
  //   return null;
  // }

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
              value={campaignStatus.id} />
            <Input
              id="campaignId"
              type="hidden"
              name="campaignId"
              defaultValue={campaignStatus.campaignId} />
          </FormGroup>
          <FormGroup>
            <Label for="isSold">Sold: </Label>
            {campaignStatus.isSold == true ?
              <h6>Completed</h6> :
              <Input
                id="isSold"
                type="select"
                name="isSold"
                defaultValue={campaignStatus.isSold}
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
                defaultValue={campaignStatus.isApproved}
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
                defaultValue={campaignStatus.creativeSubmitted}
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
                defaultValue={campaignStatus.inProduction}
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
                defaultValue={campaignStatus.isScheduled}
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
                defaultValue={campaignStatus.isComplete}
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