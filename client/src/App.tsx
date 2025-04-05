import React from 'react';
// import axios from 'axios';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

// page imports
import Login from './pages/login/Login.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import Inventory from './pages/inventory/Inventory.tsx';
import Requests from './pages/requests/Requests.tsx';
import VaccineGroups from './pages/vaccine-groups/VaccineGroups.tsx';
import ConfigureAccounts from './pages/configure-accounts/ConfigureAccounts.tsx';
import DistributorDetails from './pages/distributor-details/DistributorDetails.tsx';
import Account from './pages/account/Account.tsx';

import SideBar from './components/SideBar.tsx';

// (ignore this for now) data will be the string we send from our server
// const apiCall = () => {
//   axios.get('http://localhost:8080').then((data) => {
//     //this console.log will be in our frontend console
//     console.log(data)
//   })
// }

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ['/'];       // hide sidebar in these locations

  return (

    // <div className="App">
    //   <header className="App-header">
    //     <button onClick={apiCall}>Make API Call</button>
    //   </header>
    // </div>

    // later on, you will need to wrap these with the providers
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <SideBar />}    {/* conditionally render sidebar on pages except login */}

      {/* separate route for login, to remove left margin */}
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>

      <div className="ml-[200px]">    {/* margin from left side to account for side bar */}
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/vaccine-groups" element={<VaccineGroups />} />
            <Route path="/configure-accounts" element={<ConfigureAccounts />} />
            <Route path="/distributor-details" element={<DistributorDetails />} />
            <Route path="/account" element={<Account />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
