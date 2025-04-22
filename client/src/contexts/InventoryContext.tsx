// import React, { createContext, useContext, useState, ReactNode } from 'react';

// type AccountType = 'owner' | 'pharmacist' | 'assistant' | 'technician' | null;

// interface UserContextProps {
//   accountType: AccountType;
//   setAccountType: (type: AccountType) => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [accountType, setAccountType] = useState<AccountType>(null);

//   return (
//     <UserContext.Provider value={{ accountType, setAccountType }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('error');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, ReactNode } from 'react';

type AccountType = 'owner' | 'pharmacist' | 'assistant' | 'technician' | null;

interface UserContextProps {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [accountType, setAccountTypeState] = useState<AccountType>(() => {
    const saved = localStorage.getItem('accountType');
    return (saved as AccountType) || null;
  });

  
  const setAccountType = (type: AccountType) => {
    setAccountTypeState(type);
    if (type) {
      localStorage.setItem('accountType', type);
    } else {
      localStorage.removeItem('accountType');
    }
  };

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