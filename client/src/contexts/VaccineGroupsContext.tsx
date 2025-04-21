import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Vaccine {
    Vaccine_Name: string;
    Brand_Name: string;
    Diseases: string;
}

interface VaccineWithIngredients extends Vaccine {
  V_Active_Ingredients: string;
}

interface VaccineGroupsContextProps {
    vaccines: Vaccine[];
    vaccinesWithIngredients: VaccineWithIngredients[];
    message: string;
    searchFunction: string;
    setSearchFunction: (term: string) => void;
    refreshVaccines: () => Promise<void>;
}

const defaultContextValue: VaccineGroupsContextProps = {
    vaccines: [],
    vaccinesWithIngredients: [],
    message: '',
    searchFunction: '',
    setSearchFunction: () => {},
    refreshVaccines: async () => {}
};

export const VaccineGroupsContext = createContext<VaccineGroupsContextProps>(defaultContextValue);

interface VaccineGroupsProviderProps {
    children: ReactNode;
}

export const VaccineGroupsProvider: React.FC<VaccineGroupsProviderProps> = ({ children }) => {
    const [vaccines, setVaccines] = useState<Vaccine[]>([]);
    const [vaccinesWithIngredients, setVaccinesWithIngredients] = useState<VaccineWithIngredients[]>([]);
    const [message, setMessage] = useState("");
    const [searchFunction, setSearchFunction] = useState<string>('');

    const getVaccines = async () => {
        try {
            setMessage("");

            let vaccineInfo: Vaccine[] = [];
            let ingredientsInfo: VaccineWithIngredients[] =[];

            try {
                const vaccineRes = await axios.get('http://localhost:8080/vaccine');
                vaccineInfo = vaccineRes.data;
            }
            catch (error) {
                console.error('Error getting vaccine groups.', error);
                setMessage('Failed to load vaccine group list.')
                throw error;
            }
            try {
                const ingredientsRes = await axios.get('http://localhost:8080/vaccine/ingredients');
                ingredientsInfo = ingredientsRes.data;
            }
            catch (error) {
                console.error('Error getting vaccine ingredients .', error);
                setMessage('Failed to load vaccine ingredients list.')
                throw error;
            }

            setVaccines(vaccineInfo);
            setVaccinesWithIngredients(ingredientsInfo);

            
        }

        catch (error) {
            console.error("Error in get operation: ", error);
            setMessage("Error in the get operation.");
        }
    };

    const refreshVaccines = async() => {
        await getVaccines();
    }

    useEffect(() => {
        getVaccines();
        // window.location.reload();

    }, []);

    const value = {
        vaccines,
        vaccinesWithIngredients,
        message,
        searchFunction,
        setSearchFunction,
        refreshVaccines,
    };

    
    return (
        <VaccineGroupsContext.Provider value={value}>
            {children}
        </VaccineGroupsContext.Provider>
    );
};