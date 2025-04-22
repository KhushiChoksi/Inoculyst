import { useContext } from 'react';
import { VaccineGroupsContext } from '../contexts/VaccineGroupsContext.tsx';

//to use context 
export const useVaccineGroups = () => {
  const context = useContext(VaccineGroupsContext);
  
  return context;
};