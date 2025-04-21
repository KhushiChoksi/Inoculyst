import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface AccountInformation {
    ID: string;
    Account_type: string;
    Username: string;
}

export interface UserInformation {
    ID: string;
    First_name: string;
    Last_name: string;
    Email: string;
    Phone_number: string;
}

export interface CombinedUserInformation {
    ID: string;
    Account_type: string;
    Username: string;
    First_name: string;
    Last_name: string;
    Email: string;
    Phone_number: string;
}

export interface changeInformationForm {
    Account_type: string;
    First_name: string;
    Last_name: string;
    Email: string;
    Phone_number: string;
    Certificate_id: string;
}

interface ConfigureAccountsContextType {
    users: CombinedUserInformation[];
    selectedUser: CombinedUserInformation | null;
    form: changeInformationForm;
    message: string;
    setSelectedUser: (user: CombinedUserInformation | null) => void;
    setForm: React.Dispatch<React.SetStateAction<changeInformationForm>>;
    handleUserChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: () => Promise<void>;
    resetForm: () => void;

}

const ConfigureAccountsContext = createContext<ConfigureAccountsContextType | null>(null);

export const ConfigureAccountsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [users, setUsers] = useState<CombinedUserInformation[]>([]);
    const [selectedUser, setSelectedUser] = useState<CombinedUserInformation | null> (null);
    const [form , setForm] = useState<changeInformationForm> ({
        Account_type: "",
        First_name: "",
        Last_name: "",
        Email: "",
        Phone_number: "",
        Certificate_id: "",
    });

    const [message, setMessage] = useState("");

    const getUsers = async () => {
        try {
            const accountRes = await axios.get<AccountInformation[]> ("http://localhost:8080/account");
            const employeeAccountRes = accountRes.data.filter(account => account.ID.startsWith('E'));
            const employeeRes = await axios.get<UserInformation[]> ("http://localhost:8080/employee");
            const adminRes = await axios.get<UserInformation[]> ("http://localhost:8080/admin");
            console.log("Account types:", accountRes.data.map(acc => acc.Account_type));


            const accountInfo = accountRes.data;
            const employeeInfo = employeeRes.data;
            const adminInfo = adminRes.data;

            const combinedUsersInfo = [...employeeInfo, ...adminInfo];

            const combinedUsers: CombinedUserInformation[] = accountInfo.map( account => {

                let userDetails: UserInformation | undefined;

                userDetails = combinedUsersInfo.find(employee => employee.ID === account.ID);
                const combinedUser: CombinedUserInformation = {
                    ID: account.ID,
                    Account_type: account.Account_type,
                    Username: account.Username,
                    First_name: "",
                    Last_name: "",
                    Email: "",
                    Phone_number: ""
                };
                if (userDetails) {
                    combinedUser.First_name = userDetails.First_name;
                    combinedUser.Last_name = userDetails.Last_name;
                    combinedUser.Email = userDetails.Email;
                    combinedUser.Phone_number = userDetails.Phone_number;
                }
                
                return combinedUser;
            });
            setUsers(combinedUsers);

            if (selectedUser) {
                const updatedUser = combinedUsers.find(user => user.ID === selectedUser.ID);
                if (updatedUser){
                    setSelectedUser(updatedUser);
                    setForm({
                        Account_type: updatedUser.Account_type || "",
                        First_name: updatedUser.First_name || "",
                        Last_name: updatedUser.Last_name || "",
                        Email: updatedUser.Email || "",
                        Phone_number: updatedUser.Phone_number || "" ,
                        Certificate_id: "",                   
                    });
                }
            }
        }
        catch (error) {
            console.error("Couldn't fetch users:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const resetForm = () => {
        setForm({
          Account_type: "",
          First_name: "",
          Last_name: "",
          Email: "",
          Phone_number: "",
          Certificate_id: "",
        });
        setMessage("");
      };

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userID = event.target.value;
        if (!userID || userID === " Select User") {
            setSelectedUser(null);
            resetForm();
            return;
        }

        const user = users.find(user => user.ID === userID);
        if (user) {
            setSelectedUser(user);

            setForm({
                Account_type: user.Account_type || "",
                First_name: user.First_name || "",
                Last_name: user.Last_name || "",
                Email: user.Email || "",
                Phone_number: user.Phone_number || "",
                Certificate_id: "",
            });
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
    const handleSave = async () => {
        if (!selectedUser) return;

        setMessage("");

        try { 
            if (selectedUser.Account_type === "assistant" && 
                form.Account_type && 
                form.Account_type !== selectedUser.Account_type) {
                
                if (!form.Certificate_id || !form.Certificate_id.match(/^CERT\d{6}$/)) {
                    setMessage("Certificate ID must be in format CERT555777");
                    return;
                }
                
                await axios.put(`http://localhost:8080/account/${selectedUser.ID}/account-type`, {
                    account_type: form.Account_type,
                    certification_number: form.Certificate_id
                });
            }

            if (form.First_name && form.First_name !== selectedUser.First_name) {
                const userType = selectedUser.ID.startsWith("E") ? "employee" : "admin";
                await axios.put(`http://localhost:8080/${userType}/${selectedUser.ID}/first-name`, {
                    firstName: form.First_name
                });
            }
            
            if (form.Last_name && form.Last_name !== selectedUser.Last_name) {
                const userType = selectedUser.ID.startsWith("E") ? "employee" : "admin";
                await axios.put(`http://localhost:8080/${userType}/${selectedUser.ID}/last-name`, {
                    lastName: form.Last_name
                });
            }
            
            if (form.Email && form.Email !== selectedUser.Email) {
                const userType = selectedUser.ID.startsWith("E") ? "employee" : "admin";
                await axios.put(`http://localhost:8080/${userType}/${selectedUser.ID}/email`, {
                    email: form.Email
                });
            }
            if (form.Phone_number && form.Phone_number !== selectedUser.Phone_number) {
                const userType = selectedUser.ID.startsWith("E") ? "employee" : "admin";
                await axios.put(`http://localhost:8080/${userType}/${selectedUser.ID}/phone`, {
                    phone: form.Phone_number
                });
            }
            setMessage("User details updated successfully!");

            await getUsers();
        }
        catch (error) {
            console.error("Error updating user:", error);
            setMessage("Failed to update user details. Please try again.");
        }
    };

    const value = {
        users,
        selectedUser,
        form,
        message,
        setSelectedUser,
        setForm,
        handleUserChange,
        handleInputChange,
        handleSave,
        resetForm
    };

    return (
        <ConfigureAccountsContext.Provider value={value}>
            {children}
        </ConfigureAccountsContext.Provider>
    );
};
export const useConfigureAccounts = () => {
    const context = useContext(ConfigureAccountsContext);
    if (!context) {
      throw new Error('useConfigureAccounts must be used within a ConfigureAccountsProvider');
    }
    return context;
};
