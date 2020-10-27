import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ScheduleTypeContext = React.createContext();

export const ScheduleTypeProvider = (props) => {
    const apiUrl = "/api/scheduletype";

    const { getToken } = useContext(UserProfileContext);

    const [scheduleTypes, setScheduleTypes] = useState([]);

    const getAllScheduleTypes = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setScheduleTypes));
    };

    return (
        <ScheduleTypeContext.Provider value={{ scheduleTypes, getAllScheduleTypes
        }}>
            {props.children}
        </ScheduleTypeContext.Provider>
    );

}