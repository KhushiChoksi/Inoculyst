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

  //saves information to local storage so it can be retrieved later and sets username and other things. 
  const updateAuth = (username: string, accountType: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('accountType', accountType);
    localStorage.setItem('userID', userID);
    setUsername(username);
    setAccountType(accountType);
    setUserID(userID);
    window.location.reload();

  };
  
  //log out function. removes items from local storage and resets them empty. 
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
    throw new Error('Use Authprovider in App.tsx');
  }
  return context;
};