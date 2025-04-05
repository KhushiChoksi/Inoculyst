import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar () {
    // function for creating the sidebar link
    const createNavLink = (to, label) => (
        <li className="my-2">
            <NavLink
                to={to}
                className={({ isActive }) =>
                    isActive ? 'text-white bg-dark_green' : 'text-white hover:text-light_green'
                }
            >
                {label}
            </NavLink>
        </li>
    );
    
    return (
        <nav className="bg-dark1 text-white py-6 flex flex-col items-center fixed h-full w-48 top-0 left-0">
            <h1 className="text-lg font-bold tracking-widest"> 
                INOCULYST 
            </h1>

            {/* page links */}
            <ul className="text-md flex flex-col list-none m-0 p-0 w-full items-center">
                {createNavLink('/dashboard', 'Dashboard')}
                {createNavLink('/inventory', 'Inventory')}
                {createNavLink('/requests', 'Pending Requests')}
                {createNavLink('/vaccine-groups', 'Vaccine Groups')}
                {createNavLink('/configure-accounts', 'Configure Accounts')}
                {createNavLink('/distributor-details', 'Distributor Details')}
                {createNavLink('/account', 'Account Settings')}
            </ul>
        </nav>
    );
}
