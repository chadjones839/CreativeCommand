/*eslint-disable*/
import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useParams } from "react-router-dom";
import { CampaignContext } from "../../providers/CampaignProvider";
import { AccountContext } from "../../providers/AccountProvider";
import { ScheduleTypeContext } from "../../providers/ScheduleTypeProvider";
import { PlatformContext } from "../../providers/PlatformProvider";

export default function CampaignEditForm() {

  const { campaign, getCampaignById, updateCampaign } = useContext(CampaignContext);
  const { accounts, getAllAccounts } = useContext(AccountContext);
  const { scheduleTypes, getAllScheduleTypes } = useContext(ScheduleTypeContext);
  const { platforms, getAllPlatforms } = useContext(PlatformContext);

  const [accountId, setAccountId] = useState()
  const [scheduleTypeId, setScheduleTypeId] = useState()
  const [platformId, setPlatformId] = useState()

  const [editedCampaign, setEditedCampaign] = useState({
    id: campaign.id,
    accountId: accountId,
    title: "",
    revenue: "",
    scheduleTypeId: scheduleTypeId,
    platformId: platformId,
    createDate: "",
    startDate: "",
    endDate: "",
    impressions: "",
    audience: ""
  });

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getCampaignById(id)
  }, [])

  useEffect(() => {
    getAllAccounts()
  }, [])

  useEffect(() => {
    getAllScheduleTypes()
  }, [])

  useEffect(() => {
    getAllPlatforms()
  }, [])

  useEffect(() => {
    setEditedCampaign(campaign)
  }, [campaign])

  const handleAccountIdChange = (e) => {
    setAccountId(e.target.defaultValue);
  }

  const handleScheduleTypeIdChange = (e) => {
    setScheduleTypeId(e.target.defaultValue);
  }

  const handlePlatformIdChange = (e) => {
    setPlatformId(e.target.defaultValue);
  }

  const handleFieldChange = e => {
    const stateToChange = { ...editedCampaign };
    stateToChange[e.target.id] = e.target.value;
    setEditedCampaign(stateToChange);
  };

  const saveChanges = (e) => {
    e.preventDefault();


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
    updateCampaign({
      id: campaign.id,
      accountId: editedCampaign.accountId,
      title: editedCampaign.title,
      revenue: editedCampaign.revenue,
      scheduleTypeId: editedCampaign.scheduleTypeId,
      platformId: editedCampaign.platformId,
      createDate: editedCampaign.createDate,
      startDate: editedCampaign.startDate,
      endDate: editedCampaign.endDate,
      impressions: editedCampaign.impressions,
      audience: editedCampaign.audience
    });


    updateCampaign(editedCampaign.id, editedCampaign)
      .then(() => {
        history.push(`/campaign/${id}`)
      })
  };

  if (!editedCampaign
    && !accountId && !scheduleTypeId && !platformId
  ) {
    return null
  }

  return (
    <>
      <Form className="login-form" onSubmit={saveChanges}>
        <fieldset className="loginFields">
          <FormGroup>
            <Input
              id={editedCampaign.id}
              type="hidden"
              value={campaign.id}
              onChange={handleFieldChange}
            />
            <Input
              id="createDate"
              type="hidden"
              value={campaign.createDate}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="title">Campaign Name</Label>
            <Input
              id="title"
              type="text"
              name="title"
              required
              defaultValue={editedCampaign.title}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="accountId">Account Name</Label>
            <Input
              id="accountId"
              type="select"
              name="accountId"
              required
              defaultValue={editedCampaign.accountId}
              onChange={handleAccountIdChange}>
              {accounts.map(account =>
                account.id === editedCampaign.accountId ?
                  <option selected key={account.id} value={account.id}>
                    {account.company}
                  </option> :
                  <option key={account.id} value={account.id}>
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
              required
              defaultValue={editedCampaign.scheduleTypeId}
              onChange={handleScheduleTypeIdChange}>
              {scheduleTypes.map(type =>
                type.id === editedCampaign.scheduleTypeId ?
                  <option key={type.id} selected value={type.id}>
                    {type.name}
                  </option> :
                  <option key={type.id} value={type.id}>
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
              required
              defaultValue={editedCampaign.platformTypeId}
              onChange={handlePlatformIdChange}>
              {platforms.map(platform =>
                platform.id === editedCampaign.platformId ?
                  <option selected key={platform.id} value={platform.id}>
                    {platform.name}
                  </option> :
                  <option key={platform.id} value={platform.id}>
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
              required
              defaultValue={editedCampaign.revenue}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Campaign Start Date</Label>
            <Input
              id="startDate"
              type="datetime-local"
              name="startDate"
              required
              defaultValue={editedCampaign.startDate}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">Campaign End Date</Label>
            <Input
              id="endDate"
              type="datetime-local"
              name="endDate"
              required
              defaultValue={editedCampaign.endDate}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="impressions">Impressions</Label>
            <Input
              id="impressions"
              type="text"
              name="impressions"
              required
              defaultValue={editedCampaign.impressions}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="audience">Audience</Label>
            <Input
              id="audience"
              type="text"
              name="audience"
              required
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