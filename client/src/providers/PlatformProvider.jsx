import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PlatformContext = React.createContext();

export const PlatformProvider = (props) => {
    const apiUrl = "/api/platform";

    const { getToken } = useContext(UserProfileContext);

    const [platforms, setPlatforms] = useState([]);

    const getAllPlatforms = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPlatforms));
    };

    return (
        <PlatformContext.Provider value={{ platforms, getAllPlatforms }}>
            {props.children}
        </PlatformContext.Provider>
    );
}