import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CampaignStatusContext = React.createContext();

export const CampaignStatusProvider = (props) => {
  const apiUrl = "/api/campaignstatus";
  const { getToken } = useContext(UserProfileContext);

  const [campaignStatuses, setCampaignStatuses] = useState([]);
  const [campaignStatus, setCampaignStatus] = useState({});

  const getAllCampaignStatuses = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setCampaignStatuses));
  };

  const getCampaignStatusById = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).then((resp) => resp.json())
      .then(setCampaignStatus);
  };

  const getAllByCampaignId = (campaignId) => {
    return getToken().then((token) =>
      fetch(`/api/campaignstatus/campaignid/${campaignId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => resp.json())
        .then(setCampaignStatuses));
  }

  const getAllByCampaignAccountId = (accountId) => {
    return getToken().then((token) =>
      fetch(`/api/campaignstatus/accountid/${accountId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => resp.json())
        .then(setCampaignStatuses));
  }

  const getByCampaignId = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/campaigntracker/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).then((resp) => resp.json())
      .then(setCampaignStatus);
  };

  const addCampaignStatus = (campaignStatus) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignStatus)
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      }))
  };

  const updateCampaignStatus = (id, campaignStatus) => {

    return getToken().then((token) =>
      fetch(`${apiUrl}/edit/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(campaignStatus)
      }))
  };

  const deleteCampaignStatus = (id) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },

      }))

  return (
    <CampaignStatusContext.Provider value={{
      campaignStatus, campaignStatuses, getAllCampaignStatuses, getAllByCampaignAccountId, getByCampaignId, addCampaignStatus, updateCampaignStatus, deleteCampaignStatus, setCampaignStatus, getAllByCampaignId, getCampaignStatusById
    }}>
      {props.children}
    </CampaignStatusContext.Provider>
  );

}