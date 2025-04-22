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
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; //function to see whats being inputted
  handleSave: () => Promise<void>; //funtion to sve
  resetForm: () => void; //function to reset the form to empty after its been saved
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

  //store the new input
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

      //check password with old
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
    window.location.reload(); //reload page to show updated settings
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
    throw new Error('provider error');
  }
  return context;
};