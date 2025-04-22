import { useContext } from 'react';
import { ChangeUsernameContext } from '../contexts/ChangeUsernameContext.tsx';

//to use context and call a provider error
export const useChangeUsername = () => {
  const context = useContext(ChangeUsernameContext);
  if (!context) {
    throw new Error('use a ChangeUsernameProvider');
  }
  
  return context;
};