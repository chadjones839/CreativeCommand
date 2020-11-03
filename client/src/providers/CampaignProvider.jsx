import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CampaignContext = React.createContext();

export const CampaignProvider = (props) => {
    const apiUrl = "/api/campaign";
    const { getToken } = useContext(UserProfileContext);

    const [campaigns, setCampaigns] = useState([]);
    const [campaign, setCampaign] = useState({});

    const [revenue, setRevenue] = useState();
    const [pendingRevenue, setPendingRevenue] = useState();

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

    const getCampaignById = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setCampaign);
    };

    const getAllCampaignsByAccountId = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/accountid/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setCampaigns);
    };

    const getBookedRevenueBySalesId = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/booked/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setRevenue);
    };

    const getPendingRevenueBySalesId = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/pending/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setPendingRevenue);
    };

    const addCampaign = (campaign) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
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
            fetch(`${apiUrl}/edit/${id}`, {
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
            fetch(`${apiUrl}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },

            }))

    return (
        <CampaignContext.Provider value={{
            campaign, campaigns, revenue, pendingRevenue, getAllCampaigns, getCampaignById, addCampaign, updateCampaign, deleteCampaign, setCampaign, getBookedRevenueBySalesId, getPendingRevenueBySalesId, getAllCampaignsByAccountId
        }}>
            {props.children}
        </CampaignContext.Provider>
    );
}