import React, { createContext, useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../db/db";

const Context = createContext(undefined);

export const StateProvider = ({ children }) => {
    const [sharedState, setSharedState] = useState({ weatherList: [] });

    const updateState = (newState) => {
        setSharedState(newState);
        set(ref(db, 'locations/'), newState.weatherList);
    };

    return (
        <Context.Provider value={{ sharedState, updateState }}>
            {children}
        </Context.Provider>
    );
};

export default Context;