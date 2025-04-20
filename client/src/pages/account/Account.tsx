import React from "react";
import GetUserInformation from "./GetUserInformation.tsx";
import { UserProvider } from '../../contexts/UserContext.tsx';
import { useAuthContext } from '../../contexts/AuthContext.tsx';
import PasswordUpdate from "./components/PasswordUsernameUpdate.tsx";
import { ChangePasswordProvider } from '../../contexts/ChangePasswordContext.tsx';

export default function Account() {
  const { username, accountType, userID } = useAuthContext();
  
  return (
    <div className="p-6 bg-[#F7F7F2]">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <p className="text-gray-600 mb-8">Update your account credentials.</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <UserProvider userId={userID}>
            <div className="p-4">
              <GetUserInformation />
            </div>
          </UserProvider>
        </div>
        
        <div className="flex-1">
          <ChangePasswordProvider>
            <PasswordUpdate />
          </ChangePasswordProvider>
        </div>
      </div>
    </div>
  );
}