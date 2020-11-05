/*eslint-disable*/
import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function AccountAddForm() {
  const history = useHistory();
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { addAccount } = useContext(AccountContext);
  const { salesUsers, managerUsers, getAllSalesUsers, getAllManagerUsers } = useContext(UserProfileContext);
  // const [salesUserId, setSalesUserId] = useState()
  // const [managerUserId, setManagerUserId] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const [account, setAccount] = useState({
    company: "",
    logo: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    salesUserId: sessionUser.id,
    managerUserId: 1
  });

  useEffect(() => {
    getAllSalesUsers()
  }, [])

  useEffect(() => {
    getAllManagerUsers()
  }, [])

  // const handleSalesUserChange = (e) => {
  //   setSalesUserId(e.target.value);
  // }

  // const handleManagerUserChange = (e) => {
  //   setManagerUserId(e.target.value);
  // }

  const handleFieldChange = e => {
    const stateToChange = { ...account };
    stateToChange[e.target.id] = e.target.value;
    setAccount(stateToChange);
  };

  const createAccount = (e) => {
    e.preventDefault();
    if (account.company === "" ||
      account.address === "" ||
      account.city === "" ||
      account.state === "" ||
      account.zipCode === "") {
      alert("Missing Fields")

    } else {
      setIsLoading(true);
    }


    // const parseMgrId = parseInt(managerUserId);
    const parseZip = parseInt(account.zipCode)

    
    account.zipCode = parseZip;

    addAccount(account)
      .then((a) => {
        history.push(`/account/${a.id}`)
      })
  };

  if (!account || !salesUsers || !managerUsers) {
    return null
  }

  return (
    <>
      <Form className="login-form" onSubmit={createAccount}>
        <fieldset className="loginFields">
          <FormGroup>
            <Label for="company">Company</Label>
            <Input
              id="company"
              type="text"
              name="company"
              value={account.company}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="logo">Logo</Label>
            <Input
              id="logo"
              type="text"
              name="logo"
              value={account.logo}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              id="address"
              type="text"
              name="address"
              value={account.address}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              id="city"
              type="text"
              name="city"
              value={account.city}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="state">State</Label>
            <Input
              id="state"
              type="text"
              name="state"
              value={account.state}
              onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              type="text"
              name="zipCode"
              value={account.zipCode}
              onChange={handleFieldChange} />
          </FormGroup>
          {/* <FormGroup>
            <Label for="salesUserId">Assigned Rep</Label>
            <Input
              id="salesUserId"
              type="select"
              name="salesUserId"
              defaultValue={account.salesUserId}
              onChange={handleSalesUserChange}>
              <option></option>
              {salesUsers.map(users =>
                <option value={users.id}>
                  {users.fullName}
                </option>
              )}
            </Input>
          </FormGroup> */}
          {/* <FormGroup>
            <Label for="managerUserId">Assigned Manager</Label>
            <Input
              id="managerUserId"
              type="select"
              name="managerUserId"
              defaultValue={account.managerUserId}
              onChange={handleManagerUserChange}>
              <option></option>
              {managerUsers.map(users =>
                <option value={users.id}>
                  {users.fullName}
                </option>
              )}
            </Input>
          </FormGroup> */}
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