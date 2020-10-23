import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider";

export const CampaignContext = React.createContext();

export const CampaignProvider = (props) => {
  const apiUrl = "/api/campaign";
  const { getToken } = useContext(UserContext);

  const [campaigns, setCampaigns] = useState([]);
  const [campaign, setCampaign] = useState({});

  const getAllCampaigns = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setCampaigns));
  };


  const getAllCampaignsByUser = (id) => {
    return getToken().then((token) =>
      fetch(`/api/campaign/mycampaigns${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => resp.json())
        .then(setCampaigns));
  }

  const getById = (id) => {
    getToken().then((token) =>
      fetch(`/api/campaign/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).then((resp) => resp.json())
      .then(setCampaign);
  };

  const addCampaign = (campaign) => {
    return getToken().then((token) =>
      fetch("/api/campaign", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign)
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      }))
  };

  const updateCampaign = (id, campaign) => {
    return getToken().then((token) =>
      fetch(`/api/campaign/edit/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(campaign)
      }))
  };

  const deleteCampaign = (id) =>
    getToken().then((token) =>
      fetch(`/api/campaign/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },

      }))

  return (
    <CampaignContext.Provider value={{
      campaign, campaigns, getAllCampaigns, getById, addCampaign, updateCampaign, deleteCampaign, setCampaign, getAllCampaignsByUser
    }}>
      {props.children}
    </CampaignContext.Provider>
  );

}