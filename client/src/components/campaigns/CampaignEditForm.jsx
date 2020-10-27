/*eslint-disable*/
import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useParams, Link } from "react-router-dom";
import { CampaignContext } from "../../providers/CampaignProvider";
import { AccountContext } from "../../providers/AccountProvider";
import { ScheduleTypeContext } from "../../providers/ScheduleTypeProvider";
import { PlatformContext } from "../../providers/PlatformProvider";

export default function CampaignAddForm() {
  const history = useHistory();
  const { id } = useParams();

  const { campaign, getById, updateCampaign } = useContext(CampaignContext);
  const { accounts, getAllAccounts } = useContext(AccountContext);
  const { scheduleTypes, getAllScheduleTypes } = useContext(ScheduleTypeContext);
  const { platforms, getAllPlatforms } = useContext(PlatformContext);

  const [ accountId, setAccountId ] = useState()
  const [ scheduleTypeId, setScheduleTypeId ] = useState()
  const [ platformId, setPlatformId ] = useState()

  const [editedCampaign, setEditedCampaign] = useState({
      id: campaign.id,
      accountId: "",
      title: "",
      revenue: "",
      scheduleTypeId: "",
      platformId: "",
      dateCreated: "",
      startDate: "",
      endDate: "",
      impressions: "",
      audience: ""
  });

  useEffect(() => {
    getById(id)
  }, [id])

  useEffect(() => {
    setEditedCampaign(campaign)
  }, [campaign])

  useEffect(() => {
    getAllAccounts()
    getAllScheduleTypes()
    getAllPlatforms()
  }, [])

  const handleAccountIdChange = (e) => {
    setAccountId(e.target.value);
  }

  const handleScheduleTypeIdChange = (e) => {
    setScheduleTypeId(e.target.value);
  }

  const handlePlatformIdChange = (e) => {
    setPlatformId(e.target.value);
  }

  const handleFieldChange = e => {
    const impressionsToChange = { ...editedCampaign };
    impressionsToChange[e.target.id] = e.target.value;
    setEditedCampaign(impressionsToChange);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    updateCampaign({
      accountId: editedCampaign.accountId,
      title: editedCampaign.title,
      revenue: editedCampaign.revenue,
      scheduleTypeId: editedCampaign.scheduleTypeId,
      platformId: editedCampaign.platformId,
      dateCreated: editedCampaign.dateCreated,
      startDate: editedCampaign.startDate,
      endDate: editedCampaign.endDate,
      impressions: editedCampaign.impressions,
      audience: editedCampaign.audience 
    });

    const parseAccountId = parseInt(accountId);
    const parseSchTypeId = parseInt(scheduleTypeId);
    const parsePlatId = parseInt(platformId)
    const parseRev = parseInt(editedCampaign.revenue)
    const parseImp = parseInt(editedCampaign.impressions)
    const parseAud = parseInt(editedCampaign.audience)
    editedCampaign.accountId = parseAccountId;
    editedCampaign.scheduleTypeId = parseSchTypeId;
    editedCampaign.platformId = parsePlatId;
    editedCampaign.revenue = parseRev;
    editedCampaign.impressions = parseImp;
    editedCampaign.audience = parseAud;

    if (!editedCampaign.accountId) {
      editedCampaign.accountId = campaign.accountId;
    }

    if (!editedCampaign.scheduleTypeId) {
      editedCampaign.scheduleTypeId = campaign.scheduleTypeId;
    }

    if (!editedCampaign.platformId) {
      editedCampaign.platformId = campaign.platformId;
    }

    debugger
    updateCampaign(editedCampaign.id, editedCampaign)
    .then(() => {
        history.push(`/campaign/${id}`)
    })
  };

  // if (!editedCampaign || 
  //     !accountId || 
  //     !scheduleTypeId || 
  //     !platformId) {
  //   return null
  // }

  return (
    <>
    <Form className="login-form" onSubmit={saveChanges}>
      <fieldset className="loginFields">
        <FormGroup>
          <Input 
            id="campaignId" 
            type="hidden"
            name="campaignId"
            value={editedCampaign.id} 
            onChange={handleFieldChange} />
        <Input 
            id="dateCreated" 
            type="hidden"
            name="dateCreated"
            defaultValue={editedCampaign.dateCreated} 
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="title">Campaign Name</Label>
          <Input 
            id="title" 
            type="text" 
            name="title"
            defaultValue={editedCampaign.title}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="accountId">Account Name</Label>
          <Input 
            id="accountId" 
            type="select" 
            name="accountId"
            defaultValue={editedCampaign.accountId}
            onChange={handleAccountIdChange}>
                {accounts.map(account =>
                  account.id === editedCampaign.accountId ?
                    <option selected value={account.id}>
                        {account.company}
                    </option> :
                    <option value={account.id}>
                        {account.company}
                    </option>
                )}
            </Input>
        </FormGroup>
        <FormGroup>
          <Label for="scheduleTypeId">Schedule Type</Label>
          <Input 
            id="scheduleTypeId" 
            type="select" 
            name="scheduleTypeId"
            defaultValue={editedCampaign.scheduleTypeId}
            onChange={handleScheduleTypeIdChange}>
                {scheduleTypes.map(type =>
                  type.id === editedCampaign.scheduleTypeId ?
                    <option selected value={type.id}>
                        {type.name}
                    </option> :
                    <option value={type.id}>
                        {type.name}
                    </option>
                )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="platformTypeId">Platform Type</Label>
          <Input 
            id="platformTypeId" 
            type="select" 
            name="platformTypeId"
            defaultValue={editedCampaign.platformTypeId}
            onChange={handlePlatformIdChange}>
                <option></option>
                {platforms.map(platform =>
                  platform.id === editedCampaign.platformId ?
                    <option selected value={platform.id}>
                        {platform.name}
                    </option> :
                    <option value={platform.id}>
                        {platform.name}
                    </option>
                )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="revenue">Revenue</Label>
          <Input 
            id="revenue" 
            type="text" 
            name="revenue"
            defaultValue={editedCampaign.revenue}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="startDate">Campaign Start Date</Label>
          <Input 
            id="startDate" 
            type="date" 
            name="startDate"
            defaultValue={editedCampaign.startDate}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="endDate">Campaign End Date</Label>
          <Input 
            id="endDate" 
            type="date" 
            name="endDate"
            defaultValue={editedCampaign.endDate}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="impressions">Impressions</Label>
          <Input 
            id="impressions" 
            type="text" 
            name="impressions"
            defaultValue={editedCampaign.impressions}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="audience">Audience</Label>
          <Input 
            id="audience" 
            type="text" 
            name="audience"
            defaultValue={editedCampaign.audience}
            onChange={handleFieldChange} />
        </FormGroup>
        <div className="loginBtn">
          <FormGroup>
            <Button>Update Campaign</Button>
          </FormGroup>
        </div>
      </fieldset>
    </Form>
    </>
  );
}