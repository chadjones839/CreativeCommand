import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useParams } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function AccountEditForm() {
  const history = useHistory();
  const { account, getById, updateAccount } = useContext(AccountContext);
  const { salesUsers, managerUsers, getAllSalesUsers, getAllManagerUsers } = useContext(UserProfileContext);
  const [ salesUserId, setSalesUserId ] = useState()
  const [ managerUserId, setManagerUserId ] = useState()
  const { id } = useParams();

  const [editedAccount, setEditedAccount] = useState({
      id: id,
      company: "",
      logo: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      dateCreated: "",
      salesUserId: "",
      managerUserId: ""
  });

  useEffect(() => {
    getAllSalesUsers()
    getAllManagerUsers()
  }, [])

  useEffect(() => {
    getById(id)
  }, [])

  useEffect(() => {
    setEditedAccount(account)
  }, [account])

  const handleSalesUserChange = (e) => {
    setSalesUserId(e.target.value);
  }

  const handleManagerUserChange = (e) => {
    setManagerUserId(e.target.value);
  }

  const handleFieldChange = e => {
    const stateToChange = { ...editedAccount };
    stateToChange[e.target.id] = e.target.value;
    setEditedAccount(stateToChange);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    updateAccount({
      dateCreated: editedAccount.dateCreated,
      company: editedAccount.company,
      logo: editedAccount.logo,
      address: editedAccount.address,
      city: editedAccount.city,
      state: editedAccount.state,
      zipCode: editedAccount.zipCode
    });

    const parseSalesId = parseInt(salesUserId);
    const parseMgrId = parseInt(managerUserId);
    editedAccount.salesUserId = parseSalesId;
    editedAccount.managerUserId = parseMgrId;

    if (!editedAccount.salesUserId) {
        editedAccount.salesUserId = account.salesUserId;
    }

    if (!editedAccount.managerUserId) {
        editedAccount.managerUserId = account.managerUserId;
    }

    updateAccount(editedAccount.id, editedAccount)
    .then(() => {
        history.push(`/account/${id}`)
    })

  };

  if (!editedAccount || !salesUsers || !managerUsers) {
    return null
  }

  return (
    <Form className="login-form" onSubmit={saveChanges}>
      <fieldset className="loginFields">
        <FormGroup>
          <Input 
            id="accountId" 
            type="hidden"
            name="accountId"
            value={account.id} 
            onChange={handleFieldChange} />
        <Input 
            id="dateCreated" 
            type="hidden"
            name="dateCreated"
            defaultValue={account.dateCreated} 
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="company">Company</Label>
          <Input 
            id="company" 
            type="text" 
            name="company"
            defaultValue={account.company}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="logo">Logo</Label>
          <Input 
            id="logo" 
            type="text" 
            name="logo"
            defaultValue={account.logo}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input 
            id="address" 
            type="text" 
            name="address"
            defaultValue={account.address}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input 
            id="city" 
            type="text" 
            name="city"
            defaultValue={account.city}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>
          <Input 
            id="state" 
            type="text" 
            name="state"
            defaultValue={account.state}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="zipCode">Zip Code</Label>
          <Input 
            id="zipCode" 
            type="text" 
            name="zipCode"
            defaultValue={account.zipCode}
            onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="salesUserId">Assigned Rep</Label>
          <Input 
            id="salesUserId" 
            type="select" 
            name="salesUserId"
            defaultValue={account.salesUserId}
            onChange={handleSalesUserChange}>
                {salesUsers.map(users =>
                    users.id === account.salesUserId ?
                        <option selected value={users.id}>
                            {users.fullName}
                        </option> :
                        <option value={users.id}>
                            {users.fullName}
                        </option>
                )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="managerUserId">Assigned Manager</Label>
          <Input 
            id="managerUserId" 
            type="select" 
            name="managerUserId"
            defaultValue={account.managerUserId}
            onChange={handleManagerUserChange}>
                {managerUsers.map(users =>
                    users.id === account.salesUserId ?
                        <option selected value={users.id}>
                            {users.fullName}
                        </option> :
                        <option value={users.id}>
                            {users.fullName}
                        </option>
                )}
          </Input>
        </FormGroup>
        <div className="loginBtn">
          <FormGroup>
            <Button>Save Changes</Button>
          </FormGroup>
        </div>
      </fieldset>
    </Form>
  );
}