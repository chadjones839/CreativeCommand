import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ContactContext = React.createContext();

export const ContactProvider = (props) => {
    const apiUrl = "/api/contacts";
    const { getToken } = useContext(UserProfileContext);

    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState({});

    const getAllContacts = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setContacts));
    };

    const getByAccountId = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/contact_account/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setContact);
    };

    return (
        <ContactContext.Provider value={{
            contact, contacts, getAllContacts, getByAccountId
        }}>
            {props.children}
        </ContactContext.Provider>
    );

}