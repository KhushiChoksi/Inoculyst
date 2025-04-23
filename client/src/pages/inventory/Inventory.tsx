import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/InventoryContext.tsx";

import AdminInventory from './AdminInventory.tsx';
import AssistantInventory from './AssistantInventory.tsx';
import TechnicianInventory from './TechnicianInventory.tsx';

export default function Inventory() {

    const { accountType, setAccountType } = useUser();

    useEffect(() => {
        const savedAccountType = localStorage.getItem('accountType');
        if (savedAccountType) {
          setAccountType(savedAccountType as 'owner' | 'pharmacist' | 'assistant' | 'technician' | null);
        }
      }, [setAccountType]);

      //this shows the inventory page according to someones account type
    if (accountType === 'owner' || accountType === 'pharmacist') {
        return <AdminInventory />;
      } else if (accountType === 'assistant') {
        return <AssistantInventory />;
      } else if (accountType === 'technician') {
        return <TechnicianInventory />;
      }
}

