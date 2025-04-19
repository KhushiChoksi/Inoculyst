import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import GetUserInformation from '../pages/account/GetUserInformation';
import { useAuthContext } from '../contexts/AuthContext.tsx';

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
  const [userData, setUserData] = useState<UserInformation>(defaultInfo);
  const[error, setError] = useState<string | null>(null);
  const { username, accountType, userID } = useAuthContext();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const accountRes = await fetch('http://localhost:8080/account');
        const adminRes  = await fetch('http://localhost:8080/admin')
        const employeeRes = await fetch('http://localhost:8080/employee')

        const accountData = await accountRes.json();
        const adminData  = await adminRes.json();
        const employeeData = await employeeRes.json();

        
        const currentAccount = userId ? accountData.find((account) => account.ID === userId) : null;

        if (!currentAccount) {
          throw new Error('User information not found.');
        }

        const isEmployee = currentAccount.ID.startsWith('E');
        const isAdmin = currentAccount.ID.startsWith('A');

        let additionalInfo = null;

        if (isAdmin) {
          additionalInfo = adminData.find((admin) => admin.ID === userId);
        }
        else if (isEmployee) {
          additionalInfo = employeeData.find((employee) => employee.ID === userId);
        
        }

        const combinedData: UserInformation = {
          id: currentAccount.ID,
          accountType: currentAccount.Account_type, 
          username: currentAccount.Username,
          firstName: additionalInfo ? additionalInfo.First_name: '',
          lastName: additionalInfo ? additionalInfo.Last_name: '',
          email: additionalInfo ? additionalInfo.Email: '',
          phoneNumber: additionalInfo ? additionalInfo.Phone_Number: '',
        };

        setUserData(combinedData);
        setError(null);


      }
      catch (err) {
        setError('Failed to load user data.');
        console.error(err);
      }
      
    };
    getUserData();

  }, [userId]);

  return (
    <UserContext.Provider value={{ userData, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};