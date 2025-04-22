import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.tsx';

//to use context 
export const useUser = () => {
  const context = useContext(UserContext);
  
  return context;
};