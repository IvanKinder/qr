import React, { createContext, useState } from "react";

const Context = createContext(undefined);

export const StateProvider = ({ children }) => {
    const [sharedState, setSharedState] = useState({ weatherList: [] });

    const updateState = (newState) => {
        setSharedState(newState);
    };

    return (
        <Context.Provider value={{ sharedState, updateState }}>
            {children}
        </Context.Provider>
    );
};

export default Context;