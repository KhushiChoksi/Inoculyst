import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Distributor {
    Name: string;
    Phone_number: string;
    Email: string;
}


//so that the functions can be used in a diff file
interface DistributorDetailsContextProps {
    distributors: Distributor[];
    message: string;
    searchFunction: string;
    setSearchFunction: (term: string) => void;
    refreshDistributors: () => Promise<void>;
}

const defaultContextValue: DistributorDetailsContextProps = {
    distributors: [],
    message: '',
    searchFunction: '',
    setSearchFunction: () => {},
    refreshDistributors: async () => {}
};

export const DistributorDetailsContext = createContext<DistributorDetailsContextProps>(defaultContextValue);

interface DistributorDetailsProviderProps {
    children: ReactNode;
}

//get the information from the database
export const DistributorDetailsProvider: React.FC<DistributorDetailsProviderProps> = ({ children }) => {
    const [distributors, setDistributors] = useState<Distributor[]>([]);
    const [message, setMessage] = useState("");
    const [searchFunction, setSearchFunction] = useState<string>('');

    const getDistributors = async () => {
        try {
            setMessage("");
            const response = await axios.get('http://localhost:8080/distributors');
            setDistributors(response.data); 
        }
        catch (error) {
            console.error("Error fetching distributors: ", error);
            setMessage("Failed to load distributor list.");
        }
    };

    
    const refreshDistributors = async() => {
        await getDistributors();
    }

    useEffect(() => {
        getDistributors();
        // window.location.reload();
    }, []);

    const value = {
        distributors,
        message,
        searchFunction,
        setSearchFunction,
        refreshDistributors,
    };
    
    return (
        <DistributorDetailsContext.Provider value={value}>
            {children}
        </DistributorDetailsContext.Provider>
    );
};