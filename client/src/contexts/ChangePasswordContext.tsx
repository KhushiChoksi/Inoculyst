import React, { createContext, useState, useContext } from 'react';
import { useAuthContext } from './AuthContext.tsx';
import axios from 'axios';

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordContextType {
  form: ChangePasswordForm;
  message: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => Promise<void>;
  resetForm: () => void;
}

export const ChangePasswordContext = createContext<ChangePasswordContextType | null> (null);

export const ChangePasswordProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {username, userID} = useAuthContext();

  const [form, setForm] = useState<ChangePasswordForm>({
    oldPassword:'',
    newPassword:'',
  });

  const [message, setMessage] = useState("");

  const resetForm = () => {
    setForm({
      oldPassword: '',
      newPassword: '',
    });
    setMessage("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const {name, value} = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]:value
    }));
  }

  const handleSave = async () => {
    setMessage("");

    if (!form.oldPassword || !form.newPassword)  {
      setMessage('Please input current and new password.');
    }

    try {
      const accountRes = await axios.get('http://localhost:8080/account');
      const accountInfo = accountRes.data;

      const currentAcc = accountInfo.find((account:any ) => account.ID === userID); 

      if (currentAcc.Password !== form.oldPassword) {
        setMessage('Current password is incorrect');
        return;
      }

      await axios.put(`http://localhost:8080/account/${userID}/password`, {
        password: form.newPassword
      });

      setMessage('Password Updated Successfully!');
      resetForm();
    }
    catch (error) {
      console.error("Password update error: ", error);
      setMessage('Password could not be saved. Try again');
    }
  };
  const value: ChangePasswordContextType = {
    form,
    message,
    handleInputChange,
    handleSave,
    resetForm
  };

  return (
    <ChangePasswordContext.Provider value={value}>
      {children}
    </ChangePasswordContext.Provider>
  )

};

export const useChangePassword = () => {
  const context = useContext(ChangePasswordContext);
  if (!context) {
    throw new Error('useChangePassword must be used within a ChangePasswordProvider');
  }
  return context;
};