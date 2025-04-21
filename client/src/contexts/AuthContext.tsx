import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  username: string;
  accountType: string;
  userID: string;
  updateAuth: (username: string, accountType: string, userID: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [accountType, setAccountType] = useState(localStorage.getItem('accountType') || '');
  const [userID, setUserID] = useState(localStorage.getItem('userID') || "");

  const updateAuth = (username: string, accountType: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('accountType', accountType);
    localStorage.setItem('userID', userID);
    setUsername(username);
    setAccountType(accountType);
    setUserID(userID);
    window.location.reload();

  };
  
  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('accountType');
    localStorage.removeItem('userID');
    setUsername('');
    setAccountType('');
    setUserID('');
  };

  return (
    <AuthContext.Provider value={{ username, accountType, userID, updateAuth, logout }}>
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