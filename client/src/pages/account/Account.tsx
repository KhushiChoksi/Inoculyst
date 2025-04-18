import React from "react";
import GetUserInformation from "./GetUserInformation.tsx";
import { UserProvider } from './UserContext.tsx';

const sampleData = {
  id: '30141345',
  accountType: 'Technician',
  firstName: 'John',
  lastName: 'Doe',
  email: 'John_doe@gmail.com',
  phoneNumber: '597******',
  certificationNumber: '111111111111111111111'
};

export default function Account() {
    return (
      <UserProvider userData={sampleData}>

        <div className="p-6 bg-[#F7F7F2]">
          <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
          <p className="text-gray-600 mb-8">Update your account credentials.</p>    
          <div className="p-4">
          <GetUserInformation />

          </div>
        </div>
        </UserProvider>
      );
}