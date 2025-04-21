import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Return {
    Return_ID: string;
    Admin_ID: string;
    Distributor_Name: string;
    Batch_Number: string;
}

interface ReturnsContextProps {
    returns: Return[];
    message: string;
    searchFunction: string;
    setSearchFunction: (term: string) => void;
    refreshReturns: () => Promise<void>;
}

const defaultContextValue: ReturnsContextProps = {
    returns: [],
    message: '',
    searchFunction: '',
    setSearchFunction: () => {},
    refreshReturns: async () => {}
};

export const ReturnsContext = createContext<ReturnsContextProps>(defaultContextValue);

interface ReturnsProviderProps {
    children: ReactNode;
}

export const ReturnsProvider: React.FC<ReturnsProviderProps> = ({ children }) => {
    const [returns, setReturns] = useState<Return[]>([]);
    const [message, setMessage] = useState("");
    const [searchFunction, setSearchFunction] = useState<string>('');

    const getReturns = async () => {
        try {
            setMessage("");
            const response = await axios.get('http://localhost:8080/returns');
            console.log("Returns data:", response.data);
            setReturns(response.data);
        }
        catch (error) {
            console.error("Error fetching returns: ", error);
            setMessage("Failed to load returns list.");
        }
    };

    const refreshReturns = async() => {
        await getReturns();
    }

    useEffect(() => {
        getReturns();
        // window.location.reload();
    }, []);

    const value = {
        returns,
        message,
        searchFunction,
        setSearchFunction,
        refreshReturns,
    };
    
    return (
        <ReturnsContext.Provider value={value}>
            {children}
        </ReturnsContext.Provider>
    );
};