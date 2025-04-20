import React from 'react';
import { useChangePassword } from '../../../hooks/useChangePassword.tsx';
import { useChangeUsername } from '../../../hooks/useChangeUsername.tsx';
import { ChangeUsernameProvider } from '../../../contexts/ChangeUsernameContext.tsx';
import { ChangePasswordProvider } from '../../../contexts/ChangePasswordContext.tsx';

const UpdateUsernamePassword: React.FC = () => {
  const {
    form,
    message,
    handleInputChange,
    handleSave,
  } = useChangePassword();

  const {
    formUsername,
    messageUsername,
    handleInputChangeUsername,
    handleSaveUsername,
  } = useChangeUsername();

  return (
    <div>
      <div className="bg-light_green/50 p-6 rounded shadow-sm mb-6">
      <h2 className="text-xl font-bold mb-6"> Update Username</h2>
        <div className = "mb-4">
            <label className = "block mb-2"> Current Username </label>
            <input type ="username"
                    name = "oldUsername" 
                    placeholder = "current username"
                    className ="w-full p-2 border border-gray-300 rounded-md"
                    value = {formUsername.oldUsername}
                    onChange={handleInputChangeUsername}
                    />
        </div>
        <div className = "mb-4">
            <label className = "block mb-2"> New Username </label>
            <input type ="username"
                    name = "newUsername" 
                    placeholder = "new username"
                    className ="w-full p-2 border border-gray-300 rounded-md"
                    value = {formUsername.newUsername}
                    onChange={handleInputChangeUsername}
                    />
        </div>
        <div className="flex justify-center flex-col items-center">
            <button 
              className="w-40 py-3 p-3 bg-dark1 hover:bg-dark_green text-white rounded-md transition-colors"
              onClick={handleSaveUsername}
            >
                Save Username
            </button>
            {messageUsername && (
                <div className={'mt-4 p-2 rounded-md bg-red-100 text-red-700"'}>
                  {messageUsername}
                </div>
            )}
        </div>
    </div>

    <div className="bg-light_green/50 p-6 rounded shadow-sm">
      <h2 className="text-xl font-bold mb-6"> Update Password</h2>
        <div className = "mb-4">
            <label className = "block mb-2"> Current Password </label>
            <input type ="password"
                    name = "oldPassword" 
                    placeholder = "current password"
                    className ="w-full p-2 border border-gray-300 rounded-md"
                    value = {form.oldPassword}
                    onChange={handleInputChange}
                    />
        </div>
        <div className = "mb-4">
            <label className = "block mb-2"> New Password </label>
            <input type ="password"
                    name = "newPassword" 
                    placeholder = "new password"
                    className ="w-full p-2 border border-gray-300 rounded-md"
                    value = {form.newPassword}
                    onChange={handleInputChange}
                    />
        </div>
        <div className="flex justify-center flex-col items-center">
            <button 
              className="w-40 py-3 p-3 bg-dark1 hover:bg-dark_green text-white rounded-md transition-colors"
              onClick={handleSave}
            >
                Save Password
            </button>
            {message && (
                <div className={'mt-4 p-2 rounded-md bg-red-100 text-red-700"'}>
                  {message}
                </div>
            )}
        </div>
    </div>

    </div>
  );
};

const PasswordUpdate: React.FC = () => {
  return (
    <ChangePasswordProvider>
      <ChangeUsernameProvider>
        <UpdateUsernamePassword />
      </ChangeUsernameProvider>
    </ChangePasswordProvider>
  );
};
export default PasswordUpdate;