import { useContext } from 'react';
import { ReturnsContext } from '../contexts/ReturnsContext.tsx';

export const useReturns = () => {
  const context = useContext(ReturnsContext);
  return context;
};