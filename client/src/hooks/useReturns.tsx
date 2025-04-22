import { useContext } from 'react';
import { ReturnsContext } from '../contexts/ReturnsContext.tsx';

//to use context 

export const useReturns = () => {
  const context = useContext(ReturnsContext);
  
  return context;
};