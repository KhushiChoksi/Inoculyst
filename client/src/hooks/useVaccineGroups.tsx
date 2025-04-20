import { useContext } from 'react';
import { VaccineGroupsContext } from '../contexts/VaccineGroupsContext.tsx';

export const useVaccineGroups = () => {
  const context = useContext(VaccineGroupsContext);
  
  return context;
};