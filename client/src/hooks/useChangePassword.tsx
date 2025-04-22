import { useContext } from 'react';
import { ChangePasswordContext } from '../contexts/ChangePasswordContext.tsx';

//to use context and call a provider error
export const useChangePassword = () => {
  const context = useContext(ChangePasswordContext);
  if (!context) {
    throw new Error('Use a ChangePasswordProvider');
  }
  
  return context;
};