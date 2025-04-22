import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import GetUserInformation from '../pages/account/GetUserInformation';
import { useAuthContext } from '../contexts/AuthContext.tsx';
import axios from 'axios';

export interface UserInformation {
  id: string;
  accountType: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
}

interface UserContextType {
  userData: UserInformation;
  error: string | null;
}

const defaultInfo: UserInformation = {
  id: '',
  accountType: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  username: ''
};


const defaultUserInformation: UserContextType = {
  userData: defaultInfo,
  error: null,
}
const UserContext = createContext<UserContextType>( defaultUserInformation);

interface UserProviderProps {
  children: ReactNode;
  userId?: string; //to get specific user
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, userId }) => {
  const [userData, setUserData] = useState(defaultInfo);
  const [error, setError] = useState(null);
  const { username, accountType, userID } = useAuthContext();
  
  // If userId isn't provided, use the userID from auth context
  const UserId = userId || userID;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const accountRes = await axios.get('http://localhost:8080/account');
        const adminRes = await axios.get('http://localhost:8080/admin');
        const employeeRes = await axios.get('http://localhost:8080/employee');
        
        const accountData = await accountRes.data;
        const adminData = await adminRes.data;
        const employeeData = await employeeRes.data;
        
        //get the current account information
        const currentAccount = UserId 
          ? accountData.find((account) => account.ID === UserId) 
          : accountData.find((account) => account.Username === username);
        
        if (!currentAccount) {
          throw new Error('User information not found.');
        }
        
        //check if they are admin or employee
        const isEmployee = currentAccount.ID.startsWith('E');
        const isAdmin = currentAccount.ID.startsWith('A');
        
        let additionalInfo = null;
        
        //get the specific additional informtion from their specific database
        if (isAdmin) {
          additionalInfo = adminData.find((admin) => admin.ID === currentAccount.ID);
        } else if (isEmployee) {
          additionalInfo = employeeData.find((employee) => employee.ID === currentAccount.ID);
        }
        
        //combine it with the rest of the info
        const combinedData: UserInformation = {
          id: currentAccount.ID,
          accountType: currentAccount.Account_type,
          username: currentAccount.Username,
          firstName: additionalInfo ? additionalInfo.First_name : '',
          lastName: additionalInfo ? additionalInfo.Last_name : '',
          email: additionalInfo ? additionalInfo.Email : '',
          phoneNumber: additionalInfo ? additionalInfo.Phone_number : '',
        };
        
        //set the user info so it can be retrieved 
        setUserData(combinedData);
        setError(null);
      } catch (err) {
        console.error(err);
      }
    };
    
    if (UserId || username) {
      getUserData();
      // window.location.reload();
    }
  }, [UserId, username]);

  return (
    <UserContext.Provider value={{ userData, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('use a UserProvider');
  }
  return context;
};