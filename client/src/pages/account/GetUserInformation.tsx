import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../contexts/UserContext.tsx';
import axios from 'axios';

//function to get the actual user information that is to be displayed
const GetUserInformation: React.FC = () => {
  const { userData, error} = useUser();

  const [technicianData, setTechnicianData] = useState<{ Technician_ID: string, Certification_number: string } | null>(null);

  useEffect(() => {
    const getTechCert = async () => {
      if (userData?.accountType === "technician") {
        try {
          const res = await axios.get('http://localhost:8080/technician');
          const info = await res.data;


          // if its a technician then display the cert ID as well
          const tech = info.find(
            (tech: { Technician_ID: string }) => tech.Technician_ID === userData.id
          );
          if (tech) {
            setTechnicianData(tech);
          }
      }
      catch (error) {
        console.error("Error getting technician id", error);
      }
      }
    };

    getTechCert();
  }, [userData]);






  //any error then display it
  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  //otherwise display all the information
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

          {/* display the technician cert if its a tech */}
          {userData.accountType === "technician" && technicianData && (
            <div className="space-y-2 mt-6 md:col-span-2">
            <h3 className="text-ml font-bold mb-4">Certification Number</h3>
            <p className="text-lg text-gray-900">{technicianData.Certification_number}</p>
          </div>
        )}
          
        </div>
      );
  };

export default GetUserInformation;