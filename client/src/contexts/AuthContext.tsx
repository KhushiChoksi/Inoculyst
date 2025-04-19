import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  username: string;
  accountType: string;
  updateAuth: (username: string, accountType: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [accountType, setAccountType] = useState(localStorage.getItem('accountType') || '');

  const updateAuth = (username: string, accountType: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('accountType', accountType);
    setUsername(username);
    setAccountType(accountType);
  };

  return (
    <AuthContext.Provider value={{ username, accountType, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('You need to wrap authContext within an AuthProvider or something error');
  }
  return context;
};