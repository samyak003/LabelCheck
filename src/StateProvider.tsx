import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

interface StateProviderProps {
    reducer: React.Reducer<any, any>;
    initialState: any;
    children: ReactNode;
}

export const StateContext = createContext<[any, Dispatch<any>] | undefined>(undefined);

export const StateProvider: React.FC<StateProviderProps> = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useStateValue must be used within a StateProvider');
    }
    return context;
};
