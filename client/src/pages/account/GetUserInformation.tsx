import React from 'react';

import { useUser } from '../../contexts/UserContext.tsx';


const GetUserInformation: React.FC = () => {
  const { userData, error} = useUser();
  
  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }
    return (
        <div className="bg-light_screen/50 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-ml font-bold mb-4">ID</h3>
              <p className="text-lg text-gray-900">{userData.id}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-ml font-bold mb-4">Account Type</h3>
              <p className="text-lg text-gray-900">{userData.accountType}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-ml font-bold mb-4">First Name</h3>
              <p className="text-lg text-gray-900">{userData.firstName}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-ml font-bold mb-4">Last Name</h3>
              <p className="text-lg  text-gray-900">{userData.lastName}</p>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <h3 className="text-ml font-bold mb-4">Email Address</h3>
              <p className="text-lg text-gray-900">{userData.email}</p>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <h3 className="text-ml font-bold mb-4">Phone Number</h3>
              <p className="text-lg  text-gray-900">{userData.phoneNumber}</p>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <h3 className="text-ml font-bold mb-4">Username</h3>
              <p className="text-lg  text-gray-900">{userData.username}</p>
            </div>
          </div>
          
        </div>
      );
  };

export default GetUserInformation;