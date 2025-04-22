import { useContext } from 'react';
import { DistributorDetailsContext } from '../contexts/DistributorDetailsContext.tsx';

//to use context
export const useDistributorDetails = () => {
  const context = useContext(DistributorDetailsContext);
  
  return context;
};