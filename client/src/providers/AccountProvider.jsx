import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const AccountContext = React.createContext();

export const AccountProvider = (props) => {
    const apiUrl = "/api/account";
    const { getToken } = useContext(UserProfileContext);

    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState({});

    const getAllAccounts = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setAccounts));
    };

    const getAllAccountsByUser = (id) => {
        return getToken().then((token) =>
            fetch(`/api/account/myaccounts${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => resp.json())
                .then(setAccounts));
    }

    const getById = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setAccount);
    };

    const addAccount = (account) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(account)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }))
    };

    const updateAccount = (id, account) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/edit/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(account)
            }))
    };

    const deleteAccount = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },

            }))

    return (
        <AccountContext.Provider value={{
            account, accounts, getAllAccounts, getById, addAccount, updateAccount, deleteAccount, setAccount, getAllAccountsByUser
        }}>
            {props.children}
        </AccountContext.Provider>
    );

}