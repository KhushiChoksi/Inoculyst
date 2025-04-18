import React, { createContext, ReactNode } from 'react';

export interface UserInformation {
  id: string;
  accountType: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  certificationNumber: string;
}

interface UserContextType {
  userData: UserInformation;
}

const defaultInfo: UserInformation = {
  id: '',
  accountType: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  certificationNumber: ''
};

export const UserContext = createContext<UserContextType>({ userData: defaultInfo });

interface UserProviderProps {
  children: ReactNode;
  userData: UserInformation;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, userData }) => {
  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};
