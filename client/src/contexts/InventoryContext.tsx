import React, { createContext, useContext, useState, ReactNode } from 'react';

type AccountType = 'owner' | 'pharmacist' | 'assistant' | 'technician' | null;

interface UserContextProps {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [accountType, setAccountType] = useState<AccountType>(null);

  return (
    <UserContext.Provider value={{ accountType, setAccountType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};