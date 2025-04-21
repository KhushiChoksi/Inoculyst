import { useContext } from 'react';
import { ChangeUsernameContext } from '../contexts/ChangeUsernameContext.tsx';

export const useChangeUsername = () => {
  const context = useContext(ChangeUsernameContext);
  if (!context) {
    throw new Error('useChangeUsername must be used within a ChangeUsernameProvider');
  }
  
  return context;
};