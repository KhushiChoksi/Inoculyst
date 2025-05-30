import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from '../hooks/useAuth.tsx';
import { useAuthContext } from '../contexts/AuthContext.tsx';
import { useUser } from '../contexts/UserContext.tsx';
import { TbVaccine, TbTruckReturn } from "react-icons/tb";

// const accountType1 = localStorage.getItem('accountType');
// const username = localStorage.getItem('username');


export default function SideBar() {
    const { username, accountType } = useAuthContext();
    const { userData, error} = useUser();

    //nav bar links
    const createNavLink = (to, label, icon) => (
        <li className="my-2">
            <NavLink to={to}
                    className={({ isActive }) => `flex items-center p-2.5 ${isActive ? 'bg-dark_green text-white' : 'text-white hover:text-light_green'}`} >
                <div className="flex items-center">
                    <span className="mr-4">
                        {icon} 
                    </span>
                    {label}
                </div>
            </NavLink>
        </li>
    );

    // icon reference: https://flowbite.com/docs/customize/icons/ 
    // icon reference: https://windytoolbox.com/icons
    const dashboardIcon = (
        <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  
            <line x1="3" y1="9" x2="21" y2="9" />  
            <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
    );
    const inventoryIcon = (
        <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />  
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />  
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />  
            <line x1="12" y1="22.08" x2="12" y2="12" />        
        </svg>
    );
    const requestsIcon = (
        <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<           path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
    );

    const vaccineIcon = (
        <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />  
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />  
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />  
            <line x1="12" y1="22.08" x2="12" y2="12" />   */}
            <TbVaccine size={25}/>
        </svg>
    );

    const returnIcon = (
        <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <TbTruckReturn size={25}/>
        </svg>
    );

    const configureIcon = (
        <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="14" cy="6" r="2" />  <line x1="4" y1="6" x2="12" y2="6" />  
            <line x1="16" y1="6" x2="20" y2="6" />  <circle cx="8" cy="12" r="2" />  
            <line x1="4" y1="12" x2="6" y2="12" />  <line x1="10" y1="12" x2="20" y2="12" />  
            <circle cx="17" cy="18" r="2" />  <line x1="4" y1="18" x2="15" y2="18" />  
            <line x1="19" y1="18" x2="20" y2="18" />        
        </svg>
    );

    const distributorIcon = (
        <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  
            <circle cx="9" cy="7" r="4" />  
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />        
        </svg>
    );
    const settingsIcon = (
        <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>  
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  
            <circle cx="12" cy="12" r="3" />    
        </svg>
    );

    return (
        <nav className="bg-dark1 text-white fixed h-screen w-64 top-0 left-0 flex flex-col" >
            {/* Inoculyst*/}
            <div className="bg-black p-6">
                <h1 className="text-lg font-bold tracking-widest">
                    INOCULYST
                </h1>
            </div>

             {/* Display Name of user and their Account type*/}

            <div className="bg-dark1/30 p-6">
            <p className="font-semibold">{userData.firstName} {userData.lastName}</p>
            <p className="text-dark_green">{accountType}</p>
            </div>

            <ul className="flex flex-col w-full">
                {createNavLink('/dashboard', 'Dashboard', dashboardIcon)}

                {/*Owner */}
                {accountType === 'owner' && (
                    <>
                    {createNavLink('/inventory', 'Inventory', inventoryIcon)}
                    {createNavLink('/requests', 'Pending Requests', requestsIcon)}
                    {createNavLink('/vaccine-groups', 'Vaccine Groups', vaccineIcon)}
                    {createNavLink('/returns', 'Returns', returnIcon)}
                    {createNavLink('/distributor-details', 'Distributor Details', distributorIcon)}
                    {createNavLink('/configure-accounts', 'Configure Accounts', configureIcon)}
                    </>
                )}
                
                {/*Pharmacist */}
                {accountType === 'pharmacist' && (
                    <>
                    {createNavLink('/inventory', 'Inventory', inventoryIcon)}
                    {createNavLink('/requests', 'Pending Requests', requestsIcon)}
                    {createNavLink('/vaccine-groups', 'Vaccine Groups', vaccineIcon)}
                    {createNavLink('/returns', 'Returns', returnIcon)}
                    {createNavLink('/distributor-details', 'Distributor Details', distributorIcon)}
                    </>
                )}

                {/*Technician */}
                {accountType === 'technician' && (
                    <>
                    {createNavLink('/inventory', 'Inventory', inventoryIcon)}
                    {createNavLink('/requests', 'Pending Requests', requestsIcon)}
                    {createNavLink('/vaccine-groups', 'Vaccine Groups', vaccineIcon)}
                    </>
                )}

                {/*Assistant */}

                {accountType === 'assistant' && (
                    <>
                    {createNavLink('/inventory', 'Inventory', inventoryIcon)}
                    {createNavLink('/vaccine-groups', 'Vaccine Groups', vaccineIcon)}
                    </>
                )}

            </ul>
                
            <ul className="mt-auto mb-6">
                {createNavLink('/account', 'Account Settings', settingsIcon)}
            </ul>
        </nav>
    );

}


