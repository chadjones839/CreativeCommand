/*eslint-disable*/
import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { CampaignContext } from "../../providers/CampaignProvider";
import { AccountContext } from "../../providers/AccountProvider";
import { ScheduleTypeContext } from "../../providers/ScheduleTypeProvider";
import { PlatformContext } from "../../providers/PlatformProvider";

export default function CampaignAddForm() {
  const history = useHistory();
  const { addCampaign } = useContext(CampaignContext);
  const { accounts, getAllAccounts } = useContext(AccountContext);
  const { scheduleTypes, getAllScheduleTypes } = useContext(ScheduleTypeContext);
  const { platforms, getAllPlatforms } = useContext(PlatformContext);
  const [ accountId, setAccountId ] = useState()
  const [ scheduleTypeId, setScheduleTypeId ] = useState()
  const [ platformId, setPlatformId ] = useState()
  const [ isLoading, setIsLoading ] = useState(false);

  const [campaign, setCampaign] = useState({
      accountId: "",
      title: "",
      revenue: "",
      scheduleTypeId: "",
      platformId: "",
      startDate: "",
      endDate: "",
      impressions: "",
      audience: ""
  });

  useEffect(() => {
    getAllAccounts()
  }, [])

  useEffect(() => {
    getAllScheduleTypes()
  }, [])

  useEffect(() => {
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
    const impressionsToChange = { ...campaign };
    impressionsToChange[e.target.id] = e.target.value;
    setCampaign(impressionsToChange);
  };

  const createCampaign = (e) => {
    e.preventDefault();
    if (accountId === "" || 
        campaign.title === "" ||
        campaign.revenue === "" ||
        scheduleTypeId === "" ||
        platformId === "" ||
        campaign.startDate === "" ||
        campaign.endDate === "" ) {
        alert("Missing Fields")

    } else {
        setIsLoading(true);
    }

    const parseAccountId = parseInt(accountId);
    const parseSchTypeId = parseInt(scheduleTypeId);
    const parsePlatId = parseInt(platformId)
    const parseRev = parseInt(campaign.revenue)
    const parseImp = parseInt(campaign.impressions)
    const parseAud = parseInt(campaign.audience)
    campaign.accountId = parseAccountId;
    campaign.scheduleTypeId = parseSchTypeId;
    campaign.platformId = parsePlatId;
    campaign.revenue = parseRev;
    campaign.impressions = parseImp;
    campaign.audience = parseAud;
    
    addCampaign(campaign)
    .then((c) => {
        history.push(`/campaign/${c.id}`)
    })
  };

//   if (!campaign || 
//       !accountId || 
//       !scheduleTypeId || 
//       !platformId) {
//     return null
//   }

  return (
    <>
    <Form className="login-form" onSubmit={createCampaign}>
      <fieldset className="loginFields">
      <FormGroup>
          <Label for="title">Campaign Name</Label>
          <Input 
            id="title" 
            type="text" 
            name="title"
            value={campaign.title}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="accountId">Account Name</Label>
          <Input 
            id="accountId" 
            type="select" 
            name="accountId"
            defaultValue={campaign.accountId}
            onChange={handleAccountIdChange}>
                <option></option>
                {accounts.map(account =>
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
            defaultValue={campaign.scheduleTypeId}
            onChange={handleScheduleTypeIdChange}>
                <option></option>
                {scheduleTypes.map(type =>
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
            defaultValue={campaign.platformTypeId}
            onChange={handlePlatformIdChange}>
                <option></option>
                {platforms.map(platform =>
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
            value={campaign.revenue}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="startDate">Campaign Start Date</Label>
          <Input 
            id="startDate" 
            type="date" 
            name="startDate"
            value={campaign.startDate}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="endDate">Campaign End Date</Label>
          <Input 
            id="endDate" 
            type="date" 
            name="endDate"
            value={campaign.endDate}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="impressions">Impressions</Label>
          <Input 
            id="impressions" 
            type="text" 
            name="impressions"
            value={campaign.impressions}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="audience">Audience</Label>
          <Input 
            id="audience" 
            type="text" 
            name="audience"
            value={campaign.audience}
            onChange={handleFieldChange} />
        </FormGroup>
        <div className="loginBtn">
          <FormGroup>
            <Button>Save Campaign</Button>
          </FormGroup>
        </div>
      </fieldset>
    </Form>
    </>
  );
}