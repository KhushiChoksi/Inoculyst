import React, { createContext, useState, useContext } from 'react';
import { useAuthContext } from './AuthContext.tsx';
import axios from 'axios';

interface ChangeUsernameForm {
  oldUsername: string;
  newUsername: string;
}

interface ChangeUsernameContextType {
  formUsername: ChangeUsernameForm;
  messageUsername: string;
  handleInputChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveUsername: () => Promise<void>;
  resetFormUsername: () => void;
}

export const ChangeUsernameContext = createContext<ChangeUsernameContextType | null> (null);

export const ChangeUsernameProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {username, userID} = useAuthContext();

  const [formUsername, setForm] = useState<ChangeUsernameForm>({
    oldUsername:'',
    newUsername:'',
  });

  const [messageUsername, setMessage] = useState("");

  const resetFormUsername = () => {
    setForm({
        oldUsername: '',
        newUsername: '',
    });
    setMessage("");
  };
  const handleInputChangeUsername = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const {name, value} = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]:value
    }));
  }

  const handleSaveUsername = async () => {
    setMessage("");

    if (!formUsername.oldUsername || !formUsername.newUsername)  {
      setMessage('Please input current and new username.');
    }

    try {
      const accountRes = await axios.get('http://localhost:8080/account');
      const accountInfo = accountRes.data;

      const currentAcc = accountInfo.find((account:any ) => account.ID === userID); 

      if (currentAcc.Username !== formUsername.oldUsername) {
        setMessage('Current username is incorrect');
        return;
      }

      await axios.put(`http://localhost:8080/account/${userID}/username`, {
        username: formUsername.newUsername
      });

      setMessage('Username Updated Successfully!');
      resetFormUsername();
    }
    catch (error) {
      console.error("Username update error: ", error);
      setMessage('Username could not be saved. Try again');
    }
  };
  const value: ChangeUsernameContextType = {
    formUsername,
    messageUsername,
    handleInputChangeUsername,
    handleSaveUsername,
    resetFormUsername,
  };

  return (
    <ChangeUsernameContext.Provider value={value}>
      {children}
    </ChangeUsernameContext.Provider>
  )

};

export const useChangeUsername = () => {
  const context = useContext(ChangeUsernameContext);
  if (!context) {
    throw new Error('useChangeUsername must be used within a ChangeUsernameProvider');
  }
  return context;
};