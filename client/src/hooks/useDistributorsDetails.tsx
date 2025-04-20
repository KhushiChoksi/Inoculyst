import { useContext } from 'react';
import { DistributorDetailsContext } from '../contexts/DistributorDetailsContext.tsx';

export const useDistributorDetails = () => {
  const context = useContext(DistributorDetailsContext);
  
  return context;
};